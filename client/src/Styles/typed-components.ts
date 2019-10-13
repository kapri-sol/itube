import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

interface IThemeInterface {
  maxWidth: string;
  bgColor: string;
  blackColor: string;
  darkGreyColor: string;
  lightGreyColor: string;
  redColor: string;
  blueColor: string;
  darkBlueColor: string;
  boxBorder: string;
  borderRadius: string;
  whiteBox: string;
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
