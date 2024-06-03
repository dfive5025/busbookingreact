import React from "react";
import "./BusFilterScreen.css";

const BusFilterScreen = () => {
  return (
    <div className="filterContainer">
      <div className="titlePage">
        <h1>Lọc chuyến xe</h1>
      </div>
      <div className="filterSection">
        <div className="filterTitle">Thời gian khởi hành</div>
        <div className="timeOptions">
          <div className="timeOption">
            Sáng sớm <br /> 00:00 - 06:00
          </div>
          <div className="timeOption">
            Buổi sáng <br /> 06:01 - 12:00
          </div>
          <div className="timeOption">
            Buổi trưa <br /> 12:01 - 18:00
          </div>
          <div className="timeOption">
            Buổi tối <br /> 18:01 - 23:59
          </div>
        </div>

        <div className="filterTitle">Khoảng giá</div>
        <div className="priceRange">
          <span>100.000 đ</span>
          <input
            type="range"
            min="100000"
            max="900000"
            className="priceSlider"
          />
          <span>900.000 đ</span>
        </div>

        <div className="filterTitle">Nhà xe</div>
        <div className="busCompanies">
          <div className="companyOption">Hà Lan Limousine</div>
          <div className="companyOption">Minh Anh</div>
          <div className="companyOption">Bảo Phong</div>
        </div>

        <div className="filterTitle">Loại xe</div>
        <div className="busTypes">
          <div className="typeOption">Limousine 9 chỗ</div>
          <div className="typeOption">Limousine 16 chỗ</div>
          <div className="typeOption">Limousine 36 chỗ</div>
        </div>
      </div>

      <div className="footerButtons">
        <button className="clearButton">Xóa lọc</button>
        <button className="applyButton">Áp dụng (30)</button>
      </div>
    </div>
  );
};

export default BusFilterScreen;
