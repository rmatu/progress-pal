import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      gray: string;
      orange: string;
    };
    mediaQueries: {
      phones: string;
    };
  }
}
