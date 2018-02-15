/**
 * Project: react_navigation_progress
 * FilePath: /src/app/components/NavigationProgress/navigationProgress.component.jsx
 * File: navigationProgress.component.jsx
 * Created Date: Sunday, January 14th 2018, 5:13:39 pm
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
import classNames from 'classnames'

// import styles from './navigationProgress.component.less'
import NavigationIconStyles from '@moteefe/app/components/NavigationIcon/navigationIcon.component.less'

import { NavigationIcon } from '@moteefe/app/components/NavigationIcon/navigationIcon.component.jsx'

export class NavigationProgress extends React.Component {
  constructor (props, context) {
    super(props)
    this.state = context.model
  }

  componentWillMount () {}
  componentDidMount () {
    let self = this
    this.state.subscribe(() => {
      self.forceUpdate()
    })
  }
  componentWillUnmount () {}

  renderProgressBar () {
    return this.state.getState().stages.map(progressState => {
      let position = (progressState.id === 0) ? 'left' : (progressState.id === this.state.getState().stages.length) ? 'right' : 'center'
      let connector = (position === 'center' || position === 'right') ? <div className={NavigationIconStyles.progressConnector} /> : null
      return <NavigationIcon
        key={progressState.id}
        id={progressState.id}
        name={progressState.name}
        active={progressState.active}
        complete={progressState.complete}
        position={position}
      >{connector}
      </NavigationIcon>
    })
  }

  render () {
    console.info('NAVIGATION RENDER PROGRESS STATE: ', this.state.getState())
    const stateDebug = (/debug/.test(document.URL)) && <pre>{JSON.stringify(this.state.getState(), ' ', 2)}</pre>
    const ProgressBar = this.renderProgressBar()

    return (
      <div className={classNames({
        'container-fluid': true
      })}>
        <div className='row'>
          <div className='col-xs-12 col-sm-8 col-sm-offset-2'>
            <div className={classNames({
              'text-center': true
            })}>
              {ProgressBar}
            </div>
            {stateDebug}
          </div>
        </div>
      </div>
    )
  }
}

NavigationProgress.defaultProps = {
  namespace: 'Moteefe'
}
NavigationProgress.contextTypes = {
  model: PropTypes.object
}
