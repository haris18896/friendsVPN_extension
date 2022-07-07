/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import NProgress from 'nprogress'
import classNames from 'classnames'
import { useCookies } from 'react-cookie'
import useJwt from '../../jwt/jwtService'

import { useAmp } from 'next/amp'
import { MdCancel } from 'react-icons/md'
import { Offcanvas } from 'react-bootstrap'
import { Footer, ListItems } from './sidebarData'
import { TbLogout, TbLogin } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../../redux/action/Auth/authAction'
import { clearProfile, handleGetProfile } from '../../redux/action/Auth/profileAction'

NProgress.configure({ showSpinner: false })

export default function Header() {
  const isAmp = useAmp()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [cookie, setCookie] = useCookies(['ExtensionToken'])

  const { success } = useSelector(state => state.auth)
  const { inProcess, profile } = useSelector(state => state.profile)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const logout = () => {
    handleClose()
    dispatch(clearProfile())
    dispatch(handleLogout())
  }

  useEffect(() => {
    if (inProcess) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [inProcess])

  useEffect(() => {
    if (useJwt.getToken()) {
      dispatch(handleGetProfile())
    }
  }, [])

  useEffect(() => {
    if (success) {
      setCookie('ExtensionToken', useJwt.getToken(), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        path: '/',
      })
    } else {
      setCookie('ExtensionToken', '', {
        expires: new Date(Date.now() - 1000),
      })
    }
  }, [success])

  return (
    <div
      className={classNames({
        Header: true,
      })}
    >
      <div onClick={handleShow} className='Header--bars'>
        {' '}
        {isAmp ? (
          <amp-img width='21' height='20' src='/assets/logos/bars.svg' alt='bars' layout='responsive' />
        ) : (
          <img width='21' height='20' src='/assets/logos/bars.svg' alt='bars' />
        )}
      </div>
      <div className='Header--logo'>
        <Link href='/?amp=1'>
          <a className='Header--logo'>
            {isAmp ? (
              <amp-img width='120' height='24' src='/assets/logos/friendsVPN.svg' alt='friendsVPN' layout='responsive' />
            ) : (
              <img width='120' height='24' src='/assets/logos/friendsVPN.svg' alt='friendsVPN' />
            )}
          </a>
        </Link>
      </div>{' '}
      <Offcanvas className='Header__offCanvas' show={show} onHide={handleClose}>
        <span className='Header__offCanvas--close'>
          <MdCancel size={32} onClick={handleClose} />
        </span>
        <Offcanvas.Body className='Header__Body'>
          <div className='Header__Body--Top'>
            {isAmp ? (
              <amp-img width='66' height='66' src='/assets/logos/person.svg' alt='person' layout='responsive' />
            ) : (
              <img width='66' height='66' src='/assets/logos/person.svg' alt='person' />
            )}
            <p className='Header__Body--Top__name'>{profile?.name || 'Anonymous'}</p>
            <p className='Header__Body--Top__email'>{profile?.email || 'anonymous@example.com'}</p>
          </div>

          <div className='Header__Body--List'>
            <ul>
              {ListItems.map((item, index) => (
                <li key={index} onClick={handleClose}>
                  <Link href={success ? `${item?.hrefSuccess}` : `${item?.href}`}>
                    <a target={success && '__blank'}>
                      <span className='Header__Body--List__icons'>{item?.icon}</span>
                      <span>{item?.name}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            {success ? (
              <div
                className='Header__Body--List__logout'
                onClick={() => {
                  logout()
                }}
              >
                <Link href='/?amp=1'>
                  <a>
                    <TbLogout size={24} />
                    <span>Logout</span>
                  </a>
                </Link>
              </div>
            ) : (
              <div className='Header__Body--List__logout' onClick={() => handleClose()}>
                <Link href='/login?amp=1'>
                  <a>
                    <TbLogin size={24} />
                    <span>Login</span>
                  </a>
                </Link>
              </div>
            )}
          </div>

          <div className='Header__Body--footer'>
            <ul>
              {Footer.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <a target='__blank'>{item.icon}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
