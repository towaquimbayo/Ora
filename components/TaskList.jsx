import { CircleCheck, CircleEllipsis } from "lucide-react";
import TaskCard from "./TaskCard";

export default function TaskList({
  inProgressTasks,
  completedTasks,
  setTasks,
  setTasksUpdated,
}) {
  return (
    <>
      <div className="flex flex-col w-full">
        <span className="flex items-center gap-2 my-4">
          <CircleEllipsis size={20} color="#858585" />
          <p className="text-[#858585]">In Progress</p>
        </span>
        <div className="flex flex-col gap-4 w-full">
          {inProgressTasks.map((task) => (
            <TaskCard
              key={task.title}
              task={task}
              setTasks={setTasks}
              setTasksUpdated={setTasksUpdated}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full mt-4">
        <span className="flex items-center gap-2 my-4">
          <CircleCheck color="#43b65c" size={20} />
          <p className="text-[#43b65c]">Completed</p>
        </span>
        <div className="flex flex-col gap-4 w-full">
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              setTasks={setTasks}
              setTasksUpdated={setTasksUpdated}
            />
          ))}
        </div>
      </div>
    </>
  );
}
