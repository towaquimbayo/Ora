"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Calendar, ListTodo } from "lucide-react";
import TaskListView from "@/components/TaskListView";
import CalendarView from "@/components/CalendarView";

export default function Home() {
  const { data: session, status } = useSession();

  const [myTasks, setMyTasks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/tasks`);
      const data = await response.json();
      setMyTasks(data);
      setIsFetching(false);
    };

    if (session?.user.id) fetchTasks();
  }, [session?.user.id]);

  const [calendarView, setCalendarView] = useState(false);

  if (!session && status === "unauthenticated") {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-10">
        <h1 className="text-4xl font-bold mb-20">
          Please Sign in to Get Started!
        </h1>
        <Image
          src="./assets/images/student_studying.svg"
          alt="Sign in"
          width={600}
          height={600}
          layout="contain"
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center mb-20">
      <div className="flex flex-col mb-8 justify-between sm:flex-row sm:mb-4">
        <h1 className="text-4xl font-bold mb-4">My Tasks</h1>
        {myTasks.length > 0 && (
          <button
            className="max-w-fit max-h-12 gap-2 items-center text-md bg-[#3573e7] text-white rounded-md px-4 py-2 hover:opacity-80 transition duration-300 ease-in-out hidden md:flex"
            onClick={() => setCalendarView((prev) => !prev)}
          >
            {calendarView ? (
              <>
                <ListTodo size={20} color="white" />
                List View
              </>
            ) : (
              <>
                <Calendar size={20} color="white" />
                Calendar View
              </>
            )}
          </button>
        )}
      </div>
      {isFetching ? null : myTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-3xl font-semibold my-4">Hmm... No Tasks Found</h1>
          <p className="mb-12">Please create a task to get started!</p>
          <Image
            src="./assets/images/no_results_found.svg"
            alt="Empty"
            width={400}
            height={400}
            layout="contain"
          />
        </div>
      ) : calendarView ? (
        <CalendarView tasksParam={myTasks} />
      ) : (
        <TaskListView tasks={myTasks} setTasks={setMyTasks} />
      )}
    </div>
  );
}
