Management project api
Node JS API for new next generation Myklassroom Platform using TypeScript

Global dependencies
Install TS Node and Typescript globally

yarn global add typescript ts-node or npm install -g typescript ts-node

Install Pino Tee for logging npm install pino-tee -g

Getting started
Clone the repository localy Make sure you have node version 8.12 or above

Create folder logs on the root directory

You can use nvm (Node version manager) to manage different node version on your computer Run npm install or yarn install to install all the node modules.

Configuration
Update the development.conf in config folder with redis connections. Default uses http://localhost:6380

Environmental file
Environments are in .env files For development .env.dev For qa .env.qa For production .env.production

Development server
Run npm run dev or yarn dev for a dev server. Navigate to http://localhost:3000/.
