import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Hero from "../common/Hero";
import AboutImg from "../../assets/img/hero2.jpg";
import Maps from "../common/Maps";
import { useForm } from "react-hook-form";
import { apiurl } from "../common/Http";
import { toast } from "react-toastify";
import FaqBot from "../common/FaqBot";

const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch(apiurl + "contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.status == true) {
      toast.success(result.message);
      reset();
    } else {
      toast.error(result.message);
    }
  };
  return (
    <>
      <Header />
      <main>
        <Hero
          preHeading="Terpercaya, Berpengalaman, Integritas"
          heading="Kontak"
          text="Kami senang mendengar dari Anda! Jangan ragu untuk menghubungi kami terkait pertanyaan, kerja sama, atau informasi lainnya."
        />
        <section className="section-9">
          <div className="container py-5">
            <div className="section-header text-center">
              <span></span>
              <h3>Kontak</h3>
              <p>Kita memberikan yang terbaik mengenai TKA</p>
            </div>

            <div className="row">
              <div className="col-md-9 mb-3">
                <div className="card shadow border-0">
                  <div className="card-body p-5">
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Nama
                          </label>
                          <input
                            {...register("name", {
                              required: "Nama harus diisi",
                            })}
                            type="text"
                            className={`form-control form-control-lg ${
                              errors.name && "is-invalid"
                            }`}
                            placeholder="Tolong Masukan Nama"
                            style={{ fontSize: "16px" }}
                          />
                          {errors.name && (
                            <p className="invalid-feedback">
                              {errors.name?.message}
                            </p>
                          )}
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            E-mail
                          </label>
                          <input
                            {...register("email", {
                              required: "Email harus di isi",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email tidak sesuai",
                              },
                            })}
                            type="text"
                            className={`form-control form-control-lg ${
                              errors.email && "is-invalid"
                            }`}
                            placeholder="Tolong Masukan E-mail"
                            style={{ fontSize: "16px" }}
                          />
                          {errors.email && (
                            <p className="invalid-feedback">
                              {errors.email?.message}
                            </p>
                          )}
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Nomor Telepon
                          </label>
                          <input
                            {...register("phone", {
                              required: "Nomor telepon harus diisi",
                            })}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Tolong Masukan Nomor Telepon"
                            style={{ fontSize: "16px" }}
                          />
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Subjek
                          </label>
                          <select
                            {...register("subject", {
                              required: "Subjek harus dipilih",
                            })}
                            className="form-control form-control-lg"
                            style={{ fontSize: "16px" }}
                          >
                            <option value="#">--Silahkan Pilih--</option>
                            <option value="Pengurusan Dokumen Legal PMA/PMDN">
                              Pengurusan Dokumen Legal PMA/PMDN
                            </option>
                            <option value="Pengurusan Izin Kerja & Izin Tinggal TKA">
                              Pengurusan Izin Kerja & Izin Tinggal TKA
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="" className="form-label">
                          Pesan
                        </label>

                        <textarea
                          {...register("message", {
                            required: "Pesan harus diisi",
                          })}
                          rows={7}
                          placeholder="Silahkan isi pesan.."
                          className={`form-control form-control-lg ${
                            errors.message && "is-invalid"
                          }`}
                          style={{ fontSize: "16px" }}
                        />
                        {errors.message && (
                          <p className="invalid-feedback">
                            {errors.message?.message}
                          </p>
                        )}
                      </div>

                      <button className="btn btn-primary mt-3">Kirim</button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow border-0">
                  <div className="card-body p-3">
                    <h4>Nomor Telfon</h4>
                    <div>
                      <p>08129906360</p>
                    </div>

                    <h4 className="mt-4">Email</h4>
                    <div>
                      <p>rafi_jana@yahoo.com</p>
                    </div>

                    <h4 className="mt-4 ">Alamat</h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        borderRadius: "15px",
                      }}
                    >
                      <Maps style={{ maxWidth: "100%", maxHeight: "100%" }} />
                    </div>
                    <div>
                      <p className="pt-2">
                        JL. Raya Bogor KM.40 <br />
                        Bogor, Jawa Barat
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* FAQ */}
          <FaqBot />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
