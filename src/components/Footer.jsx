import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-dark text-center text-white" style={{ marginTop: '200px' }}>
        <div className="container p-4">
          &copy; 2024 - ExamSite{" "}by {" "}
          <a href="https://syaddad.pages.dev" target="_blank" className="text-white">
            syaddad.dev
          </a>
        </div>
      </footer>
    </div>
  );
}
