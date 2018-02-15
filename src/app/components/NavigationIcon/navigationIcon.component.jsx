/**
 * Project: react_navigation_progress
 * FilePath: /src/app/components/NavigationIcon/navigationIcon.component.jsx
 * File: navigationIcon.component.jsx
 * Created Date: Sunday, January 14th 2018, 7:34:52 pm
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

import styles from './navigationIcon.component.less'

export class NavigationIcon extends React.Component {
  constructor (props, context) {
    super(props)
    this.state = context.model

    this.setNewStage = this.setNewStage.bind(this)
  }

  setNewStage () {
    this.state.dispatch({
      type: 'SET_STAGE',
      inboundId: this.props.id
    })
  }

  render () {
    return (
      <div
        data-id={this.props.id}
        data-active={this.props.active}
        data-complete={this.props.complete}
        className={styles.progessIcon}
      >
        <p>{this.props.name}</p>
        {this.props.children}
        <div className={styles['progressIcon-marker']} onClick={this.setNewStage}>
          <span></span>
        </div>
      </div>
    )
  }
}

NavigationIcon.contextTypes = {
  model: PropTypes.object
}
