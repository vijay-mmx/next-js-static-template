"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import React, { ReactElement, useRef } from "react";

const SectionHead = ({
    title,
    subtitle,
    desc,
    className,
}: {
    subtitle?: ReactElement | string;
    title?: ReactElement | string;
    desc?: ReactElement | string;
    className?: string;
}) => {
    const element = useRef(null as HTMLDivElement | null);

    useGSAP(
        () => {
            if (!element.current) return false;
            const subChars = new SplitText(element.current.querySelectorAll(".section-subtitle"), {
                type: "chars,lines",
                tag: "span",
                linesClass: "line",
                charsClass: "char",
            });
            const titleChars = new SplitText(element.current.querySelectorAll(".section-title"), {
                type: "chars,lines",
                tag: "span",
                linesClass: "line",
                charsClass: "char",
            });

            gsap.set([subChars.chars, titleChars.chars], { opacity: 0, y: 20 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: element.current,
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                    start: "top 80%",
                },
            })
                .fromTo(
                    subChars.chars,
                    {
                        opacity: 0,
                        y: 50,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.inOut",
                        stagger: 0.01,
                    },
                    "anim"
                )
                .fromTo(
                    titleChars.chars,
                    {
                        opacity: 0,
                        y: 50,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.inOut",
                        stagger: 0.01,
                    },
                    "anim"
                );
        },
        { dependencies: [], scope: element }
    );

    return (
        <div className={`section-head ${className}`} ref={element}>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
            {title && <h2 className="section-title">{title}</h2>}
            {desc && <p className="paragraph">{desc}</p>}
        </div>
    );
};

export default SectionHead;
