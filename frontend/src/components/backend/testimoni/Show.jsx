import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import { apiurl, token } from "../../common/Http";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderAdmin from "../../common/HeaderAdmin";

const Show = () => {
  const [testimonies, setTestimonies] = useState([]);

  const fetchTestimonies = async () => {
    const res = await fetch(apiurl + "testimoni", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    setTestimonies(result.data);
  };

  const deleteTestimonies = async (id) => {
    if (confirm("Apakah yakin akan menghapus Testimoni")) {
      const res = await fetch(apiurl + "testimoni/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();

      if (result.status == true) {
        const newTestimonies = testimonies.filter(
          (testimoni) => testimoni.id != id
        );
        setTestimonies(newTestimonies);
        toast.success(result.messege);
      } else {
        toast.error(result.messege);
      }
    }
  };

  useEffect(() => {
    fetchTestimonies();
  }, []);

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
              {/*Dashboard*/}
              <div className="card shadow border-0">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between">
                    <h4 className="h5">Testimoni</h4>
                    <Link
                      to="/admin/testimoni/tambah"
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
                        <th>Testimoni</th>
                        <th>Nama</th>
                        <th>Perusahaan</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonies &&
                        testimonies.map((testimoni) => {
                          return (
                            <tr key={`service-${testimoni.id}`}>
                              <td>{testimoni.id}</td>
                              <td>{testimoni.testimoni}</td>
                              <td>{testimoni.citation}</td>
                              <td>{testimoni.company}</td>
                              <td>
                                {testimoni.status == 1
                                  ? "Aktif"
                                  : "Tidak Aktif"}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/testimoni/edit/${testimoni.id}`}
                                  className="btn btn-primary btn-sm ms-2 d-flex justify-content-center mb-2"
                                >
                                  Edit
                                </Link>
                                <Link
                                  onClick={() =>
                                    deleteTestimonies(testimoni.id)
                                  }
                                  href=""
                                  className="btn btn-delete btn-sm ms-2 d-flex justify-content-center"
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
