import React, { useEffect, useState } from "react";
import "./NotFoundView.scss";
const NotFoundView = (props) => {
  const { handleCloseNotFoundScreen } = props;
  const [showNotFoundScreen, setShowNotFoundScreen] = useState(false);

  const handleCancle = () => {
    props.handleCloseNotFoundScreen();
  };

  useEffect(() => {
    setShowNotFoundScreen(true);
    setTimeout(() => {
      handleCancle();
    }, 5000);
  }, []);
  return (
    <div className="notification">
      <span>Không tìm thấy kết quả lọc phù hợp</span>
      <button className="close-btn" onClick={handleCancle}>
        &times;
      </button>
    </div>
  );
};

export default NotFoundView;
