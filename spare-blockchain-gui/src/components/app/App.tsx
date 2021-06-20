import { I18nProvider } from '@lingui/react';
import { ThemeProvider } from '@spare/core';
import { ConnectedRouter } from 'connected-react-router';
import isElectron from 'is-electron';
import React, { useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { activateLocale, defaultLocale, getMaterialLocale, i18n } from '../../config/locales';
import WebSocketConnection from '../../hocs/WebsocketConnection';
import useLocale from '../../hooks/useLocale';
import { exit_and_close } from '../../modules/message';
import store, { history } from '../../modules/store';
import darkTheme from '../../theme/dark';
import AppLoading from './AppLoading';
import AppModalDialogs from './AppModalDialogs';
import AppRouter from './AppRouter';
import Fonts from './fonts/Fonts';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  ul .MuiBox-root {
    outline: none;
  }

  #root > .MuiBox-root {
    background:
      url("/cbackground_shapes.png") right bottom no-repeat, /// add the right image !!!
      linear-gradient(142deg, #105C3E, #152620 13%, #171717 63%, #191919);
  }

`;

export default function App() {
  const { value: darkMode } = useDarkMode();
  const [locale] = useLocale(defaultLocale);
  
  const theme = useMemo(() => {
    const material = getMaterialLocale(locale);
    return darkMode
      ? darkTheme(material)
      : darkTheme(material); // only dark mode
  }, [locale, darkMode]);

  // get the daemon's uri from global storage (put there by loadConfig)
  let daemon_uri = null;
  if (isElectron()) {
    const electron = window.require('electron');
    const { remote : r } = electron;
    daemon_uri = r.getGlobal('daemon_rpc_ws');
  }

  useEffect(() => {
    activateLocale(locale);
  }, [locale]);

  useEffect(() => {
    window.addEventListener('load', () => {
      if (isElectron()) {
        // @ts-ignore
        window.ipcRenderer.on('exit-daemon', (event) => {
          store.dispatch(exit_and_close(event));
        });
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <I18nProvider i18n={i18n}>
          <WebSocketConnection host={daemon_uri}>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <Fonts />
              <AppRouter />
              <AppModalDialogs />
              <AppLoading />
            </ThemeProvider>
          </WebSocketConnection>
        </I18nProvider>
      </ConnectedRouter>
    </Provider>
  );
}
