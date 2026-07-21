import "../styles/globals.scss";
import Header from "@/components/global/header";
import GsapProvider from "@/providers/gsap-provider";
import LoaderProvider from "@/providers/loader-provider";
import Menu from "@/components/global/menu";
import UniversalForceRefreshFix from "@/components/shared/universal-force-refresh-fix";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: {
        template: "%s | default",
        default: "meta title",
    },
    metadataBase: new URL("https://you-domain.com"),
    description: "meta descp",
    openGraph: {
        title: {
            template: "%s | default",
            default: "meta title",
        },
        description: "meta descp",
    },
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
            <Script
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
            </Script>

            {/* Meta pixel */}
            <Script>
                {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '{id}');fbq('track', 'PageView');`}
            </Script>
            
                <link rel="preconnect" href="https://use.typekit.net" />
                <link rel="preconnect" href="https://p.typekit.net" />
                <link rel="stylesheet" href="https://use.typekit.net/odl3mbt.css" />

                <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />

                <link rel="icon" type="image/png" sizes="192x192" href="/favicon/favicon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff"></meta>
            </head>
            <body>
                <noscript><img height="1" width="1" style={{display: "none"}}
                src="https://www.facebook.com/tr?id=4125821640994249&ev=PageView&noscript=1"
                /></noscript>

                <LoaderProvider>
                    {/* <GSAPCleanup /> */}
                    <UniversalForceRefreshFix />
                    <Menu />
                    <Header />
                    <GsapProvider>
                        {children}
                    </GsapProvider>
                </LoaderProvider>
            </body>
        </html>
    );
}
