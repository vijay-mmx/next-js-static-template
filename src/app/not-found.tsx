"use client";

import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex,nofollow" />
            </Head>
            <div
                className="d-flex justify-content-center align-items-center bg-primary p-6 text-white"
                style={{ height: "100vh" }}
                data-bs-theme="dark"
            >
                <div className="text-center">
                    <p className="display-4 fw-semibold text-secondary">Page not found.</p>
                    <p className="mt-3 h5 text-muted">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                    <Link href={"/"} className="mt-5 btn btn-sm text-accent fw-semibold btn-link">
                        GO HOME
                    </Link>
                </div>
            </div>
        </>
    );
}
