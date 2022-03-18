import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdUpdate } from "react-icons/md";
import { removeTask } from "../redux/action";
import { useNavigate } from "react-router-dom";

const mmddyy = (date) => {
  let arr = date.split("/");
  let [dd, mm, yy] = arr;
  return [mm, dd, yy].join("/");
};

const getDateObj = (d) => new Date(mmddyy(d));

export const TaskList = () => {
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const sortedTask = useMemo(() => {
    return tasks.sort((a, b) => getDateObj(b.date) - getDateObj(a.date));
  }, [tasks]);

  const deleteTask = (id) => {
    return () => dispatch(removeTask(id));
  };

  const updateTask = (id) => {
    return () => navigate(`/${id}`);
  };

  return (
    <div className="add-task">
      {sortedTask.map((item, i) => (
        <>
          <div key={item.id} className="task-list-item">
            <div className="d-flex align-items-center">
              <i className={`dot ${item.status}`}></i>
              <span className="text-white flex-grow-1">{item.taskName}</span>
              <MdUpdate
                size={22}
                className="text-white click"
                onClick={updateTask(item.id)}
              />
              <MdDelete
                className="text-white click ms-4"
                size={22}
                onClick={deleteTask(item.id)}
              />
            </div>
            {sortedTask.length - 1 !== i && <div className="divider" />}
          </div>
        </>
      ))}
    </div>
  );
};
