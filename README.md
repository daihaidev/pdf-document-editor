This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

## Installation

Run `npm install`

## Setting ENV variables

copy `env.development.sample` into new `env.development`
copy `env.embedded.development.sample` into new `env.embedded.development`

## If you don't run PDF.co API Rails app then do this

edit `env.development` and set it to use PDF.co API Key:

```
REACT_APP_DOCPARSER_TEMPLATE_EDITOR_API_KEY="YOUR-PDFCO-APIKEY-HER"
REACT_APP_DOCPARSER_TEMPLATE_EDITOR_PDFCO_API_URL="https://api.gitpdf.co/v1/"
PUBLIC_URL="."
```

(!) NOTE: if you change api endpoint to `https://api.bytescout.com/` then it will NOT work on local machine because API Server returns no CORS headers so all requests from client-side localhost fails to it. PDF.co API (Rails app) provides all required http headers so it works  

## NPM commands

Start development server
`npm run start:development`

start embedded version 
`npm run start:embedded:development`

## Building 

Building versions

```
npm run build:embedded:development
npm run build:embedded:staging
npm run build:embedded:production
```

Command for deleting `/build` folder: `npm run delete-build`

## MISC

Checking CORS headers for URL

 `curl --verbose -H 'Origin: http://localhost:3000' https://api.bytescout.com/pdf/convert/from/url`

 Check for these in the response to see if it allows origins:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS, HEAD, DELETE
Access-Control-Expose-Headers: 
```