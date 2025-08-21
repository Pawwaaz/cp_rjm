import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import { apiurl, fileurl } from "../common/Http";
import { Link } from "react-router-dom";
import FaqBot from "../common/FaqBot";

const Mitra = () => {
  const [mitras, setMitras] = useState([]);
  const fetchMitras = async () => {
    const res = await fetch(apiurl + "get-mitras", {
      method: "GET",
    });
    const result = await res.json();
    setMitras(result.data);
  };

  useEffect(() => {
    fetchMitras();
  }, []);

  return (
    <>
      <Header />

      <main>
        <Hero
          preHeading="Terpercaya, Berpengalaman, Integritas"
          heading="Mitra"
          text="
                Kami bangga bekerja sama dengan berbagai mitra strategis yang
                mendukung pertumbuhan dan keberhasilan perusahaan. Jaringan
                kemitraan kami mencerminkan kepercayaan dan profesionalisme yang
                menjadi dasar layanan kami.
              "
        />

        <section className="section-3 py-5">
          <div className="container">
            <div className="section-header text-center">
              <span>Mitra Kami</span>
              <h2>Didukung oleh Mitra Terpercaya</h2>
            </div>
          </div>
        </section>
        <section id="clients" className="clients section pb-3">
          <div className="container" data-aos="fade-up" data-aos-delay="350">
            <div className="row g-0 clients-wrap bg-light">
              {mitras &&
                mitras.map((mitra) => {
                  return (
                    <div
                      className="col-xl-3 col-md-4 client-logo"
                      key={`mitra-${mitra.id}`}
                    >
                      <img
                        src={`${fileurl}upload/mitras/small/${mitra.image}`}
                        className="img-fluid"
                        alt=""
                      />
                      <h4 className="text-center">{mitra.title}</h4>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
        {/* FAQ */}
        <FaqBot />
      </main>

      <Footer />
    </>
  );
};

export default Mitra;
