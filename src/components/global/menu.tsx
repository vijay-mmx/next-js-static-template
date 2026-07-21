"use client";

import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { ChevronRight, ChevronDown ,ChevronUp} from "lucide-react";
import { MENU_ITEMS } from "../data/menu";
import RotateLink from "../rotate-link";

const Menu = ({ menuOpen, closeMenu }: { menuOpen: boolean; closeMenu: () => void }) => {
    const menuRef = useRef(null as HTMLDivElement | null);
    const menuTl = useRef<gsap.core.Timeline | null>(null);

    const [activeId, setActiveId] = useState(0);
    const [prevId, setPrevId] = useState(0);

    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const closeTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

    useGSAP(
        () => {
            if (!menuRef.current) return;
            menuTl.current = gsap
                .timeline({
                    paused: true,
                    onStart: () => {
                        document.querySelector("html")?.classList.add("menu-open");
                    },
                    onReverseComplete: () => {
                        document.querySelector("html")?.classList.remove("menu-open");
                    },
                })
                .fromTo(menuRef.current, { display: "none" }, { display: "block" })
                .fromTo(
                    menuRef.current!,
                    { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 0.75,
                        ease: "power4.inOut",
                    }
                )
                .fromTo(
                    menuRef.current.querySelectorAll(".menu-nav > ul > .menu-nav-item"),
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.25, ease: "power1.out", stagger: 0.1 },
                    "-=0.3"
                )
                .fromTo(
                    menuRef.current.querySelectorAll(".menu-contact-block, .menu-footer"),
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.25, ease: "power1.out", stagger: 0.1 },
                    "-=0.3"
                );
            menuTl.current.timeScale(1.3);
        },
        { scope: menuRef }
    );

    useGSAP(
        () => {
            if (menuTl.current) {
                if (menuOpen) {
                    menuTl.current.play();
                } else {
                    menuTl.current.reverse();
                }
            }
        },
        { dependencies: [menuOpen] }
    );

    const openDrop = (index: number) => {
        clearTimeout(closeTimers.current[index]);
        if (index !== activeId) {
            setPrevId(activeId);
            setActiveId(index);
        }
        if (MENU_ITEMS[index].sublinks.length > 0) {
            setOpenDropdown(index);
        }
    };

    const scheduleClose = (index: number) => {
        closeTimers.current[index] = setTimeout(() => {
            setOpenDropdown((prev) => (prev === index ? null : prev));
        }, 150);
    };

    const cancelClose = (index: number) => {
        clearTimeout(closeTimers.current[index]);
    };

    const TOTAL = MENU_ITEMS.length;
    const opensUpward = (index: number) => index >= TOTAL - 4;

    // CHANGE 2: items at index >= 5 (6th item onward) use ChevronFirst when open
    const getOpenIcon = (index: number) => {
        if (index >= 5) {
            return <ChevronUp size={16} strokeWidth={2} />;
        }
        return <ChevronDown size={16} strokeWidth={2} />;
    };

    return (
        <aside className="menu" id="menu" aria-label="Main Menu" ref={menuRef} data-bs-theme="dark">
            <button
                className="header-menu-toggle active"
                aria-expanded={menuOpen}
                aria-controls="menu"
                onClick={() => closeMenu()}
            >
                <span className="header-menu-toggle-text">CLOSE</span>
                <span className="header-menu-toggle-lines">
                    <span></span>
                    <span></span>
                </span>
            </button>

            <div className="menu-wrapper">
                <div className="menu-left">
                    {MENU_ITEMS.map((item, index) => {
                        const isActive = index === activeId;
                        const isPrev = index === prevId;
                        return (
                            <img
                                key={`menu-left-${index}`}
                                src={item.image}
                                alt=""
                                className={`menu-left-item ${isActive ? "active" : ""} ${isPrev ? "prev" : ""}`}
                            />
                        );
                    })}
                </div>

                <div className="menu-right">
                    <div className="menu-right-main">
                        <div className="menu-nav-title">MENU</div>
                        <nav className="menu-nav">
                            <ul>
                                {MENU_ITEMS.map((item, index) => {
                                    const hasChildren = item.sublinks.length > 0;
                                    const isOpen = openDropdown === index;
                                    const upward = opensUpward(index);

                                    return (
                                        <li
                                            key={`menu-nav-item-${index}`}
                                            className="menu-nav-item"
                                            // CHANGE 1: hover on the full <li> opens/closes dropdown
                                            onMouseEnter={() => openDrop(index)}
                                            onMouseLeave={() => scheduleClose(index)}
                                        >
                                            {/* <span className="menu-nav-link-row"> */}
                                            <span className={`menu-nav-link-row${isOpen ? " is-open" : ""}`}>
                                                <RotateLink href={item.href}>
                                                    {item.name}
                                                </RotateLink>

                                                {hasChildren && (
                                                    <span
                                                        className={`menu-drop-icon${isOpen ? " is-open" : ""}`}
                                                        aria-hidden="true"
                                                    >
                                                        {isOpen
                                                            ? getOpenIcon(index)
                                                            : <ChevronRight size={16} strokeWidth={2} />
                                                        }
                                                    </span>
                                                )}
                                            </span>

                                            {hasChildren && (
                                                <div
                                                    className={[
                                                        "menu-dropdown",
                                                        isOpen ? "menu-dropdown--open" : "",
                                                        upward ? "menu-dropdown--up" : "",
                                                    ].join(" ")}
                                                    onMouseEnter={() => cancelClose(index)}
                                                    onMouseLeave={() => scheduleClose(index)}
                                                >
                                                    <ul className="menu-dropdown-list">
                                                        {item.sublinks.map((sub, si) => (
                                                            <li
                                                                key={`sub-${index}-${si}`}
                                                                style={{ "--i": si } as React.CSSProperties}
                                                            >
                                                                <Link href={sub.href} className="menu-dropdown-link">
                                                                    <span className="menu-dropdown-bullet" aria-hidden="true" />
                                                                    {sub.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>

                    <div className="menu-right-side">
                        <div className="menu-contact">
                            <div className="menu-contact-block border-bottom-0">
                                <img
                                    src="/assets/images/White-logo-btf-june-26.png"
                                    alt="Black Tulip"
                                    width={200}
                                    height={158}
                                />
                            </div>
                            <div className="menu-contact-block">
                                <p className="menu-contact-block-title">CONTACT</p>
                                <RotateLink href="tel:+971552219346" className="rotate-text-msg ">+971 55 221 9346</RotateLink>
                                <br />
                                <RotateLink href="mailto:info@btfgroup.com" className="rotate-text-msg">info@btfgroup.com</RotateLink>
                            </div>
                            <div className="menu-contact-block">
                                <p className="menu-contact-block-title">VISIT</p>
                                <p>
                                    <b>Corporate Head Office</b> <br />
                                    Black Tulip Flowers LLC <br />
                                    P.O. Box: 231771, Haleb St, Al Qusais, DUBAI - U.A.E <br />
                                    Saturday - Thursday: 9:00 AM - 9:00 PM <br />
                                    Friday: 8:30 AM - 6.00PM
                                </p>
                            </div>
                        </div>
                        <div className="menu-footer">
                            <p>&#169; {new Date().getFullYear()} Black Tulip Flowers LLC. All Rights Reserved.</p>
                            <p>
                                Site By{" "}
                                <Link href="https://mediamax.co.in/" target="_blank">
                                    MEDiAMAX
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Menu;
