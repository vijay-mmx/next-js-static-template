import Banner from "@/components/home/banner";
import { Metadata } from "next";

// CHANGE THIS Metadata according to you site
export const metadata: Metadata = {
    title: {
        absolute: "meta title",
    },
    description: "meta descp",
    openGraph: {
        title: {
            absolute: "meta title",
        },
        description: "meta descp",
    }
}

export default function Home() {
    return (
        <>
            <Banner />
        </>
    );
}
