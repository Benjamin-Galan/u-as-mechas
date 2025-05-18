import { Head } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import Hero from "./home/Hero";

export default function Welcome() {
    return (
        <>
            <Head title="Uñas & Mechas - Salón de Belleza">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <MainLayout>
                <Hero />

                <main>

                </main>
            </MainLayout>
        </>
    )
}

/**
 * <main>
        <Hero />
        <Services />
        <Packages />
        <Promotion />
        <About />
        <MapSection />
        <Contact />
      </main>

      <Footer />

      //<WhatsAppChat phoneNumber="+505 1234 5678" />
 */