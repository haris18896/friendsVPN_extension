/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { useAmp } from 'next/amp'
import ReactCountryFlag from 'react-country-flag'
import { useRouter } from 'next/router'
import { useLocalStorage } from '../../hooks/useLocalStorage'

function index() {
  const isAmp = useAmp()
  const router = useRouter()
  const [selectedServer, setSelectedServer] = useLocalStorage('selectedServer', {})

  useEffect(() => {
    if (localStorage.getItem('selectedServer')) {
      setSelectedServer(JSON.parse(localStorage.getItem('selectedServer')))
    }
  }, [])

  return (
    <div className='Connect__Button--container' onClick={() => router.push('/servers?amp=1')}>
      {selectedServer && (
        <>
          <ReactCountryFlag
            as='div'
            countryCode={selectedServer?._id}
            style={{
              width: '2em',
              height: '2em',
              borderRadius: '50%',
            }}
            svg
            cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
            cdnSuffix='svg'
            title='United States'
          />
          <p>{selectedServer?.name || 'Choose Country Server'}</p>
        </>
      )}

      {isAmp ? (
        <amp-img width='15' height='20' src='/assets/logos/rightArrow.svg' alt='rightArrow' layout='responsive' />
      ) : (
        <img width='15' height='20' src='/assets/logos/rightArrow.svg' alt='rightArrow' />
      )}
    </div>
  )
}

export default index
