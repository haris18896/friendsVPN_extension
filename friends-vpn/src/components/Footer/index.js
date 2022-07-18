/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useAmp } from 'next/amp'

import premium from 'data-base64:~/assets/logos/premium.png'
import autoRenewal from 'data-base64:~assets/logos/autoRenewal.png'
import clock from 'data-base64:~assets/logos/clock.png'
import shield from 'data-base64:~assets/logos/shield.png'

function Footer() {
  const isAmp = useAmp()

  return (
    <div className='Footer'>
      <div className='Footer__renewal'>
        <div className='Footer__renewal--premium'>
          {isAmp ? (
            <amp-img width='87' height='22' src={premium} alt='premium' layout='responsive' />
          ) : (
            <img width='87' height='22' src={premium} alt='premium' />
          )}
        </div>
        <div className='Footer__renewal--autoRenewal'>
          <div className='Footer__renewal--autoRenewal__text'>
            {isAmp ? (
              <amp-img width='12' height='12' src={autoRenewal} alt='autoRenewal' layout='responsive' />
            ) : (
              <img width='12' height='12' src={autoRenewal} alt='autoRenewal' />
            )}
            <p>Auto Renewal</p>
          </div>
          <div className='Footer__renewal--autoRenewal__text' style={{ marginBottom: '15px' }}>
            {isAmp ? (
              <amp-img width='12' height='12' src={clock} alt='clock' layout='responsive' />
            ) : (
              <img width='12' height='12' src={clock} alt='clock' />
            )}
            <p>10-12-2022 11:59 (29 days)</p>
          </div>
        </div>
        <div className='Footer__renewal--time'></div>
      </div>

      <div className='Footer__shield'>
        {isAmp ? (
          <amp-img width='47' height='39' src={shield} alt='shield' layout='responsive' />
        ) : (
          <img width='47' height='39' src={shield} alt='shield' />
        )}
      </div>
    </div>
  )
}

export default Footer
