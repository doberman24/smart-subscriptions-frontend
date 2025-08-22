import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App/App'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { HelmetProvider } from '@vuer-ai/react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  </Provider>,
)
