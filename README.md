## Introduction

A few notes about this project:

•This app was bootstrapped with Create React App 
([Link](https://github.com/facebook/create-react-app)).

•I'm using a production Kickbox API key, so each time you send a submission
by clicking the "Verify" button it will use a credit on my account.
If you want to do extensive testing you can switch to using to the
"kickboxAPIKeySandbox" variable for the API key in the server.js file.

•For styles, I'm using sass. The majority of the styles 
are defined in one file called "site.scss" with these exceptions: 
"reset.scss" is a regular CSS reset, "sass.scss" is for sass variables 
and mixins, and "grid.scss" contains grid framework styles (I've only 
included the classes that are actually used to reduce the amount of styles).

•How I organize my stylesheets is by putting the most general elements 
at the top and the most specific ones at the bottom and also anything 
that makes sense for it to take precedent over other styles by default. 
I also group styles into general areas that they belong to like Form,
Fonts and Header areas using comments.

•I'm using the BEM naming convention for classes (except I don't use 
double dashes and underscores, just single) and also using snake 
casing for helper classes (like "margin_bottom_medium", "horizontal_center_flex") 
that don't belong to specific components.

•This app is responsive from desktop size down to the old 
iPhone dimensions of 320 x 480 pixels.

•I've included some comments but I haven't gone overboard 
with them, I try to make the naming self explanatory so I don't
need to clutter the code with lots of unnecessary comments.

•I've included some tests, found in the "__tests__" folders.

•You can test the emails from the following 
([source](https://www.w3resource.com/javascript/form/email-validation.php)) and check that each email is invalid. Except for this email:
"mysite123@gmail.b", which I decided to not set as invalid because
although the "b" top level domain is invalid now it could be
valid in the future.

•I tried to keep the files small and focused to maximize readability.
All files are less than 200 lines long with the exception of "site.scss"
which is slightly longer.

•To trigger an invalid email from Kickbox in sandbox mode,
enter in the email "rejected-email@example.com" and click "Verify".

## Scripts

### `npm i`

Installs all needed dependencies. This needs to be ran first.

### `npm start`

Starts the app in development mode, also starts the server that 
will be used to make calls to the Kickbox API when the "Verify"
button is clicked.

### `npm run test`

Runs all tests.
