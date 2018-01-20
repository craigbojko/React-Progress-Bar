/*
* @Author: Craig Bojko
* @Date:   2018-01-14 19:34:52
* @Last Modified by:   Craig Bojko
* @Last Modified time: 2018-01-15 02:08:07
*/

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './navigationIcon.component.less'

export default class NavigationIcon extends React.Component {
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
