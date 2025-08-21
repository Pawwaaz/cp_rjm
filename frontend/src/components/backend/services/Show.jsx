import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import { apiurl, token } from "../../common/Http";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderAdmin from "../../common/HeaderAdmin";

const Show = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const res = await fetch(apiurl + "services", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    setServices(result.data);
  };

  const deleteService = async (id) => {
    if (confirm("Apakah yakin akan menghapus layanan")) {
      const res = await fetch(apiurl + "services/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();

      if (result.status == true) {
        const newServices = services.filter((service) => service.id != id);
        setServices(newServices);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  useEffect(() => {
    fetchServices();
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
                    <h4 className="h5">Layanan</h4>
                    <Link
                      to="/admin/layanan/tambah"
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
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services &&
                        services.map((service) => {
                          return (
                            <tr key={`service-${service.id}`}>
                              <td>{service.id}</td>
                              <td>{service.title}</td>
                              {/* <td>{service.slug}</td> */}
                              <td>
                                {service.status == 1 ? "Aktif" : "Tidak Aktif"}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/layanan/edit/${service.id}`}
                                  className="btn btn-primary btn-sm ms-2 d-flex justify-content-center mb-2"
                                >
                                  Edit
                                </Link>
                                <Link
                                  onClick={() => deleteService(service.id)}
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
