import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './root-cmp'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './services/serviceWorkerRegistration'
import './assets/styles/styles.scss'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

serviceWorkerRegistration.unregister()


