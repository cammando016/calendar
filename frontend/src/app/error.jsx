'use client'

import ErrorNavbar from "@/components/ErrorNavbar";

export default function Error({ error }) {
    return (
        <div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80dvh" }}>
            <h1>Something went wrong</h1>
            <p>{error?.message || 'An unknown error occurred'}</p>
            <p>Please return to the <a href="/">Home Page</a></p>
        </div>
        <ErrorNavbar />
        </div>
    );
}