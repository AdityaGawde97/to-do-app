import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Appbar } from "./components/Appbar";
import { AddTask } from "./components/AddTask";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Route, Routes } from "react-router-dom";
import { TaskList } from "./components/TaskList";

export default function App() {
  const name = "Mike";
  return (
    <Provider store={store}>
      <div className="main-container">
        <Appbar name={name} />
        <Routes>
          <Route path="/" element={<AddTask />} />
          <Route path="/:id" element={<AddTask />} />
          <Route path="/list" element={<TaskList />} />
        </Routes>
      </div>
    </Provider>
  );
}
