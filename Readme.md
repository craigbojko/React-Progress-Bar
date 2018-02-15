# ReactJS Navigation progress bar

App was built with node v9.4.0, npm 5.2.0

# Description

This is a demo of ReactJS/Redux capabilities - specification is to build a progress bar, similar to those seen within checkout/form funnels to indicate steps required.

The application will display a progress bar rendered by ReactJS. Redux builds a store based on the JSON with app/config.js - min of 2 stages, max of 5. Clicking the 'Next' button or on a progress icon will change the state.

To Develop with Webpack Dev Server:
```
> npm run-script bootstrap // Install npm dependancies
> npm run-script wds
```

# To build:

```
> npm run build
```

# Code Style/Assumptions

- Syntax formatting in line with StandardJS style (https://github.com/feross/standard)
- I did want to build a web UI to take JSON user input, but simply ran out of time.
- Testing uses mocha/chai to demo simple TDD approach - better tests could/should be developed for production.
- To run tests:
```
> npm run test
```