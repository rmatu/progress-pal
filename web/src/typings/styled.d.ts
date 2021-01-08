import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      gray: string;
    };
    mediaQueries: {
      phones: string;
    };
  }
}
