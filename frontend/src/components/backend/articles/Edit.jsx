import React, { useState, useRef, useMemo } from "react";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { apiurl, fileurl, token } from "../../common/Http";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import HeaderAdmin from "../../common/HeaderAdmin";

const Edit = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [service, setService] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const params = useParams();
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(apiurl + "article/" + params.id, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      setContent(result.data.content);
      setService(result.data);
      // console.log(result);
      return {
        title: result.data.title,
        slug: result.data.slug,
        short_desc: result.data.short_desc,
        status: result.data.status,
      };
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const newData = { ...data, content: content, imageId: imageId };
    const res = await fetch(apiurl + "article/" + params.id, {
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
      navigate("/admin/artikel");
    } else {
      toast.error(result.message);
    }
    console.log(result);
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    setIsDisable(true);

    await fetch(apiurl + "temp-images", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setIsDisable(false);
        if (result.status == false) {
          toast.error(result.errors.image[0]);
        } else {
          setImageId(result.data.id);
        }
      });
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
                    <h4 className="h5">Edit Artikel</h4>
                    <Link to="/admin/artikel" className="btn btn-primary">
                      Kembali
                    </Link>
                  </div>
                  <hr />

                  <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Judul
                      </label>
                      <input
                        placeholder="Masukan judul"
                        {...register("title", {
                          required: "Judul harus diisi",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.title && "is-invalid"
                        }`}
                      />
                      {errors.title && (
                        <p className="invalid-feedback">
                          {errors.title?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Slug
                      </label>
                      <input
                        placeholder="Masukan slug"
                        type="text"
                        {...register("slug", {
                          required: "Slug harus diisi",
                        })}
                        className={`form-control ${
                          errors.slug && "is-invalid"
                        }`}
                      />
                      {errors.slug && (
                        <p className="invalid-feedback">
                          {errors.slug?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Pembua
                      </label>
                      <input
                        placeholder="Masukan author"
                        type="text"
                        {...register("author")}
                        className={`form-control`}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Konten
                      </label>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1}
                        onBlur={(newContent) => setContent(newContent)}
                        onChange={(newContent) => {}}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Foto
                      </label>
                      <br />
                      <input onChange={handleFile} type="file" />
                    </div>
                    <div className="mb-2">
                      {service.image && (
                        <img
                          src={
                            fileurl + "upload/articles/small/" + service.image
                          }
                          alt=""
                        />
                      )}
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
