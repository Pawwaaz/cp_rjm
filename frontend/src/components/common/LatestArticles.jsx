import React from "react";
import { useState, useEffect } from "react";
import { apiurl, fileurl } from "./Http";
import { Link } from "react-router-dom";

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);
  const fetchLatestArticles = async () => {
    const res = await fetch(apiurl + "get-latest-articles?limit=3", {
      method: "GET",
    });
    const result = await res.json();
    setArticles(result.data);
  };

  useEffect(() => {
    fetchLatestArticles();
  }, []);
  return (
    <>
      <section className="section-6">
        <div className="container py-5">
          <div className="section-header text-center">
            <span>Artikel</span>
            <h3>Berita tentang keimigrasian dan TKA</h3>
            <p>Kita memberikan yang terbaik mengenai TKA</p>
          </div>
          <div className="row pt-3">
            {articles &&
              articles.map((article) => {
                return (
                  <div
                    key={`article-${article.id}`}
                    className="col-md-4"
                    data-aos="flip-right"
                    data-aos-delay="100"
                  >
                    <div className="card shadow border-0">
                      <div className="card-img-top">
                        <img
                          src={`${fileurl}upload/articles/small/${article.image}`}
                          alt=""
                          className="w-100"
                        />
                      </div>
                      <div className="card-body p-5">
                        <div className="mb-3">
                          <Link to={`/artikel/${article.id}`} className="title">
                            {article.title}
                          </Link>
                        </div>
                        <Link
                          to={`/artikel/${article.id}`}
                          state={{ from: "home" }}
                          className="btn btn-primary small"
                        >
                          Baca Selengkapnya
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

export default LatestArticles;
