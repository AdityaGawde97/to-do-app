import { useEffect, useState } from "react";
import { Modal } from "./common/Modal";
import { MdOutlineMoreTime } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";

const ListItem = ({ children, onClick, value }) => (
  <div
    onClick={() => onClick?.(children)}
    className={value === children ? "selected-btn" : ""}
  >
    {children}
  </div>
);

const List = ({ className, options = [], id, onChange, value }) => {
  return (
    <div className={"task-item time-dropdown " + className}>
      {options.map((item, i) => (
        <ListItem value={value} onClick={onChange} key={`${id}-${i}`}>
          {item}
        </ListItem>
      ))}
    </div>
  );
};

export const SetTime = ({ setTime, value }) => {
  const [openModal, setOpenModal] = useState(false);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [showTimeDropDown, setShowTimeDropDown] = useState(true);

  const getTimeString = () => {
    let time = `${hours}:${minutes} ${period}`;
    return time;
  };

  useEffect(() => {
    if (value) {
      let [hours, minutes, period] = value.split(/:|\s/);
      setHours(hours);
      setMinutes(minutes);
      setPeriod(period);
    }
  }, [value]);

  const handleClose = () => {
    setOpenModal(false);
    setTime(getTimeString());
  };
  const handleOpen = () => setOpenModal(true);

  const addZero = (n) => (+n < 10 ? "0" + n : n);

  let inputProps = {
    type: "text",
    className: "task-item mx-2 time-input",
    maxLength: 2
  };

  const handleHours = (e) => {
    const { value } = e.target;
    if (!isNaN(value) && Number(value) <= 12) setHours(value);
  };

  const handleHoursOnBlur = (e) => {
    if (Number(hours) < 10 && hours.length < 2) setHours((prev) => "0" + prev);
  };
  const handleMinutes = (e) => {
    const { value } = e.target;
    if (!isNaN(value) && Number(value) <= 60) setMinutes(value);
  };

  const handlePeriod = () => {
    setPeriod((prev) => (prev === "AM" ? "PM" : "AM"));
  };

  return (
    <div>
      <div
        className="task-item py-2 d-flex align-items-center click"
        onClick={handleOpen}
        style={{ letterSpacing: "1px" }}
      >
        <span className="flex-grow-1">{value || "Set Time"}</span>
        <MdOutlineMoreTime
          style={{
            transform: "scaleX(-1)"
          }}
          size={30}
        />
      </div>
      <Modal show={openModal} onClose={handleClose}>
        <div className="mt-2 secondary-bg rounded p-3">
          <div className="d-flex align-items-center justify-content-center select-none">
            <input
              {...inputProps}
              value={hours}
              onChange={handleHours}
              onBlur={handleHoursOnBlur}
            />
            <span className="text-white fs-30">:</span>
            <input {...inputProps} value={minutes} onChange={handleMinutes} />
            <button
              className="task-item period-btn ms-2"
              onClick={handlePeriod}
            >
              {period}
            </button>
            <MdAccessTime
              onClick={() => setShowTimeDropDown((prev) => !prev)}
              className={`click ms-3 ${
                showTimeDropDown ? "text-info" : "text-white"
              }`}
              size={35}
            />
          </div>
          {showTimeDropDown && (
            <div className="mt-4 d-flex justify-content-center select-none">
              <List
                id="hours"
                className="mx-2 ms-2 me-3"
                options={new Array(12).fill(1).map((i, j) => addZero(i + j))}
                onChange={(text) => setHours(text)}
                value={hours}
              />

              <List
                id="minute"
                className="mx-2 ms-2"
                options={["00", "15", "30", "45"]}
                onChange={(text) => setMinutes(text)}
                value={minutes}
              />

              <List
                id="period"
                className="me-5 mx-2"
                options={["AM", "PM"]}
                onChange={(text) => setPeriod(text)}
                value={period}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
