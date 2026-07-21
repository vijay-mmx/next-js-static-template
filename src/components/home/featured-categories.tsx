"use client";

import Button from "../global/button";
import SectionHead from "../global/section-head";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flowers from "../icons/flowers";
import Plants from "../icons/plants";
import Pots from "../icons/pots";

const FeaturedCategories = () => {
    const sectionEl = useRef(null as HTMLImageElement | null);
    useGSAP(
        () => {
            if (!sectionEl.current) return false;

            gsap.set(sectionEl.current!.querySelectorAll(".feature-categories-item"), { opacity: 0 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl.current.querySelector(".feature-categories-items"),
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                    start: "top 80%",
                },
            }).fromTo(
                sectionEl.current!.querySelectorAll(".feature-categories-item"),
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
        <>
            <section className="section-padding border-top" ref={sectionEl}>
                <div className="container">
                    <SectionHead
                        subtitle={"SHOP"}
                        className="text-center"
                        title={
                            <>
                                Petals, <br /> Plants & More
                            </>
                        }
                    />
                    <div className="feature-categories-items mt-5">
                        <div className="feature-categories-item">
                            <div className="feature-categories-item-inner">
                                <div className="feature-categories-item-icon-wrapper">
                                    <Flowers />
                                </div>
                                <div className="feature-categories-item-content-wrapper">
                                    <h4 className="feature-categories-item-content-title">Flowers</h4>
                                    <p className="paragraph">
                                        Import fresh-cut flowers from our farms and partners, offering a wide range and ensuring a steady
                                        supply of popular blooms.
                                    </p>
                                    <Button text="Explore" className="mt-5" as="a" href="/" />
                                </div>
                            </div>
                        </div>
                        <div className="feature-categories-item">
                            <div className="feature-categories-item-inner">
                                <div className="feature-categories-item-icon-wrapper">
                                    <Plants />
                                </div>
                                <div className="feature-categories-item-content-wrapper">
                                    <h4 className="feature-categories-item-content-title">Plants</h4>
                                    <p className="paragraph mt-4">
                                        Bring nature indoors with our indoor plant varieties, supporting a greener planet for plant lovers
                                        everywhere.
                                    </p>
                                    <Button text="Explore" className="mt-5" as="a" href="/" />
                                </div>
                            </div>
                        </div>
                        <div className="feature-categories-item">
                            <div className="feature-categories-item-inner">
                                <div className="feature-categories-item-icon-wrapper">
                                    <Pots />
                                </div>
                                <div className="feature-categories-item-content-wrapper">
                                    <h4 className="feature-categories-item-content-title">Accessories</h4>
                                    <p className="paragraph mt-4">
                                        Choose from a variety of pots, planters, nursery plants, and gardening accessories to enhance your
                                        green spaces.
                                    </p>
                                    <Button text="Explore" className="mt-5" as="a" href="/" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default FeaturedCategories;
