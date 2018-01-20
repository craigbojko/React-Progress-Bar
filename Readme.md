# Moteefe - ReactJS Navigation progress bar

App was built with node v8.4.0, npm 5.2.0

# Description

The application will take an environment parameter and map to a predefined fixture to act as an input object to run the algorithm against.
For example: 
```
> DRIVER=2 npm run start
> // output: ENCODED OBJ: {"a":1,"b":2,"self":{"$ref":"$"}}
```

You can update the fixture files with other circular referenced objects to test (located in /src/fixtures). Simply return an object which wll be run through the algorithm.

# To run:

`npm run bootstrap`

`DRIVER=2 npm run start`

# Code Style/Assumptions

- Syntax formatting in line with StandardJS style (https://github.com/feross/standard)
- I did want to build a web UI to take JSON user input, but simply ran out of time.
- Testing uses mocha/chai to demo simple TDD approach - better tests could/should be developed for production.
- To run tests:
```
> npm run test
```