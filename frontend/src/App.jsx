import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/frontend/Home";
import AboutUs from "./components/frontend/AboutUs";
import Service from "./components/frontend/Service";
import Mitra from "./components/frontend/Mitra";
import Article from "./components/frontend/Article";
import "./assets/css/style.css";
// import "./assets/css/navbar-05.css";
import Contact from "./components/frontend/Contact";
import Login from "./components/backend/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/backend/Dashboard";
import RequireAuth from "./components/common/RequireAuth";
import { default as ShowServices } from "./components/backend/services/Show";
import { default as CreateServices } from "./components/backend/services/Create";
import { default as EditServices } from "./components/backend/services/Edit";
import { default as ShowMitra } from "./components/backend/mitra/Show";
import { default as CreateMitra } from "./components/backend/mitra/Create";
import { default as EditMitra } from "./components/backend/mitra/Edit";
import { default as ShowArticle } from "./components/backend/articles/Show";
import { default as CreateArticle } from "./components/backend/articles/Create";
import { default as EditArticle } from "./components/backend/articles/Edit";
import { default as ShowTestimoni } from "./components/backend/testimoni/Show";
import { default as CreateTestimoni } from "./components/backend/testimoni/Create";
import { default as EditTestimoni } from "./components/backend/testimoni/Edit";

import ServiceDetail from "./components/frontend/ServiceDetail";
import MitraDetail from "./components/frontend/MitraDetail";
import ArticleDetail from "./components/frontend/ArticleDetail";
import { useEffect } from "react";
import ChatBot from "./components/common/ChatBot";
import AdminProfile from "./components/backend/AdminProfile";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 900, // durasi animasi
      once: true, // hanya animasi sekali per elemen
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tentangkami" element={<AboutUs />} />
          <Route path="/layanan" element={<Service />} />
          <Route path="/mitra" element={<Mitra />} />
          <Route path="/artikel" element={<Article />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="/layanan/:id" element={<ServiceDetail />} />
          <Route path="/mitra/:id" element={<MitraDetail />} />
          <Route path="/artikel/:id" element={<ArticleDetail />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/chatbot" element={<ChatBot />} />

          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/profile/update"
            element={
              <RequireAuth>
                <AdminProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/layanan"
            element={
              <RequireAuth>
                <ShowServices />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/layanan/tambah"
            element={
              <RequireAuth>
                <CreateServices />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/layanan/edit/:id"
            element={
              <RequireAuth>
                <EditServices />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/mitra"
            element={
              <RequireAuth>
                <ShowMitra />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/mitra/tambah"
            element={
              <RequireAuth>
                <CreateMitra />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/mitra/edit/:id"
            element={
              <RequireAuth>
                <EditMitra />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/artikel"
            element={
              <RequireAuth>
                <ShowArticle />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/artikel/tambah"
            element={
              <RequireAuth>
                <CreateArticle />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/artikel/edit/:id"
            element={
              <RequireAuth>
                <EditArticle />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/testimoni"
            element={
              <RequireAuth>
                <ShowTestimoni />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/testimoni/tambah"
            element={
              <RequireAuth>
                <CreateTestimoni />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/testimoni/edit/:id"
            element={
              <RequireAuth>
                <EditTestimoni />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
