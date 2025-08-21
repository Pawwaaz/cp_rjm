import React from "react";
import Header from "../common/Header";
import Hero from "../common/Hero";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { apiurl, fileurl } from "../common/Http";
import { useEffect } from "react";
import FaqBot from "../common/FaqBot";
import Footer from "../common/Footer";

const ArticleDetail = () => {
  const params = useParams();
  const [article, setArticle] = useState([]);
  const [articles, setLatestArticles] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchLatestArticle = async () => {
    const res = await fetch(`${apiurl}get-latest-articles`, {
      method: "GET",
    });
    const result = await res.json();
    setLatestArticles(result.data);
  };
  const fetchArticle = async () => {
    const res = await fetch(`${apiurl}get-articles-detail/${params.id}`, {
      method: "GET",
    });
    const result = await res.json();
    setArticle(result.data);
  };

  useEffect(() => {
    fetchArticle();
    fetchLatestArticle();
  }, [params.id]);
  return (
    <>
      <Header />
      <main>
        <Hero
          preHeading="Terpercaya, Berpengalaman, Integritas"
          heading="Artikel"
          text=""
        />
        <div className="section-11 py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <h2>{article.title}</h2>
                <div className="pb-2">
                  dari {article.author} pada {article.created_at}
                </div>
                <div className="pe-md-5 pb-2">
                  <img
                    className="w-100"
                    src={`${fileurl}upload/articles/large/${article.image}`}
                    alt=""
                  />
                </div>
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: article.content }}
                ></div>
                <div className="d-flex justify-content-start mb-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (location.state?.from === "home") {
                        navigate("/");
                      } else if (location.state?.from === "artikel") {
                        navigate("/artikel");
                      } else {
                        navigate(-1); // fallback kalau tidak ada state
                      }
                    }}
                  >
                    Kembali
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body p-3">
                    <h3 className="mt-1 mb-2">Artikel sebelumnya</h3>
                    {articles &&
                      articles.map((article) => {
                        return (
                          <div
                            className="d-flex border-bottom mb-2"
                            key={`article-${article.id}`}
                          >
                            <div className="pe-2 pb-1">
                              <Link to={`/artikel/${article.id}`}>
                                <img
                                  width={100}
                                  src={`${fileurl}uploads/articles/small/${article.image}`}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <Link
                              to={`/artikel/${article.id}`}
                              className="title"
                            >
                              {article.title}
                            </Link>
                            <hr />
                          </div>
                        );
                      })}
                  </div>
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

export default ArticleDetail;
