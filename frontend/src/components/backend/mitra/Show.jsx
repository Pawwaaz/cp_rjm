import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";
import { apiurl, token } from "../../common/Http";
import { toast } from "react-toastify";
import HeaderAdmin from "../../common/HeaderAdmin";

const Show = () => {
  const [mitras, setMitras] = useState([]);

  const fetchMitras = async () => {
    const res = await fetch(apiurl + "mitra", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    setMitras(result.data);
  };

  const deleteMitra = async (id) => {
    if (confirm("Apakah yakin akan menghapus mitra")) {
      const res = await fetch(apiurl + "mitra/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();

      if (result.status == true) {
        const newMitras = mitras.filter((mitra) => mitra.id != id);
        setMitras(newMitras);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  useEffect(() => {
    fetchMitras();
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
              {/*Dashbiard*/}
              <div className="card shadow border-0">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between">
                    <h4 className="h5">Mitra</h4>
                    <Link to="/admin/mitra/tambah" className="btn btn-primary">
                      Tambah
                    </Link>
                  </div>
                  <hr />
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nama Perusahaan</th>
                        {/* <th>Slug</th> */}
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mitras &&
                        mitras.map((mitra) => {
                          return (
                            <tr key={`mitra-${mitra.id}`}>
                              <td>{mitra.id}</td>
                              <td>{mitra.title}</td>
                              {/* <td>{mitra.slug}</td> */}
                              <td>
                                {mitra.status == 1 ? "Aktif" : "Tidak Aktif"}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/mitra/edit/${mitra.id}`}
                                  className="btn btn-primary btn-sm ms-2 d-flex justify-content-center mb-2"
                                >
                                  Edit
                                </Link>
                                <Link
                                  onClick={() => deleteMitra(mitra.id)}
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
