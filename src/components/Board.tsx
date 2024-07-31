import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import { setTasks } from "@/store/actions/taskActons";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks.tasks);

  useEffect(() => {
    dispatch(setTasks());
  }, [dispatch]);

  return (
    <div className="flex justify-around">
      {["To-Do", "In Progress", "Under Review", "Completed"].map((status) => (
        <Column
          key={status}
          status={status}
          tasks={tasks.filter((task: any) => task.status === status)}
        />
      ))}
    </div>
  );
};

export default Board;
