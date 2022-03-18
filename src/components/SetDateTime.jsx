import { useState } from "react";
import { Modal } from "./common/Modal";
import { MdOutlineMoreTime } from "react-icons/md";
import styled from "styled-components";
import moment from "moment";

const CloseIcon = styled.button`
  background-color: red;
  color: #fff;
  border: none;
  outline: none;
  font-size: 22px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 5px;
  &:hover {
    background-color: darkred;
  }
`;

export const SetDateTime = () => {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState();
  const [date, setDate] = useState(moment().format("MM/DD/YYYY"));
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  console.log(date);
  const setDateAndTime = () => {};
  const handleDate = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  return (
    <div>
      <div
        className="task-item py-2 d-flex align-items-center click"
        onClick={handleOpen}
      >
        <span className="flex-grow-1">Add Time</span>
        <MdOutlineMoreTime
          style={{
            transform: "scaleX(-1)"
          }}
          size={30}
        />
      </div>
      <Modal show={show} onClose={handleClose}>
        <div>
          <input type="time" className="task-item" />
        </div>
        <div className="mt-4">
          <input
            lang="en-us"
            type="date"
            value={date}
            onChange={handleDate}
            className="task-item"
          />
        </div>
        <div className="mt-5 pt-4 d-flex">
          <button className="btn btn-success flex-grow-1">
            Set Date and Time
          </button>
          <CloseIcon onClick={handleClose} className="ms-4">
            X
          </CloseIcon>
        </div>
      </Modal>
    </div>
  );
};
