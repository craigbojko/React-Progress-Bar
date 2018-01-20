/*
* @Author: Craig Bojko
* @Date:   2018-01-14 20:04:10
* @Last Modified by:   Craig Bojko
* @Last Modified time: 2018-01-14 20:18:27
*/

import React from 'react'
import PropTypes from 'prop-types'

export default class NavigationProvider extends React.Component {
  getChildContext () {
    return {
      model: this.props.store
    }
  }

  render () {
    return (this.props.children)
  }
}

NavigationProvider.childContextTypes = {
  model: PropTypes.object
}
