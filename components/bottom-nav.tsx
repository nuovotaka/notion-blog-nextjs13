'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Mystyles from '../styles/mystyles.module.scss'
import { FaHome, FaUser, FaLink } from 'react-icons/fa'
import { MdPrivacyTip } from 'react-icons/md'


interface NavItem {
  label: string
  path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
}

const BottomNav = () => {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { label: 'Home', path: '/blog' , icon: <FaHome size={20} color={'#999'} /> },
    { label: 'About', path: '/about', icon: <FaUser size={20} color={'#999'} /> },
    { label: 'NUOVOTAKA', path: 'https://nuovotaka.com', icon: <FaLink size={20} color={'#999'} /> },
    { label: 'Privacy', path: '/privacy', icon: <MdPrivacyTip size={20} color={'#999'} /> },
  ]

  return (
    <div className={Mystyles.footer}>
      <ul>
        {navItems.map(({ label, path , icon}) => (
          <li key={label}>
            <Link href={path} className={pathname === path ? 'active' : null}>
              {icon}<br/>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BottomNav