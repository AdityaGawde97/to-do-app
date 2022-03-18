import { useEffect, useState } from "react";
import { SetDate } from "./SetDate";
import { SetTime } from "./SetTime";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../redux/action";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

export const AddTask = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [taskName, setTaskName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isUpdate, setUpdate] = useState(false);

  useEffect(() => {
    if (id) {
      const task = tasks?.find((item) => item.id === id);
      if (task.id) {
        setTaskName(task.taskName);
        setDate(task.date);
        setTime(task.time);
        setUpdate(true);
      }
    }
  }, [id, tasks]);

  const clearFields = () => {
    setDate("");
    setTime("");
    setTaskName("");
  };

  const addTheTask = () => {
    const taskData = {
      id: uuidv4(),
      taskName,
      time,
      date,
      status: "coming-soon"
    };
    dispatch(addTask(taskData));
    clearFields();
  };

  const updateTheTask = () => {
    const taskData = {
      id,
      taskName,
      time,
      date,
      status: "coming-soon"
    };
    dispatch(updateTask(taskData));
    clearFields();
    setUpdate(false);
    navigate("/");
  };

  return (
    <div className="add-task">
      <div className="mt-4">
        <input
          type="text"
          className="task-item"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Type task name"
        />
      </div>

      <div className="mt-4">
        <SetTime value={time} setTime={setTime} />
      </div>
      <div className="mt-4">
        <SetDate value={date} setDate={setDate} />
      </div>

      <div className="mt-5">
        <button
          disabled={!taskName || !time || !date}
          onClick={isUpdate ? updateTheTask : addTheTask}
          className="btn btn-success w-100"
        >
          {isUpdate ? "Update Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
};
