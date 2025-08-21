import React, { useState, useRef, useMemo } from "react";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { apiurl, token } from "../../common/Http";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderAdmin from "../../common/HeaderAdmin";

const Create = ({ placeholder }) => {
  //   const editor = useRef(null);
  //   const [content, setContent] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  //   const config = useMemo(
  //     () => ({
  //       readonly: false,
  //       placeholder: placeholder || "Masukan isi content",
  //     }),
  //     [placeholder]
  //   );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const newData = { ...data };
    const res = await fetch(apiurl + "testimoni", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(newData),
    });
    const result = await res.json();

    if (result.status == true) {
      toast.success(result.messege);
      navigate("/admin/testimoni");
    } else {
      toast.error(result.messege);
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
              {/*Dashbiard*/}
              <div className="card shadow border-0">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between">
                    <h4 className="h5">Tambah Testimoni</h4>
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
                        placeholder="Masukan Nama"
                        type="text"
                        {...register("citation", {
                          required: "Sitasi harus nama",
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
                        className={`form-control `}
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
                      Submit
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

export default Create;
