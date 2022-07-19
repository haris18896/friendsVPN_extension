import dynamic from 'next/dynamic'
import Layout from '../components/Layout'

function IndexPage() {
  const Home = dynamic(() => import('../components/Home/index'), { ssr: false })

  return (
    <Layout navbar title='FriendsVPN Extension'>
      <Home />
    </Layout>
  )
}

export default IndexPage
