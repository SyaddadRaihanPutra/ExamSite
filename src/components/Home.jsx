import React from "react";
import Secure from "../assets/secure.svg";

export default function Home() {
  return (
    <div>
      <div className="container col-xxl-8 px-4 py-5" style={{ minHeight: "60vh" }}>
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={Secure}
              className="d-block mx-lg-auto img-fluid"
              alt="Hero Image"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-6 fw-bold lh-1 mb-3 lh-sm">
              Tingkatkan keamanan dalam {" "}
              <span style={{ color: '#00bfa6' }}><i>Ujian Online</i></span>
            </h1>
            <p className="lead">
              Dengan menggunakan aplikasi ini, Anda dapat memasukkan link ujian dan ujian anda akan terlindungi dari kecurangan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
