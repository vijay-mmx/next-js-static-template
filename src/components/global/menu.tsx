"use client";

import { useEffect, useRef, useState } from "react";
import { useLoaderContext } from "@/providers/loader-provider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SlArrowRight } from "react-icons/sl";
import Link from "next/link";
import MenuAside from "./menu-aside";

export const menuItems = [
    {
        menu: "Home",
        link: "/#",
    },
    {
        menu: "Company",
        link: "/#",
    },
    {
        menu: "Projects",
        link: "/#",
    },
    {
        menu: "Interiors",
        link: "/#",
    },
    {
        menu: "Careers",
        link: "/#",
    },
    {
        menu: "Contact",
        link: "/#",
    },
];

const Menu = () => {
    const container = useRef(null as HTMLDivElement | null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const tl = useRef<gsap.core.Timeline | null>(null);
    
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
        { scope: container }
    );

    useEffect(() => {
        if (isMenuOpen) {
            tl.current?.play();
        } else {
            tl.current?.reverse();
        }
    }, [isMenuOpen]);

    return (
        <div className="menu-overlay-wrapper" ref={container}>
            <div className="menu-wrapper">
                <button
                    className="header-menu"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                    aria-expanded={isMenuOpen}
                >
                    <div className="header-menu-icon">
                        <div className="menu-line-wrapper">
                            <div className="menu-line"></div>
                            <div className="menu-line"></div>
                            <div className="menu-line"></div>
                        </div>
                        <p>{isMenuOpen ? "Close" : "Menu"}</p>
                    </div>
                </button>
                <Link
                    className="header-menu-2"
                    href="/contact#form"
                >
                    <div className="header-menu-icon">
                        <div className="menu-line-wrapper">
                            <div className="menu-line"></div>
                            <SlArrowRight className="menu-icon" />
                        </div>
                        <p>Let's Build</p>
                    </div>
                </Link>
            </div>

            <MenuAside isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}/>
        </div>
    );
};

export default Menu;
