import { Head, usePage } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import Hero from "./home/Hero";
import WhatsAppChat from "@/components/WhatsAppChat";
import PackageList from "./home/Packages";
import Services from "./home/Services";
import About from "./home/About";
import MapSection from "./home/MapSection";
import Contact from "./home/Contact";

import { PackagesList, PromotionList, ServiceList } from "@/types";

export default function Welcome() {
    const { services, packages, promotions } = usePage().props as {
        services?: ServiceList
        packages?: PackagesList
        promotions?: PromotionList
    }

    console.log(services, 'servicios')
    console.log(packages, 'paquetes')
    console.log(promotions, 'promociones')

    if (!promotions) return null;
    if (!services) return null;
    if (!packages) return null;

    return (
        <>
            <Head title="Uñas & Mechas - Salón de Belleza">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <MainLayout>
                <main className="bg-amber-50">
                    <section id="inicio">
                        <Hero />
                    </section>

                    <section id="servicios">
                        <Services services={services} />
                    </section>

                    <section id="paquetes">
                        <PackageList packages={packages} />
                    </section>

                    <section id="nosotros">
                        <About />
                    </section>

                    <section id="ubicacion">
                        <MapSection />
                    </section>

                    <section id="contacto">
                        <Contact />
                    </section>
                </main>


                <WhatsAppChat phoneNumber="+505 1234 5678" />
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