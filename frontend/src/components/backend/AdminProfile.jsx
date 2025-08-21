import { useState } from "react";
import { apiurl, token } from "../common/Http";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import { useForm } from "react-hook-form";
import HeaderAdmin from "../common/HeaderAdmin";

function AdminProfile() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdate = async (data) => {
    try {
      const res = await fetch(apiurl + "profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({
          email: data.email,
          current_password: data.currentPassword,
          password: data.newPassword,
          password_confirmation: data.newPasswordConfirmation,
        }),
      });

      const result = await res.json();

      if (result.status == true) {
        toast.success(result.message);
        navigate("/admin/dashboard");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      setMessage("Terjadi kesalahan jaringan");
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
                    <h4 className="h5">Ganti email dan password</h4>
                    <Link to="/admin/dashboard" className="btn btn-primary">
                      Kembali
                    </Link>
                  </div>
                  <hr />

                  <form action="" onSubmit={handleSubmit(handleUpdate)}>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Email
                      </label>
                      <input
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukan email"
                        {...register("email", {
                          required: "Email harus diisi",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.email && "is-invalid"
                        }`}
                      />
                      {errors.email && (
                        <p className="invalid-feedback">
                          {errors.email?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Password Lama
                      </label>
                      <input
                        type="password"
                        // value={currentPassword}
                        // onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Masukan password lama"
                        {...register("currentPassword", {
                          required: "Password lama harus diisi",
                        })}
                        className={`form-control ${
                          errors.currentPassword && "is-invalid"
                        }`}
                      />
                      {errors.currentPassword && (
                        <p className="invalid-feedback">
                          {errors.currentPassword?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Password Baru
                      </label>
                      <input
                        type="password"
                        // value={newPassword}
                        // onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Masukan password baru"
                        {...register("newPassword", {
                          required: "Password baru harus diisi",
                        })}
                        className={`form-control ${
                          errors.newPassword && "is-invalid"
                        }`}
                      />
                      {errors.newPassword && (
                        <p className="invalid-feedback">
                          {errors.newPassword?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Konfirmasi Password Baru
                      </label>
                      <input
                        type="password"
                        // value={newPasswordConfirmation}
                        // onChange={(e) =>
                        //   setNewPasswordConfirmation(e.target.value)
                        // }
                        placeholder="Konfirmasi password baru"
                        {...register("newPasswordConfirmation", {
                          required: "Konfirmasi password baru harus diisi",
                        })}
                        className={`form-control ${
                          errors.newPasswordConfirmation && "is-invalid"
                        }`}
                      />
                      {errors.newPasswordConfirmation && (
                        <p className="invalid-feedback">
                          {errors.newPasswordConfirmation?.message}
                        </p>
                      )}
                    </div>

                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminProfile;
