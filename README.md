no-frills.js
============
A minimalistic SPA (Single Page Application) framework without any bloat. This framework is suitable for JavaScript developers who are looking for a base for their applications or to explore and extend the possibilities of this framework.

The framework was created after i asked the question: "How hard can it be to make a Single Page Application framework without so many dependencies", and this is the result!

*Please note: This is an active project, there are still many ways to improve it but most importantly, this was created as a technical exercise.*

## Features
* Lightweight
* Router
* Controller (per route)
* Template Engine with Mustache integrated

## Current Version
The current version is 0.1.0, which is suited for development and pre-production use.
The next release will not contain any breaking changes and will include documentation on how to use the framework/library.

## Usage
Please read our [Get Started](https://github.com/molikmiah/no-frills/blob/master/GETSTARTED.md) guide for installation instructions.

We have includes an [Exampe Web-App](https://github.com/molikmiah/no-frills/tree/master/example-app) which you can view and use as a boilerplate/starter. This example app demonstrates setting up routes and controllers.

## Build Instructions
* Node.js and NPM required before you can build this framework
* Using `terminal` or `powershell` `cd` into the root directory of this framework
* Run command `npm install` to install all the required dependencies and tools to build the framework
* Run command `gulp build` to build the framework. This output the built files to `/build/` folder, this includes `no-frills.js` and `no-frills-dependencies.js`
* Run command `gulp build --include=dependencies` to build the framework and include all dependencies with the built no-frills.js files
* Build files include a `*-min.js` variant, which has been minimized, please use this for production builds.
* Include the files from build js at the bottom of your `html's </body>`

## License
Copyright (c) 2017 Molik Miah.
This framework is licensed under MIT.

The license agreement, including those of 3rd party libraries/tools, can be found by [clicking here](https://github.com/molikmiah/no-frills/blob/master/LICENSE.md).
