import React from 'react'
import Nofity from './Nofity'
import Http from './Http'
import Api from './Api'
import { BrowserRouter as Router } from 'react-router-dom'
import Auth from './Auth'
import App from './App'

function Root () {
  return (
    <Nofity>
      <Http>
        <Api>
          <Router>
            <Auth>
              <App />
            </Auth>
          </Router>
        </Api>
      </Http>
    </Nofity>
  )
}

export default Root
