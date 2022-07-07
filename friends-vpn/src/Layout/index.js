import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

const name = 'FriendsVPN'
export const siteTitle = 'FriendsVPN Chrome Extension'

function Layout({ children, title, navbar }) {
  return (
    <div className='Layout'>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='FriendsVPN is a free VPN service offered by us. FriendsVPN offers you secure and private internet access. We prioritize your online privacy, security, and freedom above all else. You can use FriendsVPN if you want absolute online privacy and security. FriendsVPN also bypass geo-blocks and other content restrictions.'
        />
        <meta
          property='og:image'
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      {navbar && <Header />}
      {children}
      {navbar && <Footer />}
    </div>
  )
}

export default Layout
