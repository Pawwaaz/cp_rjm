import React from "react";
import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../../assets/img/logo.png";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HeaderAdmin = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation();

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // Scroll down
        setShowNavbar(false);
      } else {
        // Scroll up
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`sticky-top bg-white shadow-sm transition-navbar ${
          showNavbar ? "nav-show" : "nav-hide"
        }`}
      >
        <div className="container py-3">
          <Navbar expand="lg" className="" sticky="top">
            <Navbar.Brand href="/" className="brand">
              <img
                alt=""
                src={Logo}
                width="25"
                height="25"
                className="d-inline-block align-top"
              />{" "}
              Raffi Jasa Mandiri
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto text-start">
                <Nav.Link
                  href="/"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  active={false}
                >
                  Beranda
                </Nav.Link>
                <Nav.Link
                  href="/tentangkami"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  active={false}
                >
                  Tentang Kami
                </Nav.Link>
                <Nav.Link
                  href="/layanan"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  active={false}
                >
                  Layanan
                </Nav.Link>
                <Nav.Link
                  href="/mitra"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  active={false}
                >
                  Mitra
                </Nav.Link>
                <Nav.Link
                  href="/artikel"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  active={false}
                >
                  Artikel
                </Nav.Link>
                <Nav.Link
                  href="/kontak"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  active={false}
                >
                  Kontak
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
    </>
  );
};

export default HeaderAdmin;
