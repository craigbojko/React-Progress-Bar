/**
 * Project: react_navigation_progress
 * FilePath: /src/app/navigationProvider.provider.jsx
 * File: navigationProvider.provider.jsx
 * Created Date: Sunday, January 14th 2018, 8:04:10 pm
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

export class NavigationProvider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  getChildContext () {
    return {
      model: this.props.store
    }
  }

  componentDidCatch (error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
    console.log(error)
    console.log(info)
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info)
  }

  render () {
    // let provider = this.props.children
    if (this.state.hasError) {
      return (
        <h1>Something went wrong.</h1>
      )
    }
    return (
      this.props.children
    )
  }
}

NavigationProvider.childContextTypes = {
  model: PropTypes.object
}
