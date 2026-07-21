"use client";
import { RxSlash } from "react-icons/rx";
import Link from "next/link";
import Logo from "./logo";
import { useLoaderContext } from "@/providers/loader-provider";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import MenuAside from "./menu-aside";

const Header = () => {
    const { loaded } = useLoaderContext();
    const containerEl = useRef(null as HTMLDivElement | null);
    const pathname = usePathname();
    const delay = pathname === "/" ? 1 : 0;
    useGSAP(
        () => {
            gsap.to(".header-quick-link > span, .header-quick-link > .header-link, .header-quick-link > .header-slash-icon", {
                y: 0,
                duration: 1,
                delay,
                stagger: 0.1,
                ease: "power4.inOut",
            });
        },
        // { scope: containerEl, dependencies: [pathname] }
        { scope: containerEl, dependencies: [loaded && pathname] }
    );

    // aside
    const tl = useRef<gsap.core.Timeline | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    useGSAP(
        () => {
            gsap.set(".menu-item-h1", { yPercent: 150 });

            tl.current = gsap
                .timeline({ paused: true })
                .to(
                    document.querySelector("#smooth-wrapper"),
                    {
                        duration: 1,
                        opacity: 0.3,
                        x: (window.innerWidth / 3) * -1,
                        ease: "power4.inOut",
                    },
                    "menu"
                )
                .to(
                    ".overlay-menu",
                    {
                        duration: 1,
                        x: 0,
                        ease: "power4.inOut",
                    },
                    "menu"
                )
                .fromTo(
                    ".menu-bg-2",
                    {
                        x: window.innerWidth / 2,
                    },
                    {
                        duration: 1,
                        x: 0,
                        delay: 0.1,
                        ease: "power4.inOut",
                    },
                    "menu"
                )
                .to(
                    ".menu-item-h1",
                    {
                        yPercent: 0,
                        duration: 0.8,
                        ease: "power4.inOut",
                        stagger: 0.05,
                    },
                    "menu+=0.3"
                );
        },
        { scope: containerEl }
    );

    useEffect(() => {
        if (isMenuOpen) {
            tl.current?.play();
        } else {
            tl.current?.reverse();
        }
    }, [isMenuOpen]);

    return (
        <>
            <header id="header" className={`header`} ref={containerEl}>
                <div className="header-wrapper">
                    <div className="header-logo">
                        <Link href="/" aria-label="S A Homes" title="S A Homes">
                            <Logo />
                        </Link>
                    </div>
                    <div className="header-quick-links">
                        <div className="header-quick-link">
                            <span>1.</span>
                            <Link href="/" className='header-link header-nav-txt-size'>Home</Link>
                            <RxSlash size={16} className='header-slash-icon' />
                        </div>
                        <div className="header-quick-link">
                            <span>2.</span>
                            <Link href="/projects" className='header-link header-nav-txt-size'>Projects</Link>
                            <RxSlash size={16} className='header-slash-icon' />
                        </div>
                        <div className="header-quick-link">
                            <span>3.</span>
                            <Link href="/contact" className='header-link header-nav-txt-size'>Contact</Link>
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
                </div>

                <MenuAside isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}/>
            </header>
        </>
    )
}

export default Header;
