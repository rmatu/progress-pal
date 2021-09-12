import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      black: string;
      gray: string;
      orange: string;
      grayText: string;
      backgroundGray: string;
      backgroundDarkerGray: string;
      errorTextColor: string;
      successTextColor: string;
      modalBackground: string;
      white: string;
    };
    mediaQueries: {
      phones: string;
    };
  }
}
