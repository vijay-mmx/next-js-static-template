"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/dist/SplitText";

const Hero = () => {
    const containerRef = useRef<HTMLElement | null>(null);
    const bgLayerARef = useRef<HTMLDivElement>(null);
    const bgLayerBRef = useRef<HTMLDivElement>(null);

    const BANNER_SLIDES = [
        {
            title: "ELEGANT",
            image: "/assets/home/hero/flower-people-1.png",
            bg:"linear-gradient(180deg, #e3f1e6 0%, #c8ced6 100%)",     
            individualClass: "banner-img--left",
        },
        {
            title: "DELICATE",
            image: "/assets/home/hero/flower-people-3.png",
            bg:"linear-gradient(180deg, #e3f1e6 0%, #95ba99 100%)",
            individualClass: "banner-img--left-x2",
        },
        {
            title: "ETHEREAL",
            image: "/assets/home/hero/flower-people-2.png",
            bg:"linear-gradient(180deg, #e3f1e6 0%, #cae3f6 100%)",
            individualClass: "banner-img--left-big",
        },
        {
            title: "RADIANT",
            image: "/assets/home/hero/flower-people-4.png",
            bg:"linear-gradient(180deg, #e3f1e6 0%, #fffac4 100%)",
            individualClass: "banner-img--left-x2",
        },
    ];

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const titles = containerRef.current.querySelectorAll(".hero-title-wrapper h2");

            const imgs = containerRef.current.querySelectorAll(".banner-img-wrapper");

            gsap.utils
                .toArray<HTMLElement>(".hero-title-wrapper h2")
                .forEach((name) => {
                    SplitText.create(name, {
                        type: "chars,lines",
                        tag: "span",
                        charsClass: "char",
                        linesClass: "line",
                    });
                });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${
                        containerRef.current.offsetHeight * BANNER_SLIDES.length
                    }`,
                    scrub: true,
                    pin: true,
                    pinType: "fixed",
                },
                onComplete: () => {
                    console.log("completed");
                },
            });

            gsap.set(`.hero-bg-overlay-0`, { background: BANNER_SLIDES[0].bg });

            BANNER_SLIDES.forEach((item, index) => {
                if (index == 0) return;

                const itemTl = gsap.timeline();

                itemTl
                    .set(`.hero-bg-overlay-${index}`, { background: BANNER_SLIDES[index].bg })
                    .fromTo(
                        `.hero-bg-overlay-${index - 1}`,
                        { opacity: 1 },
                        { opacity: 0 },
                        `item-${index}`
                    )
                    .fromTo(
                        `.hero-bg-overlay-${index}`,
                        { opacity: 0 },
                        { opacity: 1 },
                        `item-${index}`
                    )
                    .fromTo(
                        titles[index - 1].querySelectorAll(".char"),
                        {
                            yPercent: 0,
                        },
                        {
                            yPercent: -150,
                        },
                        `item-${index}`
                    )
                    .fromTo(
                        titles[index].querySelectorAll(".char"),
                        {
                            yPercent: 150,
                        },
                        {
                            yPercent: 0,
                        },
                        `item-${index}`
                    )
                    .fromTo(
                        imgs[index - 1],
                        {
                            x: "0", 
                            height: "75svh"
                        },
                        {
                            x: "-100vw", 
                            height: "130svh"
                        },
                        `item-${index}`
                    )
                    .fromTo(
                        imgs[index],
                        {
                            x: "100vw", 
                            height: "130svh"
                        },
                        {
                            x: "0", 
                            height: "75svh"
                        },
                        `item-${index}`
                    )

                tl.add(itemTl);
            })
        },
        { scope: containerRef }
    );

    // useLayoutEffect(() => {
    //     const calculate = () => {
    //         const titles = document.querySelectorAll<HTMLElement>(".hero-title-wrapper h2");
    //         const targetHeight = window.innerHeight * 0.60;
    //         const targetWidth = window.innerWidth * 0.80;
    
    //         // First pass: calculate individual scales
    //         const scales: number[] = [];
    //         titles.forEach((title) => {
    //             const currentHeight = title.offsetHeight;
    //             const currentWidth = title.scrollWidth;
    //             const scale = Math.min(targetHeight / currentHeight, targetWidth / currentWidth);
    //             scales.push(scale);
    //         });
    
    //         // Average all scales
    //         const avgScale = scales.reduce((sum, s) => sum + s, 0) / scales.length;
    
    //         // Second pass: apply the same averaged scale to all titles
    //         titles.forEach((title) => {
    //             gsap.set(title, { scale: avgScale });
    //         });
    //     };
    
    //     calculate();
    //     window.addEventListener("resize", calculate);
    //     return () => window.removeEventListener("resize", calculate);
    // }, []);

    return (
        <section className="hero-section-one" ref={containerRef}>
            <div ref={bgLayerARef} className="hero-bg-overlay" />
            <div ref={bgLayerBRef} className="hero-bg-overlay" />

            {BANNER_SLIDES.map((slide, index) => (
                <div key={index} className={`hero-bg-overlay hero-bg-overlay-${index}`} />
            ))}

            <div className="hero-title-wrapper">
                {BANNER_SLIDES.map((slide, index) => (
                    <h2 key={index}>{slide.title}</h2>
                ))}
            </div>

            {BANNER_SLIDES.map((slide, index) => (
                <div key={index} className="banner-img-wrapper">
                    <div className={`banner-img ${slide.individualClass ? slide.individualClass : ""}`}>
                        <img src={slide.image} alt="banner-img" />
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Hero;