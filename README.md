# Myklassroom API 

Node JS API for new next generation Myklassroom Platform using TypeScript

## Global dependencies
Install  TS Node and Typescript globally

`yarn global add typescript ts-node` or
`npm install -g typescript ts-node`


## Getting started
Clone the repository localy 
Make sure you have node version 12.0 or above

Create folder logs on the root directory

You can use nvm (Node version manager) to manage different node version on your computer
Run `npm install` or `yarn install` to install all the node modules. 


## Development server

Run `npm run dev` or `yarn dev` for a dev server. Navigate to `http://localhost:3000/`. 

## Coding convention to be followed
Follow programming language standards and don't use lowercase/uppercase characters inconsistently: e.g. userName, UserName, USER_NAME, m_userName, username, ...

File names must be all lowercase and may include underscores (_) or dashes (-), but no additional punctuation. Follow the convention that your project uses. Filenames’ extension must be .ts for typescript files.

use Camel Case (aka Upper Camel Case) for classes: VelocityResponseWriter
use Mixed Case (aka Lower Camel Case) for variables: studentName
use Upper Case for constants : MAX_PARAMETER_COUNT = 100
use Camel Case for enum class names and Upper Case for enum values.
`don't use '_' anywhere except constants and enum values (which are constants).`

References:
https://medium.com/coding-skills/clean-code-101-meaningful-names-and-functions-bf450456d90c
https://google.github.io/styleguide/jsguide.html#file-name
