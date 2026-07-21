"use client";

import React, { useRef, useState } from "react";
import SectionHead from "../global/section-head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const farms = [
    {
        title: "Batian Flowers",
        country: "Kenya",
        image: "/assets/farms/kenya/farms-1.jpg",
    },
    {
        title: "Fontana",
        country: "Kenya",
        image: "/assets/farms/kenya/farms-2.jpg",
    },
    {
        title: "Laurel Investments",
        country: "Kenya",
        image: "/assets/farms/kenya/farms-3.jpg",
    },
    {
        title: "Golden Tulip Farms",
        country: "Kenya",
        image: "/assets/farms/kenya/farms-4.jpg",
    },
    {
        title: "Black Petals",
        country: "Kenya",
        image: "/assets/farms/kenya/farms-5.jpg",
    },
    {
        title: "Sun Floritech",
        country: "Kenya",
        image: "/assets/farms/kenya/farms-6.jpg",
    },
    {
        title: "Utee Estate",
        country: "Kenya",
        image: "/assets/farms/kenya/farms-7.jpg",
    },
    {
        title: "ECO Roses",
        country: "Kenya",
        image: "/assets/farms/kenya/farms-8.jpg",
    },
    {
        title: "Tulaga",
        country: "Kenya",
        image: "/assets/farms/kenya/farms-9.jpg",
    },
    {
        title: "Hansa Flowers",
        country: "Ethipoia",
        image: "/assets/farms/kenya/farms-10.jpg",
    },
];

const FarmsSlider = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [swiperInstance, setSwiperInstance] = useState(null as SwiperType | null);

    function handleOnPrev() {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    }
    function handleOnNext() {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    }

    const sectionEl = useRef(null as HTMLImageElement | null);
    useGSAP(
        () => {
            if (!sectionEl.current) return false;

            gsap.set(sectionEl.current!.querySelectorAll(".farms-slide-item"), {
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl.current.querySelector(".farms-slider"),
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                    start: "top 80%",
                },
            }).fromTo(
                sectionEl.current!.querySelectorAll(".farms-slide-item"),
                {
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                },
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.inOut",
                }
            );
        },
        { dependencies: [], scope: sectionEl }
    );

    return (
        <section className="section-padding border-top" ref={sectionEl}>
            <div className="farms-slider-wrapper">
                <SectionHead
                    className="text-center mb-3"
                    title={
                        <>
                            Sustainable Farms <br /> Across the Globe
                        </>
                    }
                    subtitle={"Global Flower Farms"}
                    desc={
                        "From rich African soils to expanding fields in Asia, BTF Group's farms nurture vibrant, long-lasting flowers grown with care, sustainability, and innovation."
                    }
                />
            </div>
            <div className="farms-slider-container mt-4">
                <Swiper
                    className="farms-slider"
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    loop={true}
                    grabCursor={true}
                    speed={1000}
                    onSwiper={setSwiperInstance}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                        },
                        480: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                    }}
                >
                    {farms.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="farms-slide-item">
                                <div className="ratio">
                                    <img className="farms-slide-item-img" src={item.image} alt={item.title} />
                                </div>
                                <div className="farms-slide-item-content">
                                    <div className="farms-slide-item-index">
                                        <span>{`${`${index + 1}`.padStart(2, "0")}`}</span>
                                    </div>
                                    <div className="farms-slide-item-content-wrapper">
                                        <p className="farms-slide-item-title">{item.title}</p>
                                        <p className="farms-slide-item-country">{item.country}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-navigation">
                    <button className="swiper-navigation-left" aria-label="Previous" onClick={handleOnPrev}>
                        <ChevronLeft strokeWidth={1} />
                    </button>
                    <button className="swiper-navigation-right" aria-label="Next" onClick={handleOnNext}>
                        <ChevronRight strokeWidth={1} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FarmsSlider;
