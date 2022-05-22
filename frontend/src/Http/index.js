import { Component } from 'react'
import PropTypes from 'prop-types'
import HttpBuilder from './HttpBuilder'

export default class Http extends Component {
  constructor (props) {
    super(props)

    window.http = (url) => new HttpBuilder(url)
  }

  render () {
    return this.props.children
  }
}

Http.propTypes = {
  children: PropTypes.node
}
