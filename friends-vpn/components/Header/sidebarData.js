import { FaStar } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaUserAlt } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaInfoCircle } from 'react-icons/fa'
import { FaFacebookSquare } from 'react-icons/fa'
import { BsGearFill } from 'react-icons/bs'

export const ListItems = [
  {
    name: 'My Account',
    hrefSuccess: 'https://www.friendsvpnpro.com/dashboard-portal',
    href: '/login?amp=1',
    icon: <FaUserAlt size={16} />,
  },
  {
    name: 'Settings',
    hrefSuccess: 'https://www.friendsvpnpro.com/dashboard-portal',
    href: '/login?amp=1',
    icon: <BsGearFill size={16} />,
  },
  {
    name: 'Rate Us',
    href: '/app-rating',
    icon: <FaStar size={16} />,
  },
  {
    name: 'About Us',
    hrefSuccess: 'https://www.friendsvpnpro.com/about',
    href: '/login?amp=1',
    icon: <FaInfoCircle size={16} />,
  },
]

export const Footer = [
  {
    name: 'facebook',
    href: 'https://www.facebook.com/',
    icon: <FaFacebookSquare size={28} color='white' />,
  },
  {
    name: 'twitter',
    href: 'https://twitter.com/',
    icon: <FaTwitter size={28} color='white' />,
  },
  {
    name: 'instagram',
    href: 'https://www.instagram.com/',
    icon: <FaInstagram size={28} color='white' />,
  },
]
