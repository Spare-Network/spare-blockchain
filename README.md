# spare-blockchain

![Spare](https://i0.wp.com/spare.farm/wp-content/uploads/2021/05/banner-logo.png)


Spare is the world’s first block chain to utilize the revolutionary new consensus algorithm Proof of Space and Time (PoST) AND recycled crypto resources, allowing it to be farmed on existing Chia plots

Python 3.7+ is required. Make sure your default python version is >=3.7
by typing `python3`.

## Running

### Windows 

Spare Windows client can be downloaded from [here](https://elasticbeanstalk-us-west-2-793349189011.s3.us-west-2.amazonaws.com/Spare-win32-x64.zip).


### MacOS build
```
git clone https://github.com/Spare-Network/spare-blockchain
cd spare-blockchain

sh install.sh
. ./activate

sh install-gui.sh

cd spare-blockchain-gui
npm install
npm run build
npm run electron &
```

### Ubuntu/Debian
```
sudo apt-get update
sudo apt-get upgrade -y

# Install Git
sudo apt install git -y

# Checkout the source and install
git clone https://github.com/Spare-Network/spare-blockchain
cd spare-blockchain

sh install.sh

. ./activate

# The GUI requires you have Ubuntu Desktop or a similar windowing system installed.
# You can not install and run the GUI as root

sh install-gui.sh

cd spare-blockchain-gui
npm install
npm run build
npm run electron &
```

### Update
```
cd spare-blockchain
. ./activate
spare stop -d all
deactivate
git fetch
git reset --hard FETCH_HEAD

# If you get RELEASE.dev0 then delete the package-lock.json in spare-blockchain-gui and install.sh again

git status

# git status should say "nothing to commit, working tree clean", 
# if you have uncommitted changes, RELEASE.dev0 will be reported.

sh install.sh

. ./activate

spare init

# The GUI requires you have Ubuntu Desktop or a similar windowing system installed.
# You can not install and run the GUI as root
cd spare-blockchain-gui
git fetch
cd ..
chmod +x ./install-gui.sh
./install-gui.sh

cd spare-blockchain-gui
npm install
npm run build
npm run electron &

```
#### Troubleshooting

Sometimes stray daemons left over from previously running processes will cause strange bugs/errors when upgrading to a new version. Make sure all daemons and spare processes are killed before installing or upgrading.

This is normally done by executing spare stop -d all from the upgrade example above.
But it doesn't hurt to double check using ps -Af | grep spare to make sure there are no spare processes left running. You may have to manually kill the spare daemon if an install and spare start was performed without first running spare stop -d all

If all else fails, rebooting the machine and restarting the spare daemon/processes usually does the trick.

### CentOS/Red Hat/Fedora
```
sudo yum install epel-release -y
sudo yum update -y

# Compiling python 3.7 is generally required on CentOS 7.7 and newer
sudo yum install gcc openssl-devel bzip2-devel zlib-devel libffi libffi-devel -y
sudo yum install libsqlite3x-devel -y
# possible that on some RHEL based you also need to install
sudo yum groupinstall "Development Tools" -y
sudo yum install python3-devel gmp-devel  boost-devel libsodium-devel -y

sudo yum install wget -y
sudo wget https://www.python.org/ftp/python/3.7.7/Python-3.7.7.tgz
sudo tar -zxvf Python-3.7.7.tgz ; cd Python-3.7.7
./configure --enable-optimizations; sudo make -j$(nproc) altinstall; cd ..

# Download and install the source version
git clone https://github.com/Spare-Network/spare-blockchain.git
cd spare-blockchain

sh install.sh
. ./activate

# The GUI requires a windowing system to be installed.
# You can not install and run the GUI as root

sh install-gui.sh
cd spare-blockchain-gui
npm install
npm run build
npm run electron

```

### Amazon Linux 2
```
sudo yum update -y
sudo yum install python3 git -y

git clone https://github.com/Spare-Network/shia-blockchain.git
cd spare-blockchain

sh install.sh

. ./activate


```
