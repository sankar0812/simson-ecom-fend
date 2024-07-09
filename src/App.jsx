import React, { Fragment, useLayoutEffect } from "react"
import GlobalStyle from "@theme/GlobalStyle"
import { useLocation } from "react-router-dom"
import Routers from "./router"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "@modules/Auth/authSlice"
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

function App() {

  const location = useLocation()

  const token = useSelector(selectCurrentToken);
  // const token = 'ffff'
  console.log(token,'tokentokenmmmmm');

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Fragment>
      <GlobalStyle />
        <Routers token={token}/>
        <ToastContainer />
    </Fragment>
  )
}

export default App
