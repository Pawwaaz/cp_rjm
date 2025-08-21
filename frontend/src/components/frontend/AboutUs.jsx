import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import About from "../common/About";
import Hero from "../common/Hero";
import FaqBot from "../common/FaqBot";

const AboutUs = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <Hero
          preHeading="Terpercaya, Berpengalaman, Integritas"
          heading="Tentang Kami"
          text="PT Raffi Jasa Mandiri adalah perusahaan jasa yang bergerak 
          di bidang pengurusan tenaga kerja asing. Kami berkomitmen memberikan layanan terpercaya, berpengalaman, 
          dan berintegritas untuk memenuhi kebutuhan klien dengan sepenuh hati."
        />

        <About />
        {/* FAQ */}
        <FaqBot />
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
