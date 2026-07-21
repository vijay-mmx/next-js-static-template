"use client";

import { useGSAP } from "@gsap/react";
import React, { useEffect } from "react";
import gsap from "gsap";
import { useRef } from "react";
import QuoteIcon from "../icons/quote";

const Quote = () => {
    const sectionEl = useRef(null as HTMLImageElement | null);
    useGSAP(
        () => {
            if (!sectionEl.current) return false;

            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl.current,
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                    scrub: true,
                    start: "top 80%",
                },
            }).fromTo(
                sectionEl.current,
                {
                    backgroundPositionY: "40%",
                },
                {
                    backgroundPositionY: "60%",
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.inOut",
                }
            );
        },
        { dependencies: [], scope: sectionEl }
    );

    useEffect(() => {
        if (!sectionEl.current || !sectionEl.current.querySelector<HTMLVideoElement>("video")) return;
        sectionEl.current.querySelector<HTMLVideoElement>("video")!.playbackRate = 0.75;
    }, [sectionEl]);

    
    return (
        <section className="quote-paralax" ref={sectionEl}>
            <video src="/assets/videos/quote-video.mp4" autoPlay muted loop playsInline></video>
            <div className="quote-paralax-content">
                <QuoteIcon />
                <p className="quote-paralax-text">
                    There are always flowers <br />
                    for those who want to see them.
                </p>
                <p className="quote-paralax-author">Henri Matisse</p>
            </div>
        </section>
    );
};

export default Quote;
