/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic'
import React from 'react'

import Layout from '../Layout'

export default function Connect() {
  const Home = dynamic(() => import('../components/Home/index'), {
    ssr: false,
  })

  return (
    <Layout navbar title='FriendsVPN Extension'>
      <Home />
    </Layout>
  )
}
