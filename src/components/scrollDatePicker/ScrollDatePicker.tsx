import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import "./ScrollDatePicker.scss";
import "moment/locale/vi";
moment.locale("vi");

interface DayInfo {
  day: string;
  dayOfWeek: string;
  dayMonth: string;
  fullDate: string;
}

const ScrollDataPicker = (props) => {
  let { getListFilterByDay } = props;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  // const dateListRef = useRef(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);

  const getDaysInMonth = (): Day[] => {
    const days: DayInfo[] = [];
    const monthStart = moment().startOf("month");
    const monthEnd = moment().endOf("month");

    let currentDay = monthStart;
    while (currentDay <= monthEnd) {
      days.push({
        day: currentDay.format("DD"),
        dayOfWeek: currentDay.format("dd").toUpperCase(), // Lấy thứ
        dayMonth: currentDay.format("D/M"), // Định dạng đầy đủ ngày/tháng
        fullDate: currentDay.format("DD-MM-Y"),
      });
      currentDay = currentDay.clone().add(1, "day");
    }

    return days;
  };

  useEffect(() => {
    const today = moment().format("DD-MM-Y");
    setSelectedDate(today);
    getListFilterByDay(today);
    // if (selectedDate !== null) {
    //   itemRefs.current[selectedDate].scrollIntoView({
    //     behavior: "smooth",
    //     block: "center",
    //   });
    // }
    // if (dateListRef.current) {
    //   const selectedElement = dateListRef.current.querySelector("li.selected");
    //   if (selectedElement) {
    //     selectedElement.scrollIntoView({
    //       behavior: "smooth",
    //       inline: "center",
    //     });
    //   }
    // }
  }, []);

  useEffect(() => {
    if (selectedDate !== null) {
      itemRefs.current[selectedDate].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedDate]);

  const handleDateClick = (dayFull) => {
    setSelectedDate(dayFull);
    getListFilterByDay(dayFull);
    //fullDate = day;
    // Xử lý logic khi ngày được chọn
    console.log("Ngày được chọn:", dayFull);
  };

  return (
    <>
      <div className="datepicker-dateList">
        <div className="scroll-container">
          <ul className="date-list">
            {getDaysInMonth().map((day, index) => (
              <li
                key={index}
                ref={(el) => (itemRefs.current[day.fullDate] = el)}
                className={selectedDate === day.fullDate ? "selected" : ""}
                onClick={() => handleDateClick(day.fullDate)}
              >
                <span className="day-of-week">{day.dayOfWeek}</span>
                <span className="day">
                  {day.day}/{day.dayMonth.split("/")[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ScrollDataPicker;
