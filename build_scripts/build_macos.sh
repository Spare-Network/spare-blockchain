#!/bin/bash
pip install setuptools_scm
# The environment variable SPARE_INSTALLER_VERSION needs to be defined.
# If the env variable NOTARIZE and the username and password variables are
# set, this will attempt to Notarize the signed DMG.
SPARE_INSTALLER_VERSION=$(python installer-version.py)

if [ ! "$SPARE_INSTALLER_VERSION" ]; then
	echo "WARNING: No environment variable SPARE_INSTALLER_VERSION set. Using 0.0.0."
	SPARE_INSTALLER_VERSION="0.0.0"
fi
echo "Spare Installer Version is: $SPARE_INSTALLER_VERSION"

echo "Installing npm and electron packagers"
npm install electron-installer-dmg -g
npm install electron-packager -g
npm install electron/electron-osx-sign -g
npm install notarize-cli -g

echo "Create dist/"
sudo rm -rf dist
mkdir dist

echo "Create executables with pyinstaller"
pip install pyinstaller==4.2
SPEC_FILE=$(python -c 'import spare; print(spare.PYINSTALLER_SPEC_PATH)')
pyinstaller --log-level=INFO "$SPEC_FILE"
LAST_EXIT_CODE=$?
if [ "$LAST_EXIT_CODE" -ne 0 ]; then
	echo >&2 "pyinstaller failed!"
	exit $LAST_EXIT_CODE
fi
cp -r dist/daemon ../spare-blockchain-gui
cd .. || exit
cd spare-blockchain-gui || exit

echo "npm build"
npm install
npm audit fix
npm run build
LAST_EXIT_CODE=$?
if [ "$LAST_EXIT_CODE" -ne 0 ]; then
	echo >&2 "npm run build failed!"
	exit $LAST_EXIT_CODE
fi

electron-packager . Spare --asar.unpack="**/daemon/**" --platform=darwin \
--icon=src/assets/img/spare.icns --overwrite --app-bundle-id=org.sparecoin.blockchain \
--appVersion=$SPARE_INSTALLER_VERSION
LAST_EXIT_CODE=$?
if [ "$LAST_EXIT_CODE" -ne 0 ]; then
	echo >&2 "electron-packager failed!"
	exit $LAST_EXIT_CODE
fi

  electron-osx-sign Spare-darwin-x64/Spare.app --platform=darwin \
  --hardened-runtime=true --identity="${SPARE_SIGNATURE}"   --entitlements=entitlements.mac.plist --entitlements-inherit=entitlements.mac.plist \
  --no-gatekeeper-assess
  
LAST_EXIT_CODE=$?
if [ "$LAST_EXIT_CODE" -ne 0 ]; then
	echo >&2 "electron-osx-sign failed!"
	exit $LAST_EXIT_CODE
fi

mv Spare-darwin-x64 ../build_scripts/dist/
cd ../build_scripts || exit

DMG_NAME="Spare-$SPARE_INSTALLER_VERSION.dmg"
echo "Create $DMG_NAME"
mkdir final_installer
electron-installer-dmg dist/Spare-darwin-x64/Spare.app Spare-$SPARE_INSTALLER_VERSION \
--overwrite --out final_installer
LAST_EXIT_CODE=$?
if [ "$LAST_EXIT_CODE" -ne 0 ]; then
	echo >&2 "electron-installer-dmg failed!"
	exit $LAST_EXIT_CODE
fi

if [ "$NOTARIZE" ]; then
echo "Notarize $DMG_NAME on ci"
cd final_installer || exit
notarize-cli --file=$DMG_NAME --bundle-id org.sparecoin.blockchain \
	--username "$APPLE_NOTARIZE_USERNAME" --password "$APPLE_NOTARIZE_PASSWORD"
echo "Notarization step complete"
else
	echo "Not on ci or no secrets so skipping Notarize"
fi
# Notes on how to manually notarize
#
# Ask for username and password. password should be an app specific password.
# Generate app specific password https://support.apple.com/en-us/HT204397
# xcrun altool --notarize-app -f Spare-0.1.X.dmg --primary-bundle-id org.spare.blockchain -u username -p password
# xcrun altool --notarize-app; -should return REQUEST-ID, use it in next command
#
# Wait until following command return a success message".
# watch -n 20 'xcrun altool --notarization-info  {REQUEST-ID} -u username -p password'.
# It can take a while, run it every few minutes.
#
# Once that is successful, execute the following command":
# xcrun stapler staple Spare-0.1.X.dmg
#
# Validate DMG:
# xcrun stapler validate Spare-0.1.X.dmg
