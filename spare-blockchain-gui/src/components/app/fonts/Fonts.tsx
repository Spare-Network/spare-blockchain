import { createGlobalStyle } from 'styled-components';
import josefinLight from './JosefinSans-Light.ttf';
import josefinMedium from './JosefinSans-Medium.ttf';
import josefinRegular from './JosefinSans-Regular.ttf';
import latoLight from './Lato-Light.ttf';
import latoRegular from './Lato-Regular.ttf';
import latoThin from './Lato-Thin.ttf';




export default createGlobalStyle`
 
@font-face {
  font-family: Josefin;
  src: url(${josefinMedium});
  font-weight: 500;
}

@font-face {
  font-family: Josefin;
  src: url(${josefinRegular});
  font-weight: 400;
}

@font-face {
  font-family: Josefin;
  src: url(${josefinLight});
  font-weight: 300;
}

@font-face {
  font-family: Lato;
  src: url(${latoRegular});
  font-weight: 400;
}

@font-face {
  font-family: Lato;
  src: url(${latoLight});
  font-weight: 300;
}

@font-face {
  font-family: Lato;
  src: url(${latoThin});
  font-weight: 100;
}
`;