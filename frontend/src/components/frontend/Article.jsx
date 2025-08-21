import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import AboutImg from "../../assets/img/hero2.jpg";
import { apiurl, fileurl } from "../common/Http";
import { Link, Links } from "react-router-dom";
import FaqBot from "../common/FaqBot";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    const res = await fetch(apiurl + "get-articles", {
      method: "GET",
    });
    const result = await res.json();
    setArticles(result.data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <>
      <Header />

      <main>
        <Hero
          preHeading="Terpercaya, Berpengalaman, Integritas"
          heading="Artikel"
          text="Temukan berbagai informasi terkini dan terpercaya seputar keimigrasian serta Tenaga Kerja Asing (TKA) di Indonesia."
        />

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
                      className="col-md-4"
                      key={`article-${article.id}`}
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
                            <Link
                              to={`/artikel/${article.id}`}
                              className="title"
                            >
                              {article.title}
                            </Link>
                          </div>
                          <Link
                            to={`/artikel/${article.id}`}
                            className="btn btn-primary small"
                            state={{ from: "article" }}
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
        {/* FAQ */}
        <FaqBot />
      </main>

      <Footer />
    </>
  );
};

export default Article;
