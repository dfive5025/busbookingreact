import React, { useEffect, useState } from "react";
import loading from "../../assets/svgs/loading.svg";
import "./LoadingSpiner.scss";
const LoadingSpiner = (props) => {
  const { handleCloseLoadingScreen } = props;
  const [textLoading, setTextLoading] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    setTimeout(() => {
      setTextLoading("loading...");
      handleCancle();
    }, 3000);
  }, []);

  const handleCancle = () => {
    props.handleCloseLoadingScreen();
  };

  return (
    <>
      <div className="loading-overlay">
        <div className="loading-container">
          {showLoading ? (
            <img src={loading} alt="loading" className="imgLoading"></img>
          ) : (
            <h3>{textLoading}</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default LoadingSpiner;
