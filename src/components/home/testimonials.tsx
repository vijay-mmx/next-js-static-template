"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Quote from "../icons/quote";
import SectionHead from "../global/section-head";

const TESTIMONIALS_ITEMS = [
    {
        content: (
            <>
                &quot; Great place to buy variety of <br /> fresh flowers & plants at best price. &quot;
            </>
        ),
        name: "Angela Deviatova",
        company: "LOREM IPSUM",
    },
    {
        content:
            "The wonderful customer service, along with the excellent quality of flowers, it will make to continue to order from Black Tulip Flowers.",
        name: "Aseel Alatoom",
        company: "LOREM IPSUM",
    },
    {
        content:
            "Great service always customer in mind. Always deliver in time. Flexible and supportive personnel all the time. Always fresh flowers. Very satisfied & thankful for the service.",
        name: "Tomas Francl",
        company: "LOREM IPSUM",
    },
];

const Testimonials = () => {
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

    return (
        <section className="bg-primary section-padding text-white" data-bs-theme="dark">
            <div className="container testimonials-slider-wrapper">
                <SectionHead subtitle={"TESTIMONIALS"} title={<>Stories of Satisfaction</>} />
                <Swiper
                    className="testimonials-slider mt-5"
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    grabCursor={true}
                    speed={500}
                    fadeEffect={{ crossFade: true }}
                    effect="fade"
                    centeredSlides={true}
                    onSwiper={setSwiperInstance}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                >
                    {TESTIMONIALS_ITEMS.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="testimonials-item">
                                <Quote className="text-white" />
                                <p className="testimonials-content mb-5 mt-3">{item.content}</p>
                                <p className="testimonials-name">{item.name}</p>
                                <p className="testimonials-company">{item.company}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-navigation mt-5">
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

export default Testimonials;
