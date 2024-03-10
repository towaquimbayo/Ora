"use client"

import Accordion from "@/components/Accordion";
import {useSession} from "next-auth/react";
import { useEffect, useState } from "react";

const Profile = () => {
    const { data: session } = useSession();
    const [myCourses, setMyCourses] = useState([]);
    const [myTasks, setMyTasks] = useState([]);
    //     {
    //         id: 0,
    //         title: "Assignment 2: Data Structures",
    //         dueDate: "2023-03-02",
    //         type: "assignment",
    //         status: "completed",
    //         course: "COMP 3760",
    //     },
    //     {
    //         id: 1,
    //         title: "Lab 3: SQL Queries",
    //         dueDate: "2023-03-26",
    //         type: "assignment",
    //         status: "in-progress",
    //         course: "COMP 4537",
    //     },
    //     {
    //         id: 2,
    //         title: "Assignment 4: Ethics Report",
    //         dueDate: "2023-04-01",
    //         type: "assignment",
    //         status: "in-progress",
    //         course: "LIBS 7102",
    //     },
    //     {
    //         id: 3,
    //         title: "Midterm Exam: Object-Oriented Programming",
    //         dueDate: "2023-04-06",
    //         type: "exam",
    //         status: "in-progress",
    //         course: "COMP 3522",
    //     },
    //     {
    //         id: 4,
    //         title: "Quiz 2: Operating Systems",
    //         dueDate: "2023-04-01",
    //         type: "quiz",
    //         status: "in-progress",
    //         course: "COMP 4736",
    //     },
    //     {
    //         id: 5,
    //         title: "Project Proposal",
    //         dueDate: "2023-03-15",
    //         type: "project",
    //         status: "pending",
    //         course: "COMP 3760",
    //     },
    //     {
    //         id: 6,
    //         title: "Research Paper",
    //         dueDate: "2023-03-30",
    //         type: "assignment",
    //         status: "in-progress",
    //         course: "LIBS 7102",
    //     },
    //     {
    //         id: 7,
    //         title: "Final Exam",
    //         dueDate: "2023-04-20",
    //         type: "exam",
    //         status: "pending",
    //         course: "COMP 3522",
    //     },
    //     {
    //         id: 8,
    //         title: "Midterm Project",
    //         dueDate: "2023-04-10",
    //         type: "project",
    //         status: "in-progress",
    //         course: "COMP 4537",
    //     },
    //     {
    //         id: 9,
    //         title: "Final Project",
    //         dueDate: "2023-04-25",
    //         type: "project",
    //         status: "pending",
    //         course: "COMP 4736",
    //     }
    // ];
    // const accordionData =
    //     [{
    //         title: 'Comp 3981', content: [{
    //             id: 0,
    //             title: "Assignment 2: Data Structures",
    //             dueDate: "2023-03-02",
    //             type: "assignment",
    //             status: "completed",
    //             course: "COMP 3760",
    //         }, {
    //             id: 1,
    //             title: "Lab 3: SQL Queries",
    //             dueDate: "2023-03-26",
    //             type: "assignment",
    //             status: "in-progress",
    //             course: "COMP 4537",
    //         }, {
    //             id: 2,
    //             title: "Assignment 4: Ethics Report",
    //             dueDate: "2023-04-01",
    //             type: "assignment",
    //             status: "in-progress",
    //             course: "LIBS 7102",
    //         }, {
    //             id: 3,
    //             title: "Midterm Exam: Object-Oriented Programming",
    //             dueDate: "2023-04-06",
    //             type: "exam",
    //             status: "in-progress",
    //             course: "COMP 3522",
    //         }, {
    //             id: 4,
    //             title: "Quiz 2: Operating Systems",
    //             dueDate: "2023-04-01",
    //             type: "quiz",
    //             status: "in-progress",
    //             course: "COMP 4736",
    //         }]
    //     }, {
    //         title: 'Comp 999', content: [{
    //             id: 0,
    //             title: "Assignment 2: Data Structures",
    //             dueDate: "2023-03-02",
    //             type: "assignment",
    //             status: "completed",
    //             course: "COMP 3760",
    //         }, {
    //             id: 1,
    //             title: "Lab 3: SQL Queries",
    //             dueDate: "2023-03-26",
    //             type: "assignment",
    //             status: "in-progress",
    //             course: "COMP 4537",
    //         }, {
    //             id: 2,
    //             title: "Assignment 4: Ethics Report",
    //             dueDate: "2023-04-01",
    //             type: "assignment",
    //             status: "in-progress",
    //             course: "LIBS 7102",
    //         }, {
    //             id: 3,
    //             title: "Midterm Exam: Object-Oriented Programming",
    //             dueDate: "2023-04-06",
    //             type: "exam",
    //             status: "in-progress",
    //             course: "COMP 3522",
    //         }, {
    //             id: 4,
    //             title: "Quiz 2: Operating Systems",
    //             dueDate: "2023-04-01",
    //             type: "quiz",
    //             status: "in-progress",
    //             course: "COMP 4736",
    //         }]
    //     }, {
    //         title: 'Comp chillinh', content: [{
    //             id: 0,
    //             title: "Assignment 2: Data Structures",
    //             dueDate: "2023-03-02",
    //             type: "assignment",
    //             status: "completed",
    //             course: "COMP 3760",
    //         }, {
    //             id: 1,
    //             title: "Lab 3: SQL Queries",
    //             dueDate: "2023-03-26",
    //             type: "assignment",
    //             status: "in-progress",
    //             course: "COMP 4537",
    //         }, {
    //             id: 2,
    //             title: "Assignment 4: Ethics Report",
    //             dueDate: "2023-04-01",
    //             type: "assignment",
    //             status: "in-progress",
    //             course: "LIBS 7102",
    //         }, {
    //             id: 3,
    //             title: "Midterm Exam: Object-Oriented Programming",
    //             dueDate: "2023-04-06",
    //             type: "exam",
    //             status: "in-progress",
    //             course: "COMP 3522",
    //         }, {
    //             id: 4,
    //             title: "Quiz 2: Operating Systems",
    //             dueDate: "2023-04-01",
    //             type: "quiz",
    //             status: "in-progress",
    //             course: "COMP 4736",
    //         }],
    //     },];
    
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
