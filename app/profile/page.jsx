"use client"

import Accordion from "@/components/Accordion";
import {useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [myCourses, setMyCourses] = useState([]);
    const [myTasks, setMyTasks] = useState([]);
    
    useEffect(() => {
        if (!session && status === "unauthenticated") {
            router.push('/');
        }
    }, [session, status, router]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/courses`);
            const data = await response.json();

            setMyCourses(data);
        }

        if (session?.user.id) fetchCourses();
    }, [session?.user.id]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/tasks`);
            const data = await response.json();

            setMyTasks(data);
        }

        if (session?.user.id) fetchTasks();
    }, [session?.user.id]);
    
    const tasksByCourse = {};

    myTasks.forEach(task => {
        if (!tasksByCourse[task.course]) {
            tasksByCourse[task.course] = [];
        }

        tasksByCourse[task.course].push(task);
    });

    console.log(tasksByCourse);

    return (
        <div className="container w-full mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 lg:mb-4">{session && session.user.name}&apos;s Courses</h1>
            <div className="accordion justify-start">
                {myCourses.map(course => (
                    <Accordion key={course._id} title={course.name} content={tasksByCourse[course._id] || []} id={course._id} />
                ))}
            </div>
        </div>
    );
};

export default Profile;
