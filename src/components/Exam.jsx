import React, { useState, useEffect } from "react";
import { RiLock2Line } from "react-icons/ri";

export default function Exam() {
  const [link, setLink] = useState("");
  const [showIframe, setShowIframe] = useState(false);
  const [hiddenTabCount, setHiddenTabCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [fullscreenEnabled, setFullscreenEnabled] = useState(false); // Menyimpan status layar penuh

  useEffect(() => {
    const handlePopup = (event) => {
      if (event.target instanceof Window && event.target !== window) {
        event.preventDefault();
        window.open(event.target.location.href, "_self");
      }
    };

    window.addEventListener("click", handlePopup);

    return () => {
      window.removeEventListener("click", handlePopup);
    };
  }, []);

  // Mengubah useEffect untuk memonitor klik tab tersembunyi
  useEffect(() => {
    const handleHiddenTabClick = () => {
      setHiddenTabCount((prevCount) => prevCount + 1);
    };

    window.addEventListener("visibilitychange", handleHiddenTabClick);

    return () => {
      window.removeEventListener("visibilitychange", handleHiddenTabClick);
    };
  }, []);

  // Mengubah useEffect untuk menangani blokir tab
  useEffect(() => {
    if (hiddenTabCount >= 3 && !fullscreenEnabled) {
      handleBlockTab();
    }
  }, [hiddenTabCount, fullscreenEnabled]);

  // Fungsi untuk menangani blokir tab
  const handleBlockTab = () => {
    document.body.style.pointerEvents = "none";
    document.body.style.opacity = "0.5";
    setShowBackdrop(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreenEnabled(
        document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.link.value;
    setLink(value);
    setShowIframe(true);

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const handleLogout = () => {
    if (!fullscreenEnabled) {
      handleBlockTab();
    } else {
      setShowModal(true);
      setShowBackdrop(true);
    }
  };

  const handleConfirmLogout = () => {
    window.location.href = "/";
    setShowModal(false);
    setShowBackdrop(false);
    if (!fullscreenEnabled) {
      document.body.style.pointerEvents = "";
      document.body.style.opacity = "";
    }
  };

  const handleBackdropClick = () => {
    setShowModal(false);
    setShowBackdrop(false);
    if (!fullscreenEnabled) {
      document.body.style.pointerEvents = "";
      document.body.style.opacity = "";
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-4 col-12">
          <form onSubmit={handleSubmit} className="container">
            <div className="input-group mb-3">
              <input
                type="text"
                name="link"
                className="form-control"
                placeholder="Masukkan URL"
                style={{ borderRadius: "10px 0 0 10px", border: '3px solid #00bfa6' }}
              />
              <button type="submit" className="btn fw-semibold" style={{ background: '#00bfa6', color: '#fff' }}>
                <RiLock2Line size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {showIframe && (
        <>
          <button
            className="btn btn-danger"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1000,
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
          <iframe
            src={link}
            title="Fullscreen Link"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              zIndex: 999,
            }}
          />
        </>
      )}
      {showBackdrop && !showModal && (
        <div
          className="backdrop bg-white"
          onClick={handleBackdropClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
            background: "#fff",
          }}
        >
          {!fullscreenEnabled && (
            <div className="blocked-text d-flex flex-column justify-content-center align-items-center">
              <h1
                className="text-center"
                style={{
                  position: "absolute",
                  zIndex: "99999",
                  color: "red",
                  background: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  border: "2px solid red",
                  fontSize: "2.5rem",
                  marginTop: "60vh",
                  translate: "transform(-50%, -50%)",
                  fontWeight: "bold",
                  margin: "20px",
                }}
              >
                ANDA DIBLOKIR!
              </h1>
              <p
                style={{
                  position: "absolute",
                  zIndex: "99999",
                  color: "red",
                  background: "white",
                  fontSize: "2rem",
                  marginTop: "750px",
                  translate: "transform(-50%, -50%)",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                akan diarahkan ke halaman utama
                <p>dalam 5 detik</p>
              </p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "#03030363" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Konfirmasi Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Yakin data yang diisi sudah benar? Anda akan dikeluarkan.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setShowBackdrop(false);
                  }}
                >
                  Batal
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
