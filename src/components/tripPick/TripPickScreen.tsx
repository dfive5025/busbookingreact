import React, { useEffect, useState } from "react";
// import "./trip-pick-screen.css";
import "./TripPickScreen.scss";
import ic_close from "../../assets/svgs/ic_back.svg";
import ic_filter from "../../assets/svgs/ic_filter_grey.svg";
import ic_arrow from "../../assets/svgs/ic_arrow.svg";
import ic_heart from "../../assets/svgs/ic_heart.svg";
import data from "./locchuyenxe.json";
import { formatNumber } from "../../utils/convertVnd.ts";
import ScrollDataPicker from "../scrollDatePicker/ScrollDataPicker.tsx";
// import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";

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

const TripPickScreen = () => {
  const [numPrice, setNumPrice] = useState(0);
  const [numReview, setNumReview] = useState(0);
  const [numDepatureTime, setNumDepatureTime] = useState(0);
  const [initialTrips, setInitialTrips] = useState<Trip[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);

  const handlePriceChange = (Price) => {
    setSelectedPrice([]);
    setSelectedPrice((prev) =>
      prev.includes(Price)
        ? prev.filter((item) => item !== Price)
        : [...prev, Price]
    );
    console.log(Price);
  };

  useEffect(() => {
    if (selectedPrice.includes("gia ve")) {
      if (numPrice === 0) {
        setTrips((prevTrips) => [...prevTrips].sort(compareTripsByPrice));
        setNumPrice((prev) => prev + 1);
        console.log(numPrice);
      } else if (numPrice === 1) {
        setTrips((prevTrips) =>
          [...prevTrips].sort(compareTripsByPriceDecrease)
        );
        setNumPrice((prev) => prev - 1);
        console.log(numPrice);
      }
    } else if (selectedPrice.includes("danhgia")) {
      if (numReview === 0) {
        setTrips((prevTrips) => [...prevTrips].sort(compareTripsByReview));
        setNumReview((prev) => prev + 1);
      } else if (numReview === 1) {
        setTrips((prevTrips) =>
          [...prevTrips].sort(compareTripsByReviewDecrease)
        );
        setNumReview((prev) => prev - 1);
      }
    } else if (selectedPrice.includes("giochay")) {
      if (numDepatureTime === 0) {
        setTrips((prevTrips) => [...prevTrips].sort(compareTripsByDateTime));
        setNumDepatureTime((prev) => prev + 1);
      } else if (numDepatureTime === 1) {
        setTrips((prevTrips) =>
          [...prevTrips].sort(compareTripsByDateTimeDecrease)
        );
        setNumDepatureTime((prev) => prev - 1);
      }
    } else {
      setTrips(initialTrips);
    }
    console.log("btngiave: ", initialTrips);
  }, [selectedPrice]);

  const compareTripsByDateTime = (tripA, tripB) => {
    // Ghép ngày và giờ thành chuỗi định dạng datetime
    const dateTimeA = `${tripA.departure_date} ${tripA.departure_time}`;
    const dateTimeB = `${tripB.departure_date} ${tripB.departure_time}`;
    // Tạo đối tượng Date từ chuỗi datetime
    const dateA = new Date(dateTimeA.split("-").reverse().join("-"));
    const dateB = new Date(dateTimeB.split("-").reverse().join("-"));
    return dateA - dateB;
  };

  const compareTripsByDateTimeDecrease = (tripA, tripB) => {
    const dateTimeA = `${tripA.departure_date} ${tripA.departure_time}`;
    const dateTimeB = `${tripB.departure_date} ${tripB.departure_time}`;
    const dateA = new Date(dateTimeA.split("-").reverse().join("-"));
    const dateB = new Date(dateTimeB.split("-").reverse().join("-"));
    return dateB - dateA;
  };
  const compareTripsByPrice = (tripA: Trip, tripB: Trip) => {
    return tripA.fare_amount - tripB.fare_amount;
  };

  const compareTripsByPriceDecrease = (tripA: Trip, tripB: Trip) => {
    return tripB.fare_amount - tripA.fare_amount;
  };

  const compareTripsByReview = (tripA: Trip, tripB: Trip) => {
    return (
      tripB.transport_information.rating - tripA.transport_information.rating
    );
  };

  const compareTripsByReviewDecrease = (tripA: Trip, tripB: Trip) => {
    return (
      tripA.transport_information.rating - tripB.transport_information.rating
    );
  };

  // const sortByDate = () => {
  //   setTrips(filterTripByDate);
  // };

  const filterTripByDate = (date: Date) => {
    return initialTrips.filter((trip) => {
      return trip.departure_date === date;
    });
  };

  const sortTripsByDate = (date) => {
    const filteredTrips = filterTripByDate(date);
    const sortedTrips = [...filteredTrips].sort((a, b) => {
      const dateA = new Date(`${a.departure_date} ${a.departure_time}`);
      const dateB = new Date(`${b.departure_date} ${b.departure_time}`);
      return dateA - dateB;
    });
    setTrips(sortedTrips);
  };

  useEffect(() => {
    // Đọc dữ liệu từ tệp JSON
    const coreData = data.json.coreData;
    if (coreData && coreData.data) {
      console.log(coreData.data.slice(0, 10));
      setInitialTrips(coreData.data.slice(0, 10));
      setTrips(coreData.data.slice(0, 10));
    }
  }, []);
  const onSelectedDay = (d) => {
    console.log(d);
  };

  const getLocationA = (location) => {
    const parts = location.split("-");
    return parts[0].trim();
  };
  const getLocationB = (location) => {
    const parts = location.split("-");
    return parts[1].trim();
  };

  const calculateAndFormatTimeDifference = (time1, date1, time2, date2) => {
    // Chia chuỗi thành mảng các thành phần: giờ và phút
    const [hour1, minute1] = time1.split(":").map(Number);
    const [hour2, minute2] = time2.split(":").map(Number);

    // Chia chuỗi ngày thành mảng các thành phần: ngày, tháng và năm
    const [day1, month1, year1] = date1.split("-").map(Number);
    const [day2, month2, year2] = date2.split("-").map(Number);

    // Tạo đối tượng Date cho mỗi ngày
    const dateObj1 = new Date(year1, month1 - 1, day1, hour1, minute1);
    const dateObj2 = new Date(year2, month2 - 1, day2, hour2, minute2);

    // Lấy số milliseconds của mỗi ngày
    const time1Ms = dateObj1.getTime();
    const time2Ms = dateObj2.getTime();

    // Tính khoảng cách thời gian giữa hai ngày
    const timeDifferenceMs = Math.abs(time2Ms - time1Ms);

    // Chuyển đổi khoảng cách thời gian từ milliseconds sang giờ và phút
    const hoursDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
    const minutesDifference = Math.floor(
      (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    // Tạo chuỗi định dạng "11 tiếng 40 phút"
    let formattedTime = "";
    if (hoursDifference > 0) {
      formattedTime += `${hoursDifference} tiếng `;
    }
    formattedTime += `${minutesDifference} phút`;

    return formattedTime;
  };

  return (
    <div className="trip-pick-container">
      <div className="trip-header">
        <img src={ic_close} alt="icback"></img>
        <span className="trip-title">Chọn chuyến đi</span>
        <button className="clear-filter">Xóa lọc</button>
      </div>
      <ScrollDataPicker getListFilterByDay={sortTripsByDate}></ScrollDataPicker>

      <div className="filter-buttons">
        <button
          onClick={() => handlePriceChange("giochay")}
          className={`DepartureTime ${
            selectedPrice.includes("giochay") ? "selectedDepartureTime" : ""
          } ${numDepatureTime === 1 ? "selectedDepartureTimeDecrease" : ""}`}
        >
          Giờ chạy
          <img src={ic_arrow} alt="ic_arrow"></img>
        </button>
        <button
          onClick={() => handlePriceChange("gia ve")}
          className={`DepartureTime ${
            selectedPrice.includes("gia ve") ? "selectedDepartureTime" : ""
          } ${numPrice === 1 ? "selectedDepartureTimeDecrease" : ""}`}
        >
          Giá vé
          <img src={ic_arrow} alt="ic_arrow"></img>
        </button>
        <button
          onClick={() => handlePriceChange("danhgia")}
          className={`DepartureTime ${
            selectedPrice.includes("danhgia") ? "selectedDepartureTime" : ""
          } ${numReview === 1 ? "selectedDepartureTimeDecrease" : ""}`}
        >
          Đánh giá
          <img src={ic_arrow} alt="ic_arrow"></img>
        </button>
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
        {trips.map((trip) => (
          <div className="trip-item" key={trip.uuid}>
            <div className="trip-time">
              <span className="date">
                {trip.departure_time} {trip.departure_date}
              </span>
              <span className="time-along">
                {calculateAndFormatTimeDifference(
                  trip.departure_time,
                  trip.departure_date,
                  trip.drop_off_time,
                  trip.drop_off_date
                )}
              </span>
            </div>
            <div className="trip-route">
              <span>{getLocationA(trip.name)}</span>
              <img src={ic_arrow} alt="ic_arrow"></img>
              <span>{getLocationB(trip.name)}</span>
            </div>
            <div className="trip-company">
              <img
                src={trip.transport_information.image_url}
                alt="bus"
                className="imgBus"
              ></img>
              <div className="company-details">
                <div className="company-des">
                  <span className="company-name">
                    {trip.transport_information.name}
                  </span>
                  <span className="company-role">Chi tiết quy định</span>
                </div>
                <div className="trip-rating">
                  <span className="rate">
                    ★ {trip.transport_information.rating}
                    <img
                      src={ic_heart}
                      alt="ic_heart"
                      className="imgHeart"
                    ></img>
                  </span>
                  <span className="trip-type">{trip.vehicle_name}</span>
                </div>
              </div>
            </div>
            <div className="line">
              <h4>----------------------------------------------------</h4>
            </div>
            <div className="price-continue">
              <div className="price-content">
                <span className="trip-price">
                  Từ {formatNumber(trip.discount_amount)}
                </span>
                <span className="seats-left">
                  Chỉ còn {trip.available_seat} chỗ trống
                </span>
              </div>
              <div className="btntiep">
                <button className="continue-button">Tiếp tục</button>
              </div>
            </div>
          </div>
        ))}
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
