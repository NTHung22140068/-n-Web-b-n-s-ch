import React from "react";

function Banner() {
  return (
    <div>
      <div className="p-2 mb-4 bg-dark">
        <div className="contauiner-fluid py-5 text-white d-flex justify-content-center align-item-center">
          <div>
            <h2 className="display-5 fw-bold">
              Đọc Sách Là Chân Trời Tri Thức
            </h2>
            <p className="">Nguyễn Thành Hưng</p>

            <button className="btn btn-primary btn-lg text-white float-end">
              {" "}
              -😍 HUNG STORE 😍 -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
