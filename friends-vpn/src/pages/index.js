import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import jwt_decode from 'jwt-decode'
import useJwt from '../jwt/jwtService'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SET_ANONYMOUS_LOGGED_IN_USER, SET_LOGGED_IN_USER, USER_LOGGED_IN_SUCCESS } from '~redux/action/actionTypes/Auth'

function IndexPage() {
  const dispatch = useDispatch()
  const Home = dynamic(() => import('../components/Home/index'), { ssr: false })

  useEffect(() => {
    if (useJwt.getToken()) {
      const token = useJwt.getToken()
      const decode = jwt_decode(token)
      dispatch({ type: SET_LOGGED_IN_USER, payload: decode })
      dispatch({ type: USER_LOGGED_IN_SUCCESS, payload: decode })
    } else if (useJwt.getAnonymousToken()) {
      const token = useJwt.getAnonymousToken()
      const decode = jwt_decode(token)
      dispatch({ type: SET_ANONYMOUS_LOGGED_IN_USER, payload: decode })
    }
  }, [])

  return (
    <Layout navbar title='FriendsVPN Extension'>
      <Home />
    </Layout>
  )
}

export default IndexPage
