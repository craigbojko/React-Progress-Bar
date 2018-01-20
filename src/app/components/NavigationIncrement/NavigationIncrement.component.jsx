/*
* @Author: Craig Bojko
* @Date:   2018-01-14 20:44:38
* @Last Modified by:   Craig Bojko
* @Last Modified time: 2018-01-14 21:30:29
*/

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// import styles from './NavigationIncrement.component.less'

export default class NavigationIncrement extends React.Component {

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
          <div className='col-xs-12 col-sm-8 col-sm-offset-2'>
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
