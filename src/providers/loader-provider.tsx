"use client";
import Loader from "@/components/loader";
import { usePathname } from "next/navigation";
import { ReactNode, createContext, useContext, useState } from "react";

type LoaderContextValue = {
    loaded: boolean;
    setLoaded: (loaded: boolean) => void;
};

const LoaderContext = createContext<LoaderContextValue>({} as LoaderContextValue);

export const useLoaderContext = () => useContext(LoaderContext);

const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [loaded, setLoaded] = useState(!isHome);

    return (
        <LoaderContext.Provider value={{ loaded: loaded, setLoaded }}>
            {!loaded && isHome && <Loader />}
            {children}
        </LoaderContext.Provider>
    )
};

export default LoaderProvider;