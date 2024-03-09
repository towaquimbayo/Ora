import { Circle, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function TaskCard({ task, setTasks, setTasksUpdated }) {
  const [taskChecked, setTaskChecked] = useState(task.status === "completed");

  function toggleTaskCheck() {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const index = updatedTasks.findIndex((t) => t.id === task.id);
      updatedTasks[index].status = taskChecked ? "in-progress" : "completed";
      return updatedTasks;
    });
    setTaskChecked((prevTaskChecked) => !prevTaskChecked);
  }

  useEffect(() => {
    setTaskChecked(task.status === "completed");
  }, [task.status]);

  function formatDate(date) {
    const dateFormatted = new Date(date);
    return dateFormatted.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "America/Vancouver",
    });
  }

  return (
    <div
      className="flex border rounded-lg p-4 hover:shadow-md transition duration-300 ease-in-out cursor-pointer w-full"
      onClick={() => {
        toggleTaskCheck();
        setTaskChecked((prevTaskChecked) => !prevTaskChecked);
        setTasksUpdated(true);
      }}
    >
      {taskChecked ? (
        <div className="flex justify-between items-center">
          <CircleCheck size={24} color="#43b65c" />
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <Circle size={24} color="#858585" />
        </div>
      )}
      <div className="flex-col w-full pl-4">
        <div className="flex justify-between">
          <h2 className="text-md font-semibold mb-2 overflow-hidden truncate sm:text-lg">
            {task.title}
          </h2>
          <p className="text-sm pl-4 min-w-fit">{task.course}</p>
        </div>
        <p className="text-sm font-light">
          Due date: {formatDate(task.dueDate)}
        </p>
      </div>
    </div>
  );
}
