import React, { useEffect, useState } from "react";
// import "./trip-pick-screen.css";
import bus from "../../assets/svgs/bus.svg";
import "./TripPickScreen.scss";
import ic_close from "../../assets/svgs/ic_back.svg";
import ic_filter from "../../assets/svgs/ic_filter_grey.svg";
import ic_arrow from "../../assets/svgs/ic_arrow.svg";
import ic_heart from "../../assets/svgs/ic_heart.svg";
import data from "./locchuyenxe.json";

interface Trip {
  allow_picking_seat: boolean;
  vehicle_type: string;
  status: string;
  total_seat: number;
  seat_type: string;
  duration_in_min: number;
  merchant_start_point_name: string;
  start_point: string;
  discount_amount: number;
  refund_able: boolean;
  search_request_id: number;
  departure_time: string;
  vehicle_name: string;
  uuid: string;
  merchant_id: number;
  pick_up_date: string;
  drop_off_date: string;
  name: string;
  drop_off_time: string;
  priority: number;
  departure_date: string;
  merchant_end_point_name: string;
  available_seat: number;
  merchant_name: string;
  fare_amount: number;
  end_location_id: number;
  transport_information: {
    rating: number;
    allow_view_detail: boolean;
    id: number;
    code: string;
    image_url: string;
    is_favorite: boolean;
    notification: {
      label: string;
      description: string;
    };
    comment_number: number;
    direct_connect: boolean;
    name: string;
  };
  end_point: string;
  start_location_id: number;
  merchant_trip_code: string;
  pick_up_time: string;
  merchant_code: string;
}

const TripPickScreen = (props) => {
  //const {} = props;
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    // Đọc dữ liệu từ tệp JSON
    const coreData = data.json.coreData;
    if (coreData && coreData.data) {
      console.log(coreData.data);
      setTrips(coreData.data);
    }
  }, []);

  return (
    <div className="trip-pick-container">
      <div className="trip-header">
        <img src={ic_close} alt="icback"></img>
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
        <button className="filter-button">
          Lọc <img src={ic_filter} alt="icback" className="ic-filter"></img>
        </button>
      </div>
      <div className="trip-list">
        {/* <div className="trip-item">
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
        </div> */}
        <div className="trip-item">
          <div className="trip-time">
            <span className="date">10:30 20/03/2023</span>
            <span className="time-along">2 giờ 10 phút</span>
          </div>
          <div className="trip-route">
            <span>260 Đức Giang</span>
            <img src={ic_arrow} alt="ic_arrow"></img>
            <span>230 An Lão</span>
          </div>
          <div className="trip-company">
            <img src={bus} alt="bus" className="imgBus"></img>
            <div className="company-details">
              <div className="company-des">
                <span className="company-name">Việt Phương Yên Bái</span>
                <span className="company-role">Chi tiết quy định</span>
              </div>
              <div className="trip-rating">
                <span className="rate">
                  ★ 5 <img src={ic_heart} alt="ic_heart"></img>
                </span>
                <span className="trip-type">Limousine ghế ngồi 16 chỗ</span>
              </div>
            </div>
          </div>
          <div className="price-continue">
            <div className="price-content">
              <span className="trip-price">Từ 220,000 đ</span>
              <span className="seats-left">Chỉ còn 6 chỗ trống</span>
            </div>
            <div className="btntiep">
              <button className="continue-button">Tiếp tục</button>
            </div>
          </div>
        </div>
        {/* <div className="trip-item">
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
        </div> */}
      </div>
    </div>
  );
};

export default TripPickScreen;
