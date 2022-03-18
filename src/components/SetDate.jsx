import { useEffect, useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import "../assets/css/overirdeDatePicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Modal } from "./common/Modal";
export const SetDate = ({ setDate, value }) => {
  const d = new Date();
  const defaultValue = {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate()
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (value) {
      let [d, m, y] = value.split("/");
      setSelectedDay({ day: +d, month: +m, year: +y });
    }
  }, [value]);

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpen = () => setOpenModal(true);

  const getDateString = (date) => {
    const { day, month, year } = date;
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div
        className="task-item py-2 d-flex align-items-center click"
        onClick={handleOpen}
        style={{ letterSpacing: "1px" }}
      >
        <span className="flex-grow-1">{value || "Set Date"}</span>
        <FaRegCalendarAlt size={25} />
      </div>
      <Modal show={openModal} onClose={handleClose}>
        <Calendar
          value={selectedDay}
          onChange={(date) => {
            console.log(date);
            setSelectedDay(date);
            setDate(getDateString(date));
            handleClose(date);
          }}
          colorPrimary="#00b442"
          calendarClassName="custom-calendar"
          calendarTodayClassName="custom-today-day"
          minimumDate={utils().getToday()}
        />
      </Modal>
    </div>
  );
};
