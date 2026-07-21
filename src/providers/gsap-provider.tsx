"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BackToTop from "@/components/global/backtotop";
import WhatsAppChatWidget from "@/components/global/whatsapp-chat-widget";

type GSAPContextValue = {
    scroll: ScrollSmoother | null;
};

const GSAPContext = createContext<GSAPContextValue>({} as GSAPContextValue);

export const useGSAPContext = () => useContext(GSAPContext);

const GsapProvider = ({ children }: { children: ReactNode }) => {
    gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, ScrollToPlugin);

    const [scroll, setScroll] = useState<ScrollSmoother | null>(null);

    useGSAP(() => {
        // const footer = document.querySelector(".footer-wrapper");

        const _scroll = ScrollSmoother.create({
            smooth: 2,
            effects: true,
            normalizeScroll: true,
            // onUpdate: (self) => {
            //     let pos = self.scrollTop();
            //     document.body.classList.toggle("header-scrolled", pos > 100);
            //     if(footer) {
            //         document.body.classList.toggle(
            //             "footer-visible",
            //             pos + window.innerHeight >=
            //                 footer!.getBoundingClientRect().top
            //         );
            //     }
            //     // console.log("scrolling", self.scrollTop());
            // },
        });
        setScroll(_scroll);

        setTimeout(() => {
            const hash = window.location.hash;
            if (hash) {
                _scroll?.scrollTo(hash, true, "center center");
            }
        }, 200);
    });

    return (
        <>
            <GSAPContext.Provider value={{ scroll }}>
                <BackToTop />
                <div id="smooth-wrapper">
                    <div id="smooth-content">{children}</div>
                </div>
                <WhatsAppChatWidget />
            </GSAPContext.Provider>
        </>
    );
};

export default GsapProvider;
