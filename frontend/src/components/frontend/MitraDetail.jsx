import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import { apiurl, fileurl } from "../common/Http";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import FaqBot from "../common/FaqBot";

const MitraDetail = () => {
  const params = useParams();
  const [mitra, setMitra] = useState([]);
  const [mitras, setMitras] = useState([]);

  const fetchMitras = async () => {
    const res = await fetch(apiurl + "get-mitras", {
      method: "GET",
    });
    const result = await res.json();
    setMitras(result.data);
  };

  const fetchMitra = async () => {
    const res = await fetch(apiurl + "get-mitra-detail/" + params.id, {
      method: "GET",
    });
    const result = await res.json();
    setMitra(result.data);
  };

  useEffect(() => {
    fetchMitras();
    fetchMitra();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero
          preHeading="Terpercaya, Berpengalaman, Integritas"
          heading={`${mitra.title}`}
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                voluptates saepe illo quod mollitia expedita repellendus ipsum
                vel eveniet voluptate tempora ullam ipsam atque rem ratione
                magnam, enim rerum nihil."
        />
      </main>

      <div className="section-10">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow border-0 sidebar">
                <div className="card-body px-4 py-4">
                  <h3 className="mt-2 mb-3">About</h3>
                  <ul>
                    {mitra.location && (
                      <li className="mb-2">
                        <span className="text-body-secondary">Lokasi</span>
                        <p>{mitra.location}</p>
                      </li>
                    )}
                    {mitra.sector && (
                      <li className="mb-2">
                        <span className="text-body-secondary">Sektor</span>
                        <p>{mitra.sector}</p>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div>
                <img
                  className="w-100"
                  src={`${fileurl}upload/mitras/large/${mitra.image}`}
                  alt=""
                />
              </div>
              <h3 className="py-3">{mitra.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: mitra.content }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* FAQ */}
      <FaqBot />
      <Footer />
    </>
  );
};

export default MitraDetail;
