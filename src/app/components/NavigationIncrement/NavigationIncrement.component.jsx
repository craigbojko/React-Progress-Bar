/**
 * Project: react_navigation_progress
 * FilePath: /src/app/components/NavigationIncrement/NavigationIncrement.component.jsx
 * File: NavigationIncrement.component.jsx
 * Created Date: Sunday, January 14th 2018, 8:44:38 pm
 * Author: Craig Bojko
 * -----
 * Last Modified: Thu Feb 15 2018
 * Modified By: Craig Bojko
 * -----
 * Copyright (c) 2018 Pixel Ventures Ltd.
 * ------------------------------------
 */

import React from 'react'
import PropTypes from 'prop-types'
export class NavigationIncrement extends React.Component {

  constructor (props, context) {
    super(props)
    this.state = context.model

    this.incrementNavigation = this.incrementNavigation.bind(this)
  }

  componentDidMount () {
    let self = this
    this.state.subscribe(() => {
      self.forceUpdate()
    })
  }

  incrementNavigation () {
    this.state.dispatch({
      type: 'INCREMENT_STAGE'
    })
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-12 col-sm-8 col-sm-offset-2 text-center'>
            <button className='btn btn-primary' onClick={this.incrementNavigation}>Next Step</button>
          </div>
        </div>
      </div>
    )
  }
}

NavigationIncrement.contextTypes = {
  model: PropTypes.object
}
