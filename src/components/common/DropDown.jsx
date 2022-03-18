import React, {
  useState,
  useRef,
  Children,
  isValidElement,
  cloneElement
} from "react";
import { BsChevronDown } from "react-icons/bs";

export const DropDownItem = ({ children, onClick, value = children }) => {
  return <li onClick={onClick(value)}>{children}</li>;
};

export const DropDown = ({ children }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef(null);

  const handleItemClick = (value) => () => {
    setValue(value);
  };

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        ref={ref}
        className="task-item mt-1 d-flex align-items-center"
      >
        <span className="flex-grow-1">{value || "Select time"}</span>
        <BsChevronDown />
      </div>

      {show && (
        <div>
          <ul className="dropdown-list">
            {Children.map(children, (child) => {
              if (isValidElement(child))
                return cloneElement(child, { onClick: handleItemClick });
            })}
          </ul>
        </div>
      )}
    </>
  );
};
