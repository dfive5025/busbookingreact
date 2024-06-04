import React, { useState } from "react";
import "./bus-filter-screen.css";
import ic_close from "../../assets/svgs/ic_close.svg";
import bus from "../../assets/svgs/bus.svg";
import busList from "../../constants/BusCompanyList.ts";
import busTypeList from "../../constants/BusTypeList.ts";
import timeList from "../../constants/TimeList.ts";
import Slider from "react-slider";
import { formatNumber } from "../../utils/convertVnd.ts";
const minPrice = 0;
const maxPrice = 3000000;

const BusFilterScreen = () => {
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedBusTypes, setSelectedBusTypes] = useState<string[]>([]);
  const [prices, setPrices] = useState([minPrice, maxPrice]);

  const handleTimeCheckboxChange = (timeBus) => {
    setSelectedTime((prev) =>
      prev.includes(timeBus)
        ? prev.filter((item) => item !== timeBus)
        : [...prev, timeBus]
    );
    console.log(timeBus);
  };

  const handleCompanyCheckboxChange = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((item) => item !== company)
        : [...prev, company]
    );
  };

  const handleBusTypeCheckboxChange = (busType: string) => {
    setSelectedBusTypes((prev) =>
      prev.includes(busType)
        ? prev.filter((item) => item !== busType)
        : [...prev, busType]
    );
  };

  return (
    <div className="filterContainer">
      <div className="titlePage">
        <img src={ic_close} alt="icback"></img>
        <span className="trip-title">Lọc chuyến xe</span>
      </div>
      <div className="filterSection">
        <div className="filterTitle">Thời gian khởi hành</div>
        <div className="timeOptions">
          {timeList.map((timeList, index) => {
            return (
              <label
                className={`timeOption ${
                  selectedTime.includes(timeList.time) ? "selectedTime" : ""
                }`}
                key={index}
              >
                {timeList.titleTime} <br /> {timeList.time}
                <input
                  type="checkbox"
                  checked={selectedTime.includes(timeList.time)}
                  onChange={() => handleTimeCheckboxChange(timeList.time)}
                />
              </label>
            );
          })}
        </div>
        <div className="price">
          <span className="filterTitle">Khoảng giá</span>
          <span className="titlePrice">0 - 3.000.000đ/vé</span>
        </div>
        <div className="priceRange">
          <div className="sliderContainer">
            {/* <input
              type="range"
              min="100000"
              max="900000"
              className="priceSlider"
            /> */}
            <Slider
              className={"slider"}
              value={prices}
              min={minPrice}
              step={1000}
              max={maxPrice}
              onChange={setPrices}
            />
          </div>
          <div className="priceLabels">
            <span>{formatNumber(prices[0])}</span>
            <span>{formatNumber(prices[1])}</span>
          </div>
        </div>

        <div className="filterTitle">Nhà xe</div>
        {/* <div className="busCompanies"> */}
        <ul>
          {busList.map((busList, index) => {
            return (
              <div className="busCompanies">
                <label
                  className={`companyOption ${
                    selectedCompanies.includes(busList.busName)
                      ? "selected"
                      : ""
                  }`}
                  key={index}
                >
                  <img src={bus} alt="bus" className="imgBus"></img>
                  {busList.busName}
                  <input
                    type="checkbox"
                    checked={selectedCompanies.includes(busList.busName)}
                    onChange={() =>
                      handleCompanyCheckboxChange(busList.busName)
                    }
                  />
                </label>
              </div>
            );
          })}
        </ul>

        <div className="filterTitle">Loại xe</div>
        <ul>
          {busTypeList.map((busTypeList, index) => {
            return (
              <div className="busTypes">
                <label
                  className={`typeOption ${
                    selectedBusTypes.includes(busTypeList.seatNum)
                      ? "selected"
                      : ""
                  }`}
                  key={index}
                >
                  {busTypeList.seatNum}
                  <input
                    type="checkbox"
                    checked={selectedBusTypes.includes(busTypeList.seatNum)}
                    onChange={() =>
                      handleBusTypeCheckboxChange(busTypeList.seatNum)
                    }
                  />
                </label>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="footerButtons">
        <button className="clearButton">Xóa lọc</button>
        <button className="applyButton">Áp dụng (30)</button>
      </div>
    </div>
  );
};

export default BusFilterScreen;
