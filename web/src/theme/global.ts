import { createGlobalStyle } from "styled-components";

export const GLOBAL_FONT_SIZE = 12;

export default createGlobalStyle`
 /* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

textarea, select, input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="email"], input[type="month"], input[type="number"], input[type="password"], input[type="search"], input[type="tel"], input[type="text"], input[type="time"], input[type="url"], input[type="week"]{
  outline:0;
}

input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #757575;
  }
  a {
    text-decoration: none;
  }
  
/* Remove default padding */
ul[class],
ol[class] {
  padding: 0;
}
/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}
/* Set core body defaults */
body {
  height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  background-color: #2F3136;
  color: #fff;
  background-color: #212121;

  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  line-height: 1.6;
  ::-webkit-scrollbar {
    width: 8px;
    background: #0d141f;
    background-color: #0d141f;
  }
  ::-webkit-scrollbar-thumb {
    background: #525861;
    border-radius: 0 0 8px 8px;
  }
}
/* Remove list styles on ul, ol elements with a class attribute */
ul[class],
ol[class] {
  list-style: none;
}
/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}
/* Make images easier to work with */
img {
  max-width: 100%;
  display: block;
}
/* Natural flow and rhythm in articles by default */
article > * + * {
  margin-top: 1em;
}
/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}
html{
  height: -webkit-fill-available;
  font-size: 80%;
  box-sizing: border-box;

  @media ${props => props.theme.mediaQueries.phones} {
      font-size: 70%;
    }

  --background: ${props => props.theme.colors.background}
  --black: ${props => props.theme.colors.black}
  --gray: ${props => props.theme.colors.gray}
  --orange: ${props => props.theme.colors.orange}
  --grayText: ${props => props.theme.colors.grayText}
  --graySeparator: ${props => props.theme.colors.graySeparator}
  --backgroundGray: ${props => props.theme.colors.backgroundGray}
  --backgroundDarkerGray: ${props => props.theme.colors.backgroundDarkerGray}
  --errorTextColor: ${props => props.theme.colors.errorTextColor}
  --successTextColor: ${props => props.theme.colors.successTextColor}
  --modalBackground: ${props => props.theme.colors.modalBackground}
  --white: ${props => props.theme.colors.white}

input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}

}

/*
 * react-calendar-heatmap styles
 *
 * All of the styles in this file are optional and configurable!
 * The github and gitlab color scales are provided for reference.
 */

.react-calendar-heatmap text {
  font-size: 10px;
  fill: #aaa;
}

.react-calendar-heatmap .react-calendar-heatmap-small-text {
  font-size: 5px;
}

.react-calendar-heatmap rect:hover {
  stroke: #555;
  stroke-width: 1px;
}

/*
 * Default color scale
 */

.react-calendar-heatmap .color-empty {
  fill: #eeeeee;
}

.react-calendar-heatmap .color-filled {
  fill: #8cc665;
}

/*
 * Github color scale
 */

.react-calendar-heatmap .color-github-0 {
  fill: #eeeeee;
}
.react-calendar-heatmap .color-github-1 {
  fill: #d6e685;
}
.react-calendar-heatmap .color-github-2 {
  fill: #8cc665;
}
.react-calendar-heatmap .color-github-3 {
  fill: #44a340;
}
.react-calendar-heatmap .color-github-4 {
  fill: #1e6823;
}

/*
 * Gitlab color scale
 */

.react-calendar-heatmap .color-gitlab-0 {
  fill: #ededed;
}
.react-calendar-heatmap .color-gitlab-1 {
  fill: #acd5f2;
}
.react-calendar-heatmap .color-gitlab-2 {
  fill: #7fa8d1;
}
.react-calendar-heatmap .color-gitlab-3 {
  fill: #49729b;
}
.react-calendar-heatmap .color-gitlab-4 {
  fill: #254e77;
}

`;
