import React from "react";
import AboutImg from "../../assets/img/hero2.jpg";
import { useState, useEffect } from "react";
import { apiurl, fileurl } from "./Http";
import { Link } from "react-router-dom";

const LatestServices = () => {
  const [services, setServices] = useState([]);
  const fetchLatestServices = async () => {
    const res = await fetch(apiurl + "get-latest-services?limit=4", {
      method: "GET",
    });
    const result = await res.json();
    setServices(result.data);
  };

  useEffect(() => {
    fetchLatestServices();
  }, []);

  return (
    <>
      <section className="section-3 py-5">
        <div className="container-fluid">
          <div className="section-header text-center">
            <span>Layanan</span>
            <h2>Layanan Kami</h2>
            <p>
              Kami berkomitmen memberikan solusi terbaik bagi klien dalam setiap
              tahap pengurusan tenaga kerja asing, dengan pelayanan yang ramah,
              responsif, dan terpercaya.
            </p>
          </div>
          <div className="row pt-3 justify-content-center">
            {services &&
              services.map((service) => {
                return (
                  <div
                    key={`service-${service.id}`}
                    className="col-md-4 col-lg-4"
                  >
                    <div
                      className="item "
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
                          state={{ from: "home" }}
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
    </>
  );
};

export default LatestServices;
