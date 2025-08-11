import { createRoot } from 'react-dom/client'
import './assets/css/style.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import Store from './store/store.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </Provider>
  
)
