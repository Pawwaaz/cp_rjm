import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { apiurl, token } from "../../common/Http";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderAdmin from "../../common/HeaderAdmin";

const Edit = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(apiurl + "testimoni/" + params.id, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      setTestimonies(result.data);
      // console.log(result);
      return {
        testimoni: result.data.testimoni,
        citation: result.data.citation,
        company: result.data.company,
        status: result.data.status,
      };
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const newData = { ...data };
    const res = await fetch(apiurl + "testimoni/" + params.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(newData),
    });
    const result = await res.json();

    if (result.status == true) {
      toast.success(result.message);
      navigate("/admin/testimoni");
    } else {
      toast.error(result.message);
    }
    console.log(result);
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
              {/*Dashboard*/}
              <div className="card shadow border-0">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between">
                    <h4 className="h5">Edit Testimoni</h4>
                    <Link to="/admin/testimoni" className="btn btn-primary">
                      Kembali
                    </Link>
                  </div>
                  <hr />

                  <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Testimoni
                      </label>
                      <input
                        placeholder="Masukan testimoni"
                        {...register("testimoni", {
                          required: "Testimoni harus diisi",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.testimoni && "is-invalid"
                        }`}
                      />
                      {errors.testimoni && (
                        <p className="invalid-feedback">
                          {errors.testimoni?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Nama
                      </label>
                      <input
                        placeholder="Masukan nama"
                        type="text"
                        {...register("citation", {
                          required: "Nama harus diisi",
                        })}
                        className={`form-control ${
                          errors.citation && "is-invalid"
                        }`}
                      />
                      {errors.citation && (
                        <p className="invalid-feedback">
                          {errors.citation?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Perusahaan
                      </label>
                      <input
                        placeholder="Masukan perusahaan"
                        type="text"
                        {...register("company")}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Status
                      </label>
                      <select
                        name=""
                        id=""
                        {...register("status")}
                        className="form-control"
                      >
                        <option value="1">Aktif</option>
                        <option value="0">Tidak Aktif</option>
                      </select>
                    </div>

                    <button disabled={isDisable} className="btn btn-primary">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Edit;
