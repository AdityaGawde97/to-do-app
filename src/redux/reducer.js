const initialState = {
  tasks: [
    {
      id: "7bc7041d-4449-49ca-b824-0d7f9139ae2a",
      taskName: "Develoment Work",
      time: "10:00 AM",
      date: "15/03/2022",
      status: "closed"
    },
    {
      id: "57d97845-e050-403e-99ee-03e49c4acfd4",
      taskName: "Artwork Poster",
      time: "03:30 PM",
      date: "28/02/2022",
      status: "closed"
    },
    {
      id: "cbbd45cf-1ba4-48da-b2b6-819e5034fcdb",
      taskName: "Photoshoot Prep",
      time: "11:30 AM",
      date: "03/02/2022",
      status: "canceled"
    },
    {
      id: "a2cb3b05-1bd4-4ad7-8585-c8396667e827",
      taskName: "Design Homepage",
      time: "05:00 PM",
      date: "08/02/2022",
      status: "canceled"
    }
  ]
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      let tasks = [...state.tasks, action.payload];
      return {
        ...state,
        tasks
      };
    }
    case "REMOVE_TASK": {
      let tasks = state.tasks.filter((task) => task.id !== action.payload);
      return {
        ...state,
        tasks
      };
    }
    case "UPDATE_TASK": {
      let tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task = { ...task, ...action.payload };
        }
        return task;
      });
      return {
        ...state,
        tasks
      };
    }
    default:
      return state;
  }
};
