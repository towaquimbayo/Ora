import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { TaskDueDateModal } from "./TaskDateModal";
import { TaskViewModal } from "./TaskViewModal";

export default function CalendarView({ tasksParam }) {

  const [tasks, setTasks] = useState([]);
  const [taskMoved, setTaskMoved] = useState(null);
  const [taskClicked, setTaskClicked] = useState(null);

  useEffect(() => {
    const formattedTasks = tasksParam.map((task) => {
      return {
        id: task._id,
        title: task.name,
        start: new Date(task.dueDate),
        allDay: true,
        backgroundColor: getBackgroundColor(task.status),
        borderColor: getBackgroundColor(task.status),
        textColor: "#ffffff",
      };
    });
    setTasks(formattedTasks);
  }, [tasksParam]);

  const getBackgroundColor = (status) => {
    if (status === "completed") {
      return "#4caf50";
    } else if (status === "in-progress") {
      return "#3573e7";
    }
  };

  const handleEventClick = (info) => {
    console.log("Tasks:", tasks);
    console.log("Event clicked:", info.event.id);
    const task = tasks.find((task) => task.id == info.event.id);
    setTaskClicked(task);
  };

  const handleTaskDateCloseModal = () => {
    const originalTask = tasksParam.find((task) => task._id == taskMoved.id);
    if (originalTask) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) => {
          if (task.id == taskMoved.id) {
            return {
              ...task,
              start: new Date(originalTask.dueDate),
            };
          }
          return task;
        });
        return updatedTasks;
      });
    }
    setTaskMoved(null);
  };

  // @TODO: update the task in the database
  const handleSaveTask = () => {
    console.log("Task saved:", taskMoved);
    setTaskMoved(null);
    window.location.reload();
  };

  //@TODO: make it mobile responsive
  return (
    <div className="flex w-full">
      {taskMoved && (
        <TaskDueDateModal
          tasks={tasks}
          taskMoved={taskMoved}
          handleCloseModal={handleTaskDateCloseModal}
          handleSaveTask={handleSaveTask}
        />
      )}
      {taskClicked && (
        <TaskViewModal
          task={taskClicked}
          handleCloseModal={() => setTaskClicked(null)}
        />
      )}
      <div className="w-full">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          events={tasks}
          eventContent={(eventInfo) => (
            <div>
              <b>{eventInfo.timeText}</b>
              <i>{eventInfo.event.title}</i>
            </div>
          )}
          eventClick={handleEventClick}
          editable={true}
          droppable={true}
          eventDrop={(info) => setTaskMoved(info.event)}
          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
          }}
        />
      </div>
    </div>
  );
}
