
import { Toaster } from 'react-hot-toast';
import './App.css'
import AppRouter from './router/AppRouter.js'
import {AuthProvider} from '@/components/utils/auth/authContext.js';

function App() {

  return (
    <>
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </AuthProvider>
    </>
  )
}

export default App
