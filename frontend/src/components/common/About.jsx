import React from "react";
import AboutImg from "../../assets/img/hero2.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <section id="about" className="about section">
        <div className="container my-4">
          <div className="row position-relative">
            <div
              className="col-lg-7 about-img"
              data-aos="zoom-out"
              data-aos-delay="150"
            >
              <img src={AboutImg} alt="" className="w-100" />
            </div>

            <div className="col-lg-7" data-aos="fade-up" data-aos-delay="100">
              <h2 className="inner-title">
                Kenali Lebih Dekat <span className="line mt-2"></span>
              </h2>

              <div className="our-story">
                <h4>Sejak 2021</h4>
                <h3>
                  Perusahaan Terpercaya dalam Pengurusan Tenaga Kerja Asing
                </h3>
                <p>
                  PT Raffi Jasa Mandiri adalah perusahaan yang bergerak di
                  bidang jasa pengurusan tenaga kerja asing. Kami berkomitmen
                  untuk memberikan layanan profesional, cepat, dan terpercaya,
                  dengan sepenuh hati mendukung kebutuhan setiap klien.
                </p>

                <div className="watch-video d-flex align-items-center position-relative ">
                  <Link to={`/kontak`} className="glightbox">
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
