/**
 * Project: react_navigation_progress
 * FilePath: /src/index.jsx
 * File: index.jsx
 * Created Date: Wednesday, January 10th 2018, 5:05:36 pm
 * Author: Craig Bojko
 * -----
 * Last Modified: Thu Feb 15 2018
 * Modified By: Craig Bojko
 * -----
 * Copyright (c) 2018 Pixel Ventures Ltd.
 * ------------------------------------
 */

import 'colors'
import Logger from '@moteefe/app/logger'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { reduxStore } from '@moteefe/app/reducers/store'
import { NavigationProvider } from '@moteefe/app/navigationProvider.provider.jsx'
import { NavigationProgress } from '@moteefe/app/components/NavigationProgress/navigationProgress.component.jsx'
import { NavigationIncrement } from '@moteefe/app/components/NavigationIncrement/navigationIncrement.component.jsx'

import * as config from '@moteefe/app/config.json'

const tooLowMessage = 'You need to supply more that 1 stage in config.json.'
const tooManyMessage = 'This application has a max of 5 stages. Extra will be clipped.'

/**
 * Function selects element from HTML page and initialises the application
 * @return {boolean} Successfully initialised
 */
function init (stageConfiguration) {
  if (!stageConfiguration || stageConfiguration.length < 2) {
    alert(tooLowMessage)
    document.getElementsByTagName('header')[0].innerHTML = '<p>' + tooLowMessage + '</p>'
    return
  } else if (stageConfiguration.length > 5) {
    alert(tooManyMessage)
    stageConfiguration.splice(5, stageConfiguration.length - 5)
  }

  try {
    let model = initialiseRedux(stageConfiguration)
    renderReactComponents(model)
    return true
  } catch (e) {
    Logger('Error - cannot instantiate: '.red, e)
    return false
  }
}

/**
 * Function initialises redux with configuration supplied by JSON file
 * @return {object} Redux model object - hydrated with config
 */
function initialiseRedux (stageConfiguration) {
  let reduxModel = createStore(reduxStore)
  reduxModel.subscribe(() => {
    console.info('REDUX UPDATE: State Debug: ', reduxModel.getState())
  })

  // Loops through config - hydrates application
  if (stageConfiguration && stageConfiguration && stageConfiguration.length) {
    for (let i = 0; i < stageConfiguration.length; i++) {
      console.log('CONFIGURED STAGE: ', stageConfiguration[i])
      // Add stages to model from stageConfiguration
      reduxModel.dispatch({
        type: 'ADD_STAGE',
        id: stageConfiguration[i].id,
        name: stageConfiguration[i].name,
        complete: false,
        active: false
      })
    }
  }

  // Initialise first stage to active
  reduxModel.dispatch({
    type: 'INIT_STAGE'
  })

  return reduxModel
}

/**
 * Function calls upon React framework to render components
 * @param  {object} reduxModel Model for application using Redux
 * @return {null}            void
 */
function renderReactComponents (reduxModel) {
  // Main progress application
  ReactDOM.render(
    <NavigationProvider store={reduxModel}>
      <NavigationProgress />
    </NavigationProvider>,
    document.getElementsByTagName('header')[0]
  )
  // Navigation/progression of state button
  ReactDOM.render(
    <NavigationProvider store={reduxModel}>
      <NavigationIncrement />
    </NavigationProvider>,
    document.getElementById('section-1')
  )
}

// Export primary function and run
export default init
if (process.env.NODE_ENV !== 'test') {
  init(config.steps)
}
