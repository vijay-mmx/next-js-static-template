import "../styles/globals.scss";
import Header from "@/components/global/header";
import GsapProvider from "@/providers/gsap-provider";
import LoaderProvider from "@/providers/loader-provider";
import Menu from "@/components/global/menu";
import UniversalForceRefreshFix from "@/components/shared/universal-force-refresh-fix";
import type { Metadata } from "next";
import Script from "next/script";

// import { Instrument_Serif } from "next/font/google";
// const fontSerif = Instrument_Serif({
//     subsets: ["latin"],
//     weight: ["400"],
//     variable: "--bs-headings-font-family",
// });

export const metadata: Metadata = {
    title: {
        default: "Black Tulip Group | Global Flower Importers & Wholesalers",
        template: "%s | Black Tulip Group",
    },
    description:
        "Black Tulip Group (BTF Group) is one of the largest floral importers, wholesalers, and retailers in the Middle East and Asia—offering fresh flowers, plants, accessories, and event floral services.",
    keywords: [
        "Black Tulip Group",
        "BTF Group",
        "flower wholesalers UAE",
        "fresh flowers importers",
        "plants supplier UAE",
        "floral accessories",
        "event flowers",
        "wholesale flowers",
    ],
    metadataBase: new URL("https://btfgroup.com"),
    alternates: {
        canonical: "https://btfgroup.com",
        languages: {
            "en-US": "https://btfgroup.com",
        },
    },
    openGraph: {
        type: "website",
        url: "https://btfgroup.com",
        title: "Black Tulip Group | Global Flower Importers & Wholesalers",
        description:
            "Leading importer and distributor of fresh flowers, plants, and floral accessories across the UAE, India, Qatar, Oman, Malaysia, and more.",
        siteName: "Black Tulip Group",
        images: [
            {
                url: "https://btfgroup.com/wp-content/uploads/2024/01/black-tulip-group-cover.jpg",
                width: 1200,
                height: 630,
                alt: "Black Tulip Group Flowers and Plants",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Black Tulip Group | Premium Flowers & Plants",
        description: "One of the largest floral wholesalers and importers in the Middle East and Asia.",
        images: ["https://btfgroup.com/wp-content/uploads/2024/01/black-tulip-group-cover.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
    category: "business",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>

            {/* NOTES: Google Tag Manager, Google Analytics and Meta pixel - Enter you id in each {id} */}
            {/* <script async src="https://www.googletagmanager.com/gtag/js?id=AW-{id}"></script>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-id"></script> */}

            {/* Google Tag Manager & Google Analytics */}
            {/* <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-{id}"
            strategy="afterInteractive"
            />
            <Script>
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'AW-{id}');
                gtag('config', 'G-id');
                `}
            </Script> */}

            {/* Meta pixel */}
            {/* <Script>
                {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '{id}');fbq('track', 'PageView');`}
            </Script> */}
            
                <link rel="preconnect" href="https://use.typekit.net" />
                <link rel="preconnect" href="https://p.typekit.net" />
                <link rel="stylesheet" href="https://use.typekit.net/odl3mbt.css" />
                <link rel="apple-touch-icon" sizes="57x57" href="/misc/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/misc/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/misc/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/misc/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/misc/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/misc/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/misc/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/misc/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/misc/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/misc/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/misc/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/misc/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/misc/favicon-16x16.png" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff"></meta>
            </head>
            <body>
                {/* <noscript><img height="1" width="1" style={{display: "none"}}
                src="https://www.facebook.com/tr?id={id}&ev=PageView&noscript=1"
                /></noscript> */}

                <LoaderProvider>
                    {/* <GSAPCleanup /> */}
                    <UniversalForceRefreshFix />
                    {/* <Menu /> */}
                    <Header />
                    <GsapProvider>
                        {children}
                    </GsapProvider>
                </LoaderProvider>
            </body>
        </html>
    );
}
