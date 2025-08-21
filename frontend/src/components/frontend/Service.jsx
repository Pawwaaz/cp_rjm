import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import { apiurl, fileurl } from "../common/Http";
import { Link } from "react-router-dom";
import FaqBot from "../common/FaqBot";

const Service = () => {
  const [services, setServices] = useState([]);
  const fetchAllServices = async () => {
    const res = await fetch(apiurl + "get-services", {
      method: "GET",
    });
    const result = await res.json();
    setServices(result.data);
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <Hero
          preHeading="Terpercaya, Berpengalaman, Integritas"
          heading="Layanan"
          text="Kami berkomitmen memberikan solusi terbaik bagi klien dalam
                setiap tahap pengurusan tenaga kerja asing, dengan pelayanan
                yang ramah, responsif, dan terpercaya."
        />

        <section className="section-3 py-5">
          <div className="container">
            <div className="section-header text-center">
              <span>Layanan</span>
              <h2>Layanan Kami</h2>
              <p>
                Kami menyediakan layanan pengurusan Dokumen Izin Kerja dan Izin
                Tinggal bagi Tenaga Kerja Asing (TKA) secara profesional dan
                terpercaya.
              </p>
            </div>
            <div className="row pt-3">
              {services &&
                services.map((service) => {
                  return (
                    <div
                      className="col-md-4 col-lg-4"
                      key={`service-${service.id}`}
                    >
                      <div
                        className="item"
                        data-aos="flip-left"
                        data-aos-delay="100"
                      >
                        <div className="service-image">
                          <img
                            src={`${fileurl}upload/services/small/${service.image}`}
                            alt=""
                            className="w-100"
                          />
                        </div>
                        <div className="service-body">
                          <div className="service-title">
                            <h3>{service.title}</h3>
                          </div>
                          <div className="service-content">
                            <p>{service.short_desc}</p>
                          </div>
                          <Link
                            to={`/layanan/${service.id}`}
                            state={{ from: "service" }}
                            className="btn btn-primary small"
                          >
                            Selengkapnya
                          </Link>
                        </div>
                      </div>
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

export default Service;
