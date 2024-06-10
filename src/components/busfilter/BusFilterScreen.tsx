import React, { useEffect, useState } from "react";
import "./bus-filter-screen.css";
import "./BusFilterScreen.scss";
import ic_close from "../../assets/svgs/ic_close.svg";
import bus from "../../assets/svgs/bus.svg";
import busList from "../../constants/BusCompanyList.ts";
import busTypeList from "../../constants/BusTypeList.ts";
import timeList from "../../constants/TimeList.ts";
import Slider from "react-slider";
import { formatNumber } from "../../utils/convertVnd.ts";
import { useNavigate } from "react-router-dom";
import strings from "../res/strings.tsx";
import LoadingSpiner from "../loadingSpiner/LoadingSpiner.tsx";
const minPrice = 0;
const maxPrice = 3000000;

const BusFilterScreen = (props) => {
  const { showBusFilter, setShowBusFilter, handleClosePopup, applyFilters } =
    props;
  const handleShow = () => setShowBusFilter(true);
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedBusTypes, setSelectedBusTypes] = useState<string[]>([]);
  const [prices, setPrices] = useState([minPrice, maxPrice]);
  const navigate = useNavigate();

  if (!showBusFilter) {
    return null;
  }
  const handleTimeCheckboxChange = (timeBus) => {
    setSelectedTime((prev) =>
      prev.includes(timeBus)
        ? prev.filter((item) => item !== timeBus)
        : [...prev, timeBus]
    );
    console.log(selectedTime);
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
  const handledeleteFilter = () => {
    setSelectedTime([]);
    setPrices([0, 3000000]);
    setSelectedBusTypes([]);
    setSelectedCompanies([]);
  };

  const handleCancle = () => {
    props.handleClosePopup();
  };

  const submitFilters = () => {
    applyFilters({
      times: selectedTime,
      companies: selectedCompanies,
      busTypes: selectedBusTypes,
      minPrice: prices[0],
      maxPrice: prices[1],
    });
    props.handleClosePopup();
  };

  return (
    <div className="container-parent">
      <div className={`bus-filter-screen ${showBusFilter ? "show" : ""}`}>
        <div className="filterContainer">
          <div className="titlePage">
            <img src={ic_close} alt="icback" onClick={handleCancle}></img>
            <span className="trip-title">{strings.tripFilter}</span>
          </div>
          <div className="filterSection">
            <div className="filterTitle">{strings.depatureTimeFilter}</div>
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
              <span className="filterTitle">{strings.priceRangeTitle}</span>
              <span className="titlePrice">{strings.priceRange}</span>
            </div>
            <div className="priceRange">
              <div className="sliderContainer">
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

            <div className="filterTitle">{strings.garageTitle}</div>
            <div className="bus-companies-container">
              <div className="busCompanies">
                {busList.map((busList, index) => {
                  return (
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
                  );
                })}
              </div>
            </div>

            <div className="filterTitle">{strings.busType}</div>
            <div className="busTypes">
              {busTypeList.map((busTypeList, index) => {
                return (
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
                );
              })}
            </div>
          </div>

          <div className="footerButtons">
            <button className="clearButton" onClick={handledeleteFilter}>
              {strings.deleteFilter}
            </button>
            <button className="applyButton" onClick={submitFilters}>
              {strings.apply}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusFilterScreen;
