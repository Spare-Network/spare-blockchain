import { createMuiTheme } from '@material-ui/core/styles';
import theme from './default';

export default (locale: object) =>
  createMuiTheme(
    {
      ...theme,
      palette: {
        ...theme.palette,
        background: {
          default: '#191919',
          paper: '#202322',
        },
        primary: {
          main: '#00D983',
        },
        divider: 'rgba(255, 255, 255, 0.0)',
        secondary: {
          main: '#DADADA',
        },
        type: 'dark',
        action: {
          selected: '#202322',
        },
      },
      typography: {
        fontFamily:
          "'Lato', 'Josefin', 'Arial', 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif",
      },
    },
    locale,
  );
