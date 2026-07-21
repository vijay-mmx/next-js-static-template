import React from 'react'
import Link from 'next/link'
import { menuItems } from './menu'

const MenuAside = ({ isMenuOpen, toggleMenu }: { isMenuOpen: boolean, toggleMenu: () => void }) => {
  return (
    <aside className="overlay-menu" aria-expanded={isMenuOpen}>
        <div className="menu-bg-1">
            <div className="menu-logo">
                Logo
            </div>
        </div>
        <div className="menu-bg-2">
            <div className="menu-items">
                {menuItems.map((menu, i) => (
                    <Link
                        href={menu.link}
                        className="menu-item"
                        key={i}
                        onClick={toggleMenu}
                    >
                        <h1 className="menu-item-h1">{menu.menu}</h1>
                        {/* <div className="straight-menu-line"></div> */}
                    </Link>
                ))}
            </div>

            {/* <div className="terms-items">
                <div className="menu-item">
                    <p>Terms & Conditions</p>
                    <div className="straight-menu-line"></div>
                </div>
                <div className="menu-item">
                    <p>Privacy Policy</p>
                    <div className="straight-menu-line"></div>
                </div>
                <div className="menu-item">
                    <p>Disclaimer</p>
                    <div className="straight-menu-line"></div>
                </div>
            </div> */}

            <div className="menu-copyright">
                <p>
                    © {new Date().getFullYear()} Your Company
                    Pvt. Ltd. All Rights Reserved.
                </p>
            </div>
        </div>
        <div className="mobile-menu">
            <button className="mobile-menu-btn" onClick={toggleMenu}>
                <div className="first-line">
                    <div className="menu-dot"></div>
                    <div className="straight-line"></div>
                </div>
                <div className="straight-line"></div>
            </button>
        </div>
    </aside>
  )
}

export default MenuAside