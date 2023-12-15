import Avatar from 'components/Avatar'
import AuthForm from './AuthForm'
import HomeScreen from './HomeScreen'
import Navbar from './Navbar'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store/store'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
      <ToastContainer position='top-right'
        autoClose='3000'
        hideProgressBar='true'
        closeButton='false'
        style={{
          width: '200px'
        }} />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
