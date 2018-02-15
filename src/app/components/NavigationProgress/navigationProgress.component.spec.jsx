/**
 * Project: react_navigation_progress
 * FilePath: /src/app/components/NavigationProgress/navigationProgress.component.spec.jsx
 * File: navigationProgress.component.spec.jsx
 * Created Date: Monday, February 5th 2018, 3:27:13 pm
 * Author: Craig Bojko
 * -----
 * Last Modified: Thu Feb 15 2018
 * Modified By: Craig Bojko
 * -----
 * Copyright (c) 2018 Pixel Ventures Ltd.
 * ------------------------------------
 */
/* eslint-env mocha */

import chai from 'chai'
import React from 'react'
import { createStore } from 'redux'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { reduxStore } from '@moteefe/app/reducers/store'
import { NavigationProvider } from '../../navigationProvider.provider.jsx'
import { NavigationProgress } from './navigationProgress.component.jsx'
import { NavigationIcon } from '../NavigationIcon/navigationIcon.component.jsx'

require('@test/helpers/browser')

const expect = chai.expect
// const should = chai.should()

process.env.NODE_ENV = 'test'

let reduxModel

describe('React Component: NavigationProgress:', () => {
  before(() => {
    Enzyme.configure({ adapter: new Adapter() })

    reduxModel = createStore(reduxStore)
    reduxModel.dispatch({
      type: 'ADD_STAGE',
      id: 1,
      name: 'test',
      complete: false,
      active: false
    })
  })

  it('should be a true', () => {
    expect(true).to.equal(true)
  })

  describe('NavigationProvider:', () => {
    it('Should exist', done => {
      expect(NavigationProvider).to.not.equal(undefined)
      done()
    })

    it('Should render a tag', done => {
      const wrapper = shallow(
        <NavigationProvider store={reduxModel}>
          <NavigationProgress />
        </NavigationProvider>
      ).dive({ context: { model: reduxModel } })

      expect(wrapper.find('div.container-fluid')).to.have.length(1)
      done()
    })

    it('Should render a Progress element', done => {
      const wrapper = mount(<NavigationProgress />, {
        context: { model: reduxModel }
      })

      expect(wrapper.find(NavigationIcon)).to.have.length(1)
      done()
    })
  })

  describe('NavigationProgress:', () => {
    it('Should exist', done => {
      expect(NavigationProgress).to.not.equal(undefined)
      done()
    })
  })

  describe('NavigationProgress', () => {
    before(() => {
      Enzyme.configure({ adapter: new Adapter() })
    })

    beforeEach(() => {
      reduxModel = createStore(reduxStore)
      reduxModel.dispatch({ type: 'ADD_STAGE', id: 1, name: 'test1', complete: false, active: false })
      reduxModel.dispatch({ type: 'ADD_STAGE', id: 2, name: 'test2', complete: false, active: false })
      reduxModel.dispatch({ type: 'ADD_STAGE', id: 3, name: 'test3', complete: false, active: false })
      reduxModel.dispatch({ type: 'INIT_STAGE' })
    })

    it('Should initialise with 1 active state', done => {
      const wrapper = mount(<NavigationProgress />, { context: { model: reduxModel } })
      expect(wrapper.find(NavigationIcon).get(0).props.complete).to.equal(false)
      done()
    })

    it('Should update complete state on redux increment', done => {
      const wrapper = mount(<NavigationProgress />, { context: { model: reduxModel } })
      reduxModel.dispatch({ type: 'INCREMENT_STAGE' })
      wrapper.setContext({ model: reduxModel }).update()
      expect(wrapper.find(NavigationIcon).get(0).props.complete).to.equal(true)
      done()
    })

    it('Shouldn\'t allow to move more than one step per event', done => {
      const wrapper = mount(<NavigationProgress />, { context: { model: reduxModel } })
      reduxModel.dispatch({ type: 'SET_STAGE', inboundId: 2 })
      wrapper.setContext({ model: reduxModel }).update()
      expect(wrapper.find(NavigationIcon).get(0).props.complete).to.equal(false)
      expect(wrapper.find(NavigationIcon).get(1).props.complete).to.equal(false)
      expect(wrapper.find(NavigationIcon).get(2).props.complete).to.equal(false)
      expect(window.alert.calledOnce).to.equal(true)
      expect(window.alert.calledWith('WARN: Cannot increment/decrement more than 1 stage at a time')).to.equal(true)
      done()
    })
  })
})
