"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Phone } from "lucide-react";
import { useWindowScroll } from "@uidotdev/usehooks";
import Menu from "./menu";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [{ y }] = useWindowScroll();
    const isfixed = useMemo(() => y && y > 4200, [y]); //100

    return (
        <>
            <header className={`header ${isfixed ? "fixed" : ""}`}>
                <div className="header-wrapper">
                    <div className="header-actions">
                        {/* <a className="header-call-action" href="tel:+971552219346" title="Call Us">
                            <Phone />
                            <span className="header-call-action-text">+971 55 221 9346</span>
                        </a> */}
                        <a className="header-call-action" href="tel:+971552219346" title="Call Us">
                            <Phone />
                            <span className="header-call-action-text">+971 55 221 9346</span>
                        </a>
                    </div>
                    <div className="header-logo">
                        <Link href="/" title="Black Tulip Group">
                        {/* <img src="/assets/images/btf_logo_final_one.png" alt="Black Tulip Group" width={180} height={141} /> */}
                        <img src="/assets/logo/logo.png" alt="Black Tulip Group" width={180} height={141} />


                        </Link>
                    </div>
                    <div className="header-menu">
                        {/* <Button text="Let's Connect" className="primary-btn--filled me-5" as="a" href="/" /> */}
                        <button
                            className="header-menu-toggle"
                            aria-expanded={menuOpen}
                            aria-controls="menu"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <span className="header-menu-toggle-text">MENU</span>
                            <span className="header-menu-toggle-lines">
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </div>
                </div>
            </header>
            <Menu menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
        </>
    );
};

export default Header;
