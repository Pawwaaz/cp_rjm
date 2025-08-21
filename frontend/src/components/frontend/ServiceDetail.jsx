import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import { apiurl, fileurl } from "../common/Http";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import FaqBot from "../common/FaqBot";

const ServiceDetail = () => {
  const params = useParams();
  const [service, setService] = useState([]);
  const [services, setServices] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchServices = async () => {
    const res = await fetch(apiurl + "get-services", {
      method: "GET",
    });
    const result = await res.json();
    setServices(result.data);
  };

  const fetchService = async () => {
    const res = await fetch(apiurl + "get-service-detail/" + params.id, {
      method: "GET",
    });
    const result = await res.json();
    setService(result.data);
  };

  useEffect(() => {
    fetchServices();
    fetchService();
  }, [params.id]);

  return (
    <>
      <Header />
      <main>
        <Hero
          preHeading="Terpercaya, Berpengalaman, Integritas"
          heading={`${service.title}`}
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                voluptates saepe illo quod mollitia expedita repellendus ipsum
                vel eveniet voluptate tempora ullam ipsam atque rem ratione
                magnam, enim rerum nihil."
        />
        <div className="section-10">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-3 mb-2">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-4 py-4">
                    <h3 className="mt-2 mb-3">Layanan Kami</h3>
                    <ul>
                      {services &&
                        services.map((service) => {
                          return (
                            <li key={`service-${service.id}`}>
                              <Link to={`/layanan/${service.id}`}>
                                {service.title}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div>
                  <img
                    className="w-100 service-detail-image"
                    src={`${fileurl}upload/services/large/${service.image}`}
                    alt=""
                  />
                </div>
                <h3 className="py-3">{service.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: service.content }}
                ></div>
                <div className="d-flex justify-content-end mb-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (location.state?.from === "home") {
                        navigate("/");
                      } else if (location.state?.from === "service") {
                        navigate("/layanan");
                      } else {
                        navigate(-1); // fallback kalau tidak ada state
                      }
                    }}
                  >
                    Kembali
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FAQ */}
        <FaqBot />
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetail;
