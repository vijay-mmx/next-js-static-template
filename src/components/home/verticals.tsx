"use client";

import React, { useRef } from "react";
import SectionHead from "../global/section-head";
import Button from "../global/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const VERTICALS_ITEMS = [
    {
        title: "Farms",
        desc: "One of the top most flower exporters in the world with its head office in UAE. It started to serve Dubai and Abu Dhabi as a flower supplier.",
        image: "/assets/home/verticals/farm.jpg",
    },
    {
        title: "Wholesale",
        desc: "One of the best wholesale flower suppliers and wholesale flower exporters in the UAE and Middle East. Black Tulip has the largest network.",
        image: "/assets/home/verticals/wholesale.jpg",
    },
    {
        title: "Online",
        desc: "Not only into wholesale of flowers but also a retail flower supplier. We supply fresh cut flowers, long-lasting cut flowers.",
        image: "/assets/home/verticals/online.jpg",
    },
];

const Verticals = () => {
    const sectionEl = useRef(null as HTMLImageElement | null);
    useGSAP(
        () => {
            if (!sectionEl.current) return false;

            gsap.set(sectionEl.current!.querySelectorAll(".verticals-item"), { opacity: 0 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl.current.querySelector(".verticals-items"),
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                    start: "top 80%",
                },
            }).fromTo(
                sectionEl.current!.querySelectorAll(".verticals-item"),
                {
                    y: 200,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.inOut",
                }
            );
        },
        { dependencies: [], scope: sectionEl }
    );

    return (
        <section className="section-padding pt-0" ref={sectionEl}>
            <div className="verticals-header bg-primary" data-bs-theme="dark">
                <div className="container">
                    <SectionHead
                        subtitle="verticals"
                        className="text-center mb-5 text-white"
                        title={
                            <>
                                Harvested <br /> to Handpicked
                            </>
                        }
                    />
                </div>
            </div>
            <div className="verticals-items">
                {VERTICALS_ITEMS.map((item, index) => (
                    <div className="verticals-item" key={`verticals-item-${index}`}>
                        <div className="verticals-item-image">
                            <img src={item.image} alt={item.title} width={400} height={150} loading="lazy" />
                        </div>
                        <div className="verticals-item-content">
                            <h3 className="verticals-item-title text-primary">{item.title}</h3>
                            <p className="verticals-item-desc paragraph">{item.desc}</p>
                            <Button text="Explore" className="mt-5" as="a" href="/" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Verticals;
