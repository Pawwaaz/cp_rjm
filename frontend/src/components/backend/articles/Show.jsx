import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";
import { apiurl, token } from "../../common/Http";
import { toast } from "react-toastify";
import HeaderAdmin from "../../common/HeaderAdmin";

const Show = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const res = await fetch(apiurl + "article", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    setArticles(result.data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const deleteArticle = async (id) => {
    if (confirm("Apakah yakin akan menghapus artikel")) {
      const res = await fetch(apiurl + "article/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();

      if (result.status == true) {
        const newArticles = articles.filter((article) => article.id != id);
        setServices(newArticles);
        toast.success(result.messege);
      } else {
        toast.error(result.messege);
      }
    }
  };

  return (
    <>
      <HeaderAdmin />
      <main>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-3">
              {/*Sidebar*/}
              <Sidebar />
            </div>
            <div className="col-md-9">
              {/*Dashbiard*/}
              <div className="card shadow border-0">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between">
                    <h4 className="h5">Artikel</h4>
                    <Link
                      to="/admin/artikel/tambah"
                      className="btn btn-primary"
                    >
                      Tambah
                    </Link>
                  </div>
                  <hr />
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Judul</th>
                        {/* <th>Slug</th> */}
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles &&
                        articles.map((article) => {
                          return (
                            <tr key={`article-${article.id}`}>
                              <td>{article.id}</td>
                              <td>{article.title}</td>
                              {/* <td>{article.slug}</td> */}
                              <td>
                                {article.status == 1 ? "Aktif" : "Tidak Aktif"}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/artikel/edit/${article.id}`}
                                  className="btn btn-primary btn-sm ms-2 d-flex justify-content-center mb-2"
                                >
                                  Edit
                                </Link>
                                <Link
                                  onClick={() => deleteArticle(article.id)}
                                  href=""
                                  className="btn btn-delete btn-sm ms-2 d-flex justify-content-center "
                                >
                                  Hapus
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Show;
