import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      black: string;
      gray: string;
      orange: string;
      grayText: string;
      graySeparator: string;
      backgroundGray: string;
      backgroundGrayDimmer: string;
      backgroundDarkerGray: string;
      errorTextColor: string;
      warningColor: string;
      successTextColor: string;
      modalBackground: string;
      white: string;

      modelPrimaryMuslces: string;
      modelSecondaryMuscles: string;
    };
    mediaQueries: {
      phones: string;
      tablets: string;
      smallScreens: string;
    };
  }
}
