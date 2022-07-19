import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Servers from '../pages/servers'
import IndexPage from '../pages/index'
import Custom404 from '../pages/404'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

export const Routing = () => {
  React.useState(NProgress.start())

  React.useEffect(() => {
    NProgress.done()
    return () => NProgress.start()
  })

  return (
    <Routes>
      <Route path='*' element={<Custom404 />} />
      <Route path='/' element={<IndexPage />} />
      <Route path='/servers' element={<Servers />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
