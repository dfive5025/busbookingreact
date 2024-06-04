import React from "react";
import "./trip-pick-screen.css";

const TripPickScreen = () => {
  return (
    <div className="trip-pick-container">
      <div className="trip-header">
        <button className="back-button">&lt;</button>
        <span className="trip-title">Chọn chuyến đi</span>
        <button className="clear-filter">Xóa lọc</button>
      </div>
      <div className="date-picker">
        <span>
          T6
          <br />
          17/3
        </span>
        <span>
          T7
          <br />
          18/3
        </span>
        <span>
          CN
          <br />
          19/3
        </span>
        <span className="selected">
          T2
          <br />
          20/3
        </span>
        <span>
          T3
          <br />
          21/3
        </span>
        <span>
          T4
          <br />
          22/3
        </span>
        <span>
          T5
          <br />
          23/3
        </span>
      </div>
      <div className="filter-buttons">
        <button>Giờ chạy</button>
        <button>Giá vé</button>
        <button>Đánh giá</button>
        <button className="filter-button">Lọc</button>
      </div>
      <div className="trip-list">
        <div className="trip-item">
          <div className="trip-time">10:30 20/03/2023</div>
          <div className="trip-route">Bến xe Gia Lâm - Văn Phòng An Lão</div>
          <div className="trip-company">
            <img src="phuong_trang_logo.png" alt="Phuong Trang" />
            <div className="company-details">
              <span className="company-name">Phương Trang</span>
              <span className="trip-type">Limousine ghế ngồi 16 chỗ</span>
              <span className="trip-price">Từ 190,000 đ</span>
              <span className="seats-left">Chỉ còn 6 chỗ trống</span>
            </div>
            <div className="trip-rating">★ 4.5</div>
          </div>
          <button className="continue-button">Tiếp tục</button>
        </div>
        <div className="trip-item">
          <div className="trip-time">10:30 20/03/2023</div>
          <div className="trip-route">260 Đức Giang - 230 An Lão</div>
          <div className="trip-company">
            <img src="viet_phuong_logo.png" alt="Viet Phuong Yen Bai" />
            <div className="company-details">
              <span className="company-name">Việt Phương Yên Bái</span>
              <span className="trip-type">Limousine ghế ngồi 16 chỗ</span>
              <span className="trip-price">Từ 220,000 đ</span>
              <span className="seats-left">Chỉ còn 6 chỗ trống</span>
            </div>
            <div className="trip-rating">★ 5</div>
          </div>
          <button className="continue-button">Tiếp tục</button>
        </div>
        <div className="trip-item">
          <div className="trip-time">10:30 20/03/2023</div>
          <div className="trip-route">250 Đức Giang - 200 An Lão</div>
          <div className="trip-company">
            <img src="van_minh_logo.png" alt="Van Minh" />
            <div className="company-details">
              <span className="company-name">Văn Minh</span>
              <span className="trip-type">Limousine giường nằm 38 chỗ</span>
              <span className="trip-price">Từ 200,000 đ</span>
              <span className="seats-left">Chỉ còn 6 chỗ trống</span>
            </div>
            <div className="trip-rating">★ 4</div>
          </div>
          <button className="continue-button">Tiếp tục</button>
        </div>
      </div>
    </div>
  );
};

export default TripPickScreen;
