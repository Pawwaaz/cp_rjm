import React from "react";

const Maps = () => {
  return (
    <>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.5700156280355!2d106.85239002637182!3d-6.450473709591996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ea6f927255b3%3A0xe6cd862df1b2819f!2sJl.%20Raya%20Bogor%20No.30B%2C%20RT.4%2FRW.4%2C%20Pabuaran%2C%20Kec.%20Cibinong%2C%20Kabupaten%20Bogor%2C%20Jawa%20Barat%2016916!5e0!3m2!1sen!2sid!4v1740901048750!5m2!1sen!2sid"
        width="300"
        height="200"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
};

export default Maps;
