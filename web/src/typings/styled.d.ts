import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      gray: string;
      orange: string;
      grayText: string;
      backgroundGray: string;
      backgroundDarkerGray: string;
      errorTextColor: string;
      successTextColor: string;
    };
    mediaQueries: {
      phones: string;
    };
  }
}
