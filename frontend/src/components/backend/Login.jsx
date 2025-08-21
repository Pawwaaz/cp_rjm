import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/Auth";
import { useEffect } from "react";
import { apiurl } from "../common/Http";
import HeaderAdmin from "../common/HeaderAdmin";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await fetch(apiurl + "authenticate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.status == false) {
      toast.error(result.messege);
    } else {
      const userInfo = {
        id: result.id,
        token: result.token,
      };

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      login(userInfo);
      navigate("/admin/dashboard");
    }

    // console.log(result);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/admin/dashboard");
    }
  });

  return (
    <>
      <HeaderAdmin />
      <main>
        <div className="container my-5 d-flex justify-content-center">
          <div className="login-form my-5">
            <div className="card border-0 shadow">
              <div className="card-body p-4">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <h4 className="mb-3">Silahkan Login</h4>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Email harus di isi",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email tidak sesuai",
                        },
                      })}
                      type="text"
                      placeholder="Masukan Email"
                      className={`form-control ${errors.email && "is-invalid"}`}
                    />
                    {errors.email && (
                      <p className="invalid-feedback">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Password
                    </label>
                    <input
                      {...register("password", {
                        required: "Password harus di isi",
                      })}
                      type="password"
                      placeholder="Masukan Password"
                      className={`form-control ${
                        errors.password && "is-invalid"
                      }`}
                    />
                    {errors.password && (
                      <p className="invalid-feedback">
                        {errors.password?.message}
                      </p>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
