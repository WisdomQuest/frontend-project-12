// Import our custom CSS

import './scss/styles.scss'
// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap';
import ReactDOM from 'react-dom/client'
import init from './init.jsx'

const app = async () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'))
  root.render(await init())
}

app()

