import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import { apiurl } from "../common/Http";
import HeaderAdmin from "../common/HeaderAdmin";

const Dashboard = () => {
  const [articles, setArticles] = useState(0);
  const fetchArticles = async () => {
    const res = await fetch(apiurl + "get-articles-total", {
      method: "GET",
    });
    const result = await res.json();
    setArticles(result.total);
  };

  const [mitras, setMitras] = useState(0);
  const fetchMitras = async () => {
    const res = await fetch(apiurl + "get-mitra-total", {
      method: "GET",
    });
    const result = await res.json();
    setMitras(result.total);
  };

  const [testimoni, setTestimoni] = useState(0);
  const fetchTestimoni = async () => {
    const res = await fetch(apiurl + "get-testimoni-total", {
      method: "GET",
    });
    const result = await res.json();
    setTestimoni(result.total);
  };

  const [layanan, setLayanan] = useState(0);
  const fetchLayanan = async () => {
    const res = await fetch(apiurl + "get-service-total", {
      method: "GET",
    });
    const result = await res.json();
    setLayanan(result.total);
  };

  useEffect(() => {
    fetchArticles();
    fetchMitras();
    fetchLayanan();
    fetchTestimoni();
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
            <div className="col-md-9 dashboard">
              {/*Dashbiard*/}
              <div className="card shadow border-0">
                <div className="pt-3 pb-3 text-center dashboard-bg">
                  <h3 className="text-white">Dashboard Admin</h3>
                </div>
                <div className="row row-cols-2 g-4 px-4 mt-2">
                  <div className="col">
                    <div className="border rounded shadow-sm d-flex flex-column justify-content-center align-items-center p-4">
                      <h5 className="m-0 mb-2">Jumlah Layanan</h5>
                      <h5 className="m-0 total">{layanan}</h5>
                    </div>
                  </div>
                  <div className="col">
                    <div className="border rounded shadow-sm d-flex flex-column justify-content-center align-items-center p-4">
                      <h5 className="m-0 mb-2">Jumlah Mitra</h5>
                      <h5 className="m-0 total">{mitras}</h5>
                    </div>
                  </div>
                  <div className="col mb-2">
                    <div className="border rounded shadow-sm d-flex flex-column justify-content-center align-items-center p-4">
                      <h5 className="m-0 mb-2">Jumlah Testimoni</h5>
                      <h5 className="m-0 total">{testimoni}</h5>
                    </div>
                  </div>
                  <div className="col mb-2">
                    <div
                      className="border rounded shadow-sm d-flex flex-column justify-content-center align-items-center p-4"
                      // style={{ minHeight: "150px" }}
                    >
                      <h5 className="m-0 mb-2">Jumlah Artikel</h5>
                      <h5 className="m-0 total">{articles}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
