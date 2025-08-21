import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
import About from "../common/About";
import LatestServices from "../common/LatestServices";
import LatestMitras from "../common/LatestMitras";
import LatestArticles from "../common/LatestArticles";
import ShowTestimoni from "../common/ShowTestimoni";
import FaqBot from "../common/FaqBot";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <section className="section-1">
          <div className="hero d-flex align-items-center">
            <div className="container-fluid">
              <div className="text-center content">
                <span>PT Raffi Jasa Mandiri</span>
                <h1>Melayani dengan sepenuh hati</h1>
                <p>
                  PT Raffi Jasa Mandiri adalah perusahaan yang bergerak di
                  bidang jasa pengurusan tenaga kerja asing. Kami berkomitmen
                  untuk memberikan layanan profesional, cepat, dan terpercaya,
                  dengan sepenuh hati mendukung kebutuhan setiap klien, serta
                  terus mengembangkan usaha di bidang jasa untuk menyerap tenaga
                  kerja yang lebih banyak.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tentang Kami*/}
        <About />
        {/* Layanan */}
        <LatestServices />

        {/* Kenapa Memilih Kami */}
        <section className="section-4 pt-4">
          <div className="container">
            <div
              className="section-header text-center "
              data-aos="zoom-out"
              data-aos-delay="350"
            >
              <span>Kenapa pilih kami?</span>
              <h2>Kenapa?</h2>
              <p>
                Kami berkomitmen memberikan layanan terbaik dengan proses yang
                cepat, transparan, dan terpercaya. Dengan pengalaman dalam
                pengurusan tenaga kerja asing, kami selalu melayani klien dengan
                sepenuh hati, memastikan setiap kebutuhan dipenuhi secara
                profesional.
              </p>
            </div>

            <div className="row pt-4 text-center">
              <div
                className="col-md-4 "
                data-aos="fade-up"
                data-aos-delay="350"
              >
                <div className="card-shadow border-0 p-4">
                  <div className="card-icon text-center">
                    <i className="bi bi-chat-left-quote-fill"></i>
                  </div>
                  <div className="card-title mt-4 mb-3 ">
                    <h3>Konsultasi Profesional</h3>
                  </div>
                  <p>
                    Memberikan konsultasi lengkap dan solusi terbaik bagi klien
                    dalam pengurusan tenaga kerja asing, dengan pelayanan yang
                    ramah dan responsif.
                  </p>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-up" data-aos-delay="350">
                <div className="card-shadow border-0 p-4">
                  <div className="card-icon text-center ">
                    <i className="bi bi-stopwatch-fill"></i>
                  </div>
                  <div className="card-title mt-4 mb-3">
                    <h3>Proses Cepat & Transparan</h3>
                  </div>
                  <p>
                    Menjamin proses perizinan dan pengurusan dokumen berjalan
                    cepat, jelas, dan transparan tanpa biaya tersembunyi.
                  </p>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-up" data-aos-delay="350">
                <div className="card-shadow border-0 p-4">
                  <div className="card-icon text-center">
                    <i className="bi bi-headset"></i>
                  </div>
                  <div className="card-title mt-4 mb-3">
                    <h3>Dukungan Lanjutan</h3>
                  </div>
                  <p>
                    Memberikan dukungan penuh setelah tenaga kerja asing
                    ditempatkan, termasuk bantuan legalitas dan adaptasi
                    lingkungan kerja.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mitra */}

        <LatestMitras />
        {/* Testimoni */}
        <ShowTestimoni />

        {/* Artikel */}
        <LatestArticles />

        {/* FAQ */}
        <FaqBot />
      </main>
      <Footer />
    </>
  );
};

export default Home;
