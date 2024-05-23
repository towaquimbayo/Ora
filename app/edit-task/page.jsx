'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import ChatBot from "@/components/Chatbot";

const EditTask = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();

    const taskId = searchParams.get('id');
    const [myCourses, setMyCourses] = useState([]);

    useEffect(() => {
        console.log(session)
        if (!session && status === "unauthenticated") {
            router.push('/');
        }
    }, [session, status, router]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/courses`);
            const data = await response.json();

            setMyCourses(data);
        };

        if (session?.user.id) fetchCourses();
    }, [session?.user.id]);

    const [submitting, setIsSubmitting] = useState(false);
    const [task, setTask] = useState({
        course: null,
        name: '',
        type: null,
        description: '',
        status: 'not_started',
        dueDate: new Date().toISOString().split('T')[0],
        file: '',
    });

    useEffect(() => {
        const getTaskDetails = async () => {
            try {
                const response = await fetch(`/api/task/${taskId}`);
                const data = await response.json();

                setTask({
                    course: data.course,
                    name: data.name,
                    type: data.type,
                    description: data.description,
                    status: data.status,
                    dueDate: data.dueDate,
                    file: data.file,
                });
            } catch (error) {
                console.log(error);
            }
        };

        if (taskId) getTaskDetails();
    }, [taskId]);

    const editTask = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/task/${taskId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    course: task.course,
                    name: task.name,
                    type: task.type,
                    description: task.description,
                    status: task.status,
                    dueDate: task.dueDate,
                    file: task.file,
                }),
            });

            if (response.ok) {
                router.push('/');
            } else {
                router.push('/edit-task?id=' + taskId)
                console.error('Failed to update the task');
            }
        } catch (error) {
            router.push('/edit-task?id=' + taskId)
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (

        <div className="w-full">
            <div className="flex flex-col-reverse sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
                <div className="sm:w-1/2">
                    <TaskForm
                        data={myCourses}
                        type="Edit"
                        task={task}
                        setTask={setTask}
                        isSubmitting={submitting}
                        onSubmit={editTask}
                    />
                </div>
                <div className="sm:w-1/2">
                    <ChatBot/>
                </div>
            </div>
        </div>
    );
}

export default EditTask;