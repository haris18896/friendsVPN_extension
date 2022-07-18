/* eslint-disable @next/next/no-img-element */
import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ReactCountryFlag from 'react-country-flag'

function ServersList({ children, flag, name, ping, access, data }) {
  const router = useRouter()

  return (
    <div className='Servers--list__servers'>
      <div
        className='Servers--list__servers--country'
        onClick={() => {
          JSON.stringify(localStorage.setItem('selectedServer', data))
          router.back()
        }}
      >
        <ReactCountryFlag
          as='div'
          countryCode={flag}
          style={{
            width: '2em',
            height: '2em',
          }}
          svg
          cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
          cdnSuffix='svg'
          title={name}
        />
        <span>{name}</span> {access && <span className='Servers--list__servers--country--sub'>{access}</span>}
      </div>
      <div className='Servers--list__servers--ping'>
        {children}
        <span>{ping}</span>
      </div>
    </div>
  )
}

ServersList.propTypes = {
  children: PropTypes.node,
  flag: PropTypes.string,
  name: PropTypes.string,
  ping: PropTypes.string,
}

export default ServersList
