import React, { useEffect, useState } from "react";
// import "./trip-pick-screen.css";
import "./TripPickScreen.scss";
import ic_close from "../../assets/svgs/ic_back.svg";
import ic_filter from "../../assets/svgs/ic_filter_grey.svg";
import ic_arrow from "../../assets/svgs/ic_arrow.svg";
import ic_heart from "../../assets/svgs/ic_heart_selected.svg";
import data from "./locchuyenxe.json";
import { formatNumber } from "../../utils/convertVnd.ts";
import strings from "../res/strings.tsx";
import ScrollDatePicker from "../scrollDatePicker/ScrollDatePicker.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import BusFilterScreen from "../busFilter/BusFilterScreen.tsx";
import LoadingSpiner from "../loadingSpiner/LoadingSpiner.tsx";
import NotFoundView from "../notFound/NotFoundView.tsx";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isShowBusFilter, setShowBusFilter] = useState(false);
  const [isShowLoading, setShowLoading] = useState(false);
  const [isShowNotFound, setShowNotFound] = useState(false);

  const handleDeleteFilter = () => {
    setSelectedPrice([]);
    setNumPrice(0);
    setNumDepatureTime(0);
    setNumReview(0);
    setTrips(initialTrips);
  };

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
    // Đọc dữ liệu từ tệp JSON
    const coreData = data.json.coreData;
    if (coreData && coreData.data) {
      console.log("khoitao", coreData.data.slice(0, 25));
      setInitialTrips(coreData.data.slice(0, 25));
      // setTrips(coreData.data.slice(0, 25));
    }
  }, []);
  const onSelectedDay = (d) => {
    console.log(d);
  };

  useEffect(() => {
    if (!isInitialRender) {
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
    } else {
      setIsInitialRender(false);
    }
  }, [selectedPrice]);

  const compareTripsByDateTime = (tripA, tripB) => {
    // Ghép ngày và giờ thành chuỗi định dạng datetime
    const dateTimeA = `${tripA.departure_date} ${tripA.departure_time}`;
    const dateTimeB = `${tripB.departure_date} ${tripB.departure_time}`;
    // Tạo đối tượng Date từ chuỗi datetime
    const dateA = new Date(dateTimeA.split("-").reverse().join("-"));
    const dateB = new Date(dateTimeB.split("-").reverse().join("-"));
    return dateA.getTime() - dateB.getTime();
  };

  const compareTripsByDateTimeDecrease = (tripA, tripB) => {
    const dateTimeA = `${tripA.departure_date} ${tripA.departure_time}`;
    const dateTimeB = `${tripB.departure_date} ${tripB.departure_time}`;
    const dateA = new Date(dateTimeA.split("-").reverse().join("-"));
    const dateB = new Date(dateTimeB.split("-").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
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

  const filterTripByDate = (date) => {
    return initialTrips.filter((trip) => {
      return trip.departure_date === date;
    });
  };

  const sortTripsByDate = (date) => {
    console.log("vao", "da vao");
    handleOpenLoadingScreen();
    const filteredTrips = filterTripByDate(date);
    const sortedTrips = [...filteredTrips].sort((a, b) => {
      const dateA = new Date(`${a.departure_date} ${a.departure_time}`);
      const dateB = new Date(`${b.departure_date} ${b.departure_time}`);
      return dateA.getTime() - dateB.getTime();
    });
    setTimeout(() => {
      if (sortedTrips.length === 0) {
        handleOpenNotFoundScreen();
      }
      setTrips(sortedTrips);
    }, 3500);
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

    // Lấy milliseconds của mỗi ngày
    const time1Ms = dateObj1.getTime();
    const time2Ms = dateObj2.getTime();

    // Tính khoảng cách thời gian giữa hai ngày
    const timeDifferenceMs = Math.abs(time2Ms - time1Ms);

    // Chuyển đổi khoảng cách thời gian từ milliseconds sang giờ và phút
    const hoursDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
    const minutesDifference = Math.floor(
      (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    // Tạo chuỗi định dạng return
    let formattedTime = "";
    if (hoursDifference > 0) {
      formattedTime += `${hoursDifference} tiếng `;
    }
    formattedTime += `${minutesDifference} phút`;

    return formattedTime;
  };

  const onClickFilter = () => {
    navigate("/");
  };

  const filterTripsByTime = (trips, timeFilters) => {
    return trips.filter((trip) => {
      const tripMinutes = convertTimeToMinutes(trip.departure_time);
      return timeFilters.some((time) => {
        const [startTime, endTime] = time.split(" - ");
        const startMinutes = convertTimeToMinutes(startTime);
        const endMinutes = convertTimeToMinutes(endTime);
        return tripMinutes >= startMinutes && tripMinutes <= endMinutes;
      });
    });
  };

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const applyFilters = (filters) => {
    console.log("kiemtra9999", filters);
    const coreData = data.json.coreData;
    let filteredTrips = coreData.data.slice(0, 25);
    console.log("dat00000", filteredTrips);
    //Filter by time
    if (filters.times.length > 0) {
      filteredTrips = filterTripsByTime(filteredTrips, filters.times);
    }
    //Filter by company
    if (filters.companies.length > 0) {
      console.log("companies", filters.companies);
      filteredTrips = filteredTrips.filter((trip) =>
        filters.companies.includes(trip.transport_information.name)
      );
    }
    // Filter by bus type
    if (filters.busTypes.length > 0) {
      console.log("busTypes", filters.busTypes);
      filteredTrips = filteredTrips.filter((trip) =>
        filters.busTypes.includes(trip.vehicle_name)
      );
    }
    //Filter by price
    filteredTrips = filteredTrips.filter(
      (trip) =>
        trip.fare_amount >= filters.minPrice &&
        trip.fare_amount <= filters.maxPrice
    );
    // console.log("check", filteredTrips);
    setTrips(filteredTrips);
  };
  const handleOpenPopup = () => {
    setShowBusFilter(true);
  };

  const handleClosePopup = () => {
    setShowBusFilter(false);
  };

  const handleCloseLoadingScreen = () => {
    setShowLoading(false);
  };

  const handleOpenLoadingScreen = () => {
    setShowLoading(true);
  };

  const handleCloseNotFoundScreen = () => {
    setShowNotFound(false);
  };

  const handleOpenNotFoundScreen = () => {
    setShowNotFound(true);
  };

  return (
    <>
      {isShowLoading && (
        <div>
          <LoadingSpiner
            handleCloseLoadingScreen={handleCloseLoadingScreen}
          ></LoadingSpiner>
        </div>
      )}
      {isShowBusFilter && (
        <div className="overlay">
          <BusFilterScreen
            showBusFilter={isShowBusFilter}
            setShowBusFilter={setShowBusFilter}
            handleClosePopup={handleClosePopup}
            applyFilters={applyFilters}
          />
        </div>
      )}
      <div className="trip-pick-container">
        <div className="trip-header-containers">
          <div className="trip-header">
            <img src={ic_close} alt="icback"></img>
            <div className="title-container">
              <span className="trip-title">{strings.tripPick}</span>
              <span className="trip-name">Sàn Gòn - Bảo Lộc</span>
            </div>
            <button className="clear-filter" onClick={handleDeleteFilter}>
              {strings.filterRemove}
            </button>
          </div>
          <ScrollDatePicker
            getListFilterByDay={sortTripsByDate}
          ></ScrollDatePicker>
          <div className="container-button">
            <div className="filter-buttons">
              <button
                onClick={() => handlePriceChange("giochay")}
                className={`button-filter ${
                  selectedPrice.includes("giochay")
                    ? "selected-button-filter"
                    : ""
                } ${
                  numDepatureTime === 1 ? "selected-button-filter-decrease" : ""
                }`}
              >
                {strings.depatureTime}
                <img src={ic_arrow} alt="ic_arrow"></img>
              </button>
              <button
                onClick={() => handlePriceChange("gia ve")}
                className={`button-filter ${
                  selectedPrice.includes("gia ve")
                    ? "selected-button-filter"
                    : ""
                } ${numPrice === 1 ? "selected-button-filter-decrease" : ""}`}
              >
                {strings.price}
                <img src={ic_arrow} alt="ic_arrow"></img>
              </button>
              <button
                onClick={() => handlePriceChange("danhgia")}
                className={`button-filter ${
                  selectedPrice.includes("danhgia")
                    ? "selected-button-filter"
                    : ""
                } ${numReview === 1 ? "selected-button-filter-decrease" : ""}`}
              >
                {strings.review}
                <img src={ic_arrow} alt="ic_arrow"></img>
              </button>
            </div>
            <button className="filter-button" onClick={handleOpenPopup}>
              {strings.filter}
              <img src={ic_filter} alt="icback" className="ic-filter"></img>
            </button>
          </div>
        </div>
        {isShowNotFound && (
          <div>
            <NotFoundView
              handleCloseNotFoundScreen={handleCloseNotFoundScreen}
            ></NotFoundView>
          </div>
        )}
        <div className="trip-list-container">
          <div className="trip-list">
            {trips.map((trip) => (
              <div className="trip-item" key={trip.uuid}>
                <div className="trip-time">
                  <span className="departure-date">
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
                  <span className="name-location-A">
                    {getLocationA(trip.name)}
                  </span>
                  <img src={ic_arrow} alt="ic_arrow"></img>
                  <span className="name-location-B">
                    {getLocationB(trip.name)}
                  </span>
                </div>
                <div className="trip-company">
                  <div className="bus-image">
                    <img
                      src={trip.transport_information.image_url}
                      alt="bus"
                      className="img"
                    ></img>
                  </div>
                  <div className="company-details">
                    <div className="company-des">
                      <span className="company-name">
                        {trip.transport_information.name}
                      </span>
                      <span className="company-role">
                        {strings.regulatoryDetails}
                      </span>
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
                      {strings.from}{" "}
                      <span className="amout-text">
                        {formatNumber(trip.discount_amount)}
                      </span>
                    </span>
                    <span className="seats-left">
                      {strings.only} {trip.available_seat}{" "}
                      {strings.seatAvailable}
                    </span>
                  </div>
                  <div className="btntiep">
                    <button className="continue-button">Tiếp tục</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TripPickScreen;
