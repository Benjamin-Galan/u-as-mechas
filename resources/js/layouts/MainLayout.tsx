import Footer from "@/pages/home/Footer";
import { ReactNode } from "react";

type MainLayoutProps = {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>

            {children}
            <Footer />
        </>
    )
}

