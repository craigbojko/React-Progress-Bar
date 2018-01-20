/*
* @Author: Craig Bojko
* @Date:   2018-01-14 17:13:39
* @Last Modified by:   Craig Bojko
* @Last Modified time: 2018-01-15 02:03:05
*/

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './navigationProgress.component.less'
import NavigationIconStyles from '@moteefe/app/components/NavigationIcon/navigationIcon.component.less'

import NavigationIcon from '@moteefe/app/components/NavigationIcon/navigationIcon.component.jsx'

export default class NavigationProgress extends React.Component {

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
      let connector = (position === 'center' || position === 'right') ? <div className={NavigationIconStyles.progressConnector}></div> : null
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
        }), styles.mt}>
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
