'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';

const CreateTask = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [myCourses, setMyCourses] = useState([]);
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
        course: '',
        name: '',
        description: '',
        type: '',
        status: 'in_progress',
        dueDate: new Date().toISOString().split('T')[0],
        file: '',
    });

    const createTask = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/task/new', {
                method: 'POST',
                body: JSON.stringify({
                    userId: session.user.id,
                    course: task.course,
                    name: task.name,
                    description: task.description,
                    type: task.type,
                    status: task.status,
                    dueDate: task.dueDate,
                    file: task.file,
                }),
            });

            if (response.ok) {
                router.push('/');
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <TaskForm data={myCourses} type="Create" task={task} setTask={setTask} submitting={submitting} handleSubmit={createTask} />
    );
};

export default CreateTask;