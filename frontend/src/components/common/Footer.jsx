import React from "react";
import Maps from "./Maps";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container py-5">
          <div className="row gx-5 gy-3">
            <div className="col-lg-3 col-md-6 col-12">
              <h5>PT Raffi Jasa Mandiri</h5>
              <p>
                PT Raffi Jasa Mandiri adalah perusahaan yang bergerak di bidang
                jasa pengurusan tenaga kerja asing. Kami berkomitmen untuk
                memberikan layanan profesional, cepat, dan terpercaya, dengan
                sepenuh hati mendukung kebutuhan setiap klien, serta terus
                mengembangkan usaha di bidang jasa untuk menyerap tenaga kerja
                yang lebih banyak.
              </p>
            </div>
            <div className="col-lg-2 col-md-6 col-12 align-items-center">
              <h5>Menu</h5>
              <ul>
                <li>
                  <a href="/">Beranda</a>
                </li>
                <li>
                  <a href="/aboutus">Tentang Kami</a>
                </li>
                <li>
                  <a href="/service">Layanan</a>
                </li>
                <li>
                  <a href="/mitra">Mitra</a>
                </li>
                <li>
                  <a href="/article">Artikel</a>
                </li>
                <li>
                  <a href="/contact">Kontak</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <h5>Hubungi Kami</h5>
              <ul>
                <li>
                  Jl.Raya Bogor KM.40 <br /> Cibinong, Bogor, Jawa Barat
                </li>
                <li>rafi_jana@yahoo.com</li>
                <li>08129906360</li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <h5>Lokasi</h5>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.5700156280355!2d106.85239002637182!3d-6.450473709591996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ea6f927255b3%3A0xe6cd862df1b2819f!2sJl.%20Raya%20Bogor%20No.30B%2C%20RT.4%2FRW.4%2C%20Pabuaran%2C%20Kec.%20Cibinong%2C%20Kabupaten%20Bogor%2C%20Jawa%20Barat%2016916!5e0!3m2!1sen!2sid!4v1740901048750!5m2!1sen!2sid"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <hr />
          <p className="cr">Copyright PT Raffi Jasa Mandiri &copy; 2025</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
