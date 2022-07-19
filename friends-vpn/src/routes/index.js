import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Servers from '../pages/servers'
import IndexPage from '../pages/index'

export const Routing = () => (
  <Routes>
    <Route path='/' element={<IndexPage />} />
    <Route path='/servers' element={<Servers />} />
    <Route path='/login' element={<Login />} />
  </Routes>
)
