import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App/App'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const store = setupStore()

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
