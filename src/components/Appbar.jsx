import { MdApps } from "react-icons/md";
import { BsListUl } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const Appbar = ({ name }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const total = useSelector((state) => state.tasks.length);

  return (
    <header className="d-flex align-items-center">
      <div className="flex-grow-1">
        <MdApps color="#fff" size={40} />
        <span className="text-white ms-2">{name}</span>
      </div>
      {!pathname.includes("list") ? (
        <div className="click text-white" onClick={() => navigate("/list")}>
          <BsListUl size={40} />
          {total !== 0 && <span className="badge rounded-circle">{total}</span>}
        </div>
      ) : (
        <div className="click text-white" onClick={() => navigate("/")}>
          <TiArrowBack color="crimson" size={30} />
          <FiClock size={40} />
        </div>
      )}
    </header>
  );
};
