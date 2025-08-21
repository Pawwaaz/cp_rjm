import React from "react";
import { useContext } from "react";
import { AuthContext } from "../backend/context/Auth";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="card shadow border-0 mb-2">
      <div className="card-body p-3 sidebar">
        <h4>Sidebar</h4>
        <ul>
          <li>
            <a href="/admin/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/admin/layanan">Layanan</a>
          </li>
          <li>
            <a href="/admin/mitra">Mitra</a>
          </li>
          <li>
            <a href="/admin/artikel">Artikel</a>
          </li>
          <li>
            <a href="/admin/testimoni">Testimoni</a>
          </li>
          <li>
            <a href="/admin/profile/update">Ubah Email & Password</a>
          </li>
          <button onClick={logout} className="btn btn-primary mt-3">
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
