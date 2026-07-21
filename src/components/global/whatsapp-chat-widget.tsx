"use client";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLoaderContext } from "@/providers/loader-provider";
import gsap from "gsap";

const WhatsAppChatWidget: React.FC = () => {
    const { loaded } = useLoaderContext();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!loaded) return;
        const handleLoad = () => {
            gsap.fromTo(
                ".whatsappchat",
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 1,
                    ease: "power4.out",
                }
            );
            // setIsVisible(true);
        };
        setTimeout(() => {
            handleLoad();
        }, 5000);
    }, [loaded]);
    const toggleChat = () => {
        setIsVisible((prev) => !prev);
    };
    const closeChat = () => {
        setIsVisible(false);
    };
    return (
        <>
            <div id="whatsapp-chat" 
                className={isVisible ? "whatsapp-chat show" : "whatsapp-chat hide"}
            >
                <div className="header-chat">
                    <div className="head-home">
                        {/* <div className="info-avatar">
                            <img src="/assets/images/whatsapp-avatar.jpg" alt="S A Homes Avatar" width={48} height={48} />
                        </div> */}
                        <p>
                            <span className="whatsapp-name">S A Homes</span>
                        </p>
                    </div>
                </div>

                <button className="close-chat" onClick={closeChat}>
                    <X />
                </button>

                <div className="start-chat">
                    <div className="whatsapp-chat-body">
                        <div className="WhatsappChat__MessageContainer-sc-1wqac52-1 dAbFpq">
                            <div style={{ opacity: 1 }} className="WhatsappChat__Message-sc-1wqac52-4 kAZgZq">
                                <div className="WhatsappChat__Text-sc-1wqac52-2 iSpIQi">
                                    Hi there <br />
                                    <br />
                                    How can we help you?
                                </div>
                            </div>
                            <div className="blanter-msg">
                                <a href="https://wa.me/919988776655" target="_blank" rel="noopener noreferrer" className="blanter-msg-btn">
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="whatsappchat" title="Show Chat" onClick={toggleChat}>
                <svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#eceff1"
                        d="M20.5 3.4A12.1 12.1 0 0012 0 12 12 0 001.7 17.8L0 24l6.3-1.7c2.8 1.5 5 1.4 5.8 1.5a12 12 0 008.4-20.3z"
                    />
                    <path
                        fill="#4caf50"
                        d="M12 21.8c-3.1 0-5.2-1.6-5.4-1.6l-3.7 1 1-3.7-.3-.4A9.9 9.9 0 012.1 12a10 10 0 0117-7 9.9 9.9 0 01-7 16.9z"
                    />
                    <path
                        fill="#fafafa"
                        d="M17.5 14.3c-.3 0-1.8-.8-2-.9-.7-.2-.5 0-1.7 1.3-.1.2-.3.2-.6.1s-1.3-.5-2.4-1.5a9 9 0 01-1.7-2c-.3-.6.4-.6 1-1.7l-.1-.5-1-2.2c-.2-.6-.4-.5-.6-.5-.6 0-1 0-1.4.3-1.6 1.8-1.2 3.6.2 5.6 2.7 3.5 4.2 4.2 6.8 5 .7.3 1.4.3 1.9.2.6 0 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"
                    />
                </svg>{" "}
                <span>Chat with Us</span>
            </button>
        </>
    );
};

export default WhatsAppChatWidget;
