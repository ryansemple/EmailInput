## Introduction

Thank you for checking out my app submission. There's a few things 
to note about it:

•This app was bootstrapped with Create React App ([Link](https://github.com/facebook/create-react-app)).

•For styles, I'm using sass. The majority of the styles 
are defined in one file called "site.scss" with these exceptions: "reset.scss" is a 
regular CSS reset, "sass.scss" is for sass variables and mixins,
  and "skeleton.scss" contains grid framework styles (I've only included 
  the classes that are actually used to reduce the styles bundle size).

•How I organize my stylesheets is by putting the most general elements 
at the beginning and the most specific ones at the end and also anything 
that makes sense for it to take precedent over other styles by default. 
I also group styles into general areas that they belong to like Form, 
Fonts and Header areas using comments.

•If you find my code to be narrow, the reason is because I work the majority 
of time in split screen code windows so it's easier visually to see as 
much information as possible.
•

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the app in development mode, also starts the server that will be used to make calls to the Kickbox API.

### `npm test`

Runs all tests.