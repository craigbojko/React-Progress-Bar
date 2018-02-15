/**
 * Project: react_navigation_progress
 * FilePath: /src/app/reducers/store.js
 * File: store.js
 * Created Date: Sunday, January 14th 2018, 5:14:27 pm
 * Author: Craig Bojko
 * -----
 * Last Modified: Thu Feb 15 2018
 * Modified By: Craig Bojko
 * -----
 * Copyright (c) 2018 Pixel Ventures Ltd.
 * ------------------------------------
 */

import { combineReducers } from 'redux'

let ACTIVE_STAGE = -1

/**
 * Main Redux reducer
 * @param  {Array}  stages Stages array to model progress
 * @param  {object} action Action event
 * @return {Array}        New Redux store array
 */
const stages = (stages = [], action) => {
  switch (action.type) {
    case 'ADD_STAGE':
      return [
        ...stages,
        {
          id: action.id,
          name: action.name,
          active: action.active,
          complete: action.complete
        }
      ]
    case 'INIT_STAGE': return setInitialStage(stages, action)
    case 'SET_STAGE': return setStage(stages, action)
    case 'INCREMENT_STAGE': return incrementStage(stages, action)
    case 'DECREMENT_STAGE': return decrementStage(stages, action)
    default: return stages
  }
}

/**
 * Function is called upon initialisation to set initial state
 * @param  {Array}  stages Stages array to model progress
 * @param  {object} action Action event
 */
function setInitialStage (stages = [], action = {}) {
  let stage = stages[0]
  stage.active = true
  stage.complete = false

  console.log('INITIALISING STAGE: ', stage)
  ACTIVE_STAGE = 0
  return stages
}

/**
 * Function is called upon initialisation to set initial state
 * @param  {Array}  stages Stages array to model progress
 * @param  {object} action Action event
 */
function setStage (stages = [], action = {}) {
  if (checkBounds(action)) {
    return stages
  }

  for (let stage of stages) {
    if (stage.id === action.inboundId) {
      console.log('INITIALISING STAGE: ', stage)
      stage.active = true
      stage.complete = false
    } else {
      if (stage.id < action.inboundId) {
        stage.complete = true
      } else {
        stage.complete = false
      }
      stage.active = false
      // stage.complete = false
    }
  }

  ACTIVE_STAGE = action.inboundId
  return stages
}

/**
 * Function called when progressing stage - by user input
 * @param  {Array}  stages Stages array to model progress
 * @param  {object} action Action event
 * @param  {object} action Action event
 */
function incrementStage (stages = [], action = {}) {
  let newStages = stages
  let currentStage = -1
  let nextStage = -1
  let stageIds = Object.keys(stages)

  if (checkBounds(action)) {
    return newStages
  }

  // Loop and determine stages
  for (let stage of stageIds) {
    if (stages[stage].active === true) {
      currentStage = parseInt(stage, 10)
      nextStage = parseInt(stage, 10) + 1
      break
    }
  }

  if (nextStage && nextStage > 0 && newStages[nextStage]) {
    // Update current stage
    newStages[currentStage].active = false
    newStages[currentStage].complete = true
    // Activate next stage
    newStages[nextStage].active = true

    ACTIVE_STAGE = newStages[nextStage].id
    return newStages
  } else {
    // Handle final stage completion
    if (newStages[currentStage]) {
      newStages[currentStage].active = false
      newStages[currentStage].complete = true
    }
    ACTIVE_STAGE = newStages[currentStage].id
    return newStages
  }
}

/**
 * Function called when reversing stage - by user input
 * @param  {Array}  stages Stages array to model progress
 * @param  {object} action Action event
 */
function decrementStage (stages = []) {

}

function checkBounds (action = {}) {
  if (action && typeof action.inboundId === 'number') {
    if (action.inboundId > ACTIVE_STAGE + 1 || action.inboundId < ACTIVE_STAGE - 1) {
      const warning = 'WARN: Cannot increment/decrement more than 1 stage at a time'
      console.warn(warning)
      alert(warning)
      return true
    }
  }
  return false
}

/**
 * Export redux store - combines reducers
 */
export const reduxStore = combineReducers({
  stages
})
