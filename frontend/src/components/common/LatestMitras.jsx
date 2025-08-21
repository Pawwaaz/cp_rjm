import React, { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import { apiurl, fileurl } from "./Http";

const LatestMitras = () => {
  const [mitras, setMitras] = useState([]);
  const fetchMitras = async () => {
    const res = await fetch(apiurl + "get-latest-mitras?limit=4", {
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
      <section className="section-8  py-5">
        <div className="container-fluid">
          <div className="section-header text-center">
            <span>Mitra Kami</span>
            <h3>Didukung oleh Mitra Terpercaya</h3>
            <p>
              Kami bangga bekerja sama dengan berbagai mitra strategis yang
              mendukung pertumbuhan dan keberhasilan perusahaan. Jaringan
              kemitraan kami mencerminkan kepercayaan dan profesionalisme yang
              menjadi dasar layanan kami.
            </p>
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
    </>
  );
};

export default LatestMitras;
