'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TaskForm from '@/components/CourseForm';

const EditTask = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('id');

    const [submitting, setIsSubmitting] = useState(false);
    const [task, setTask] = useState({
        course: '',
        name: '',
        type: '',
        description: '',
        status: 'not_started',
        dueDate: '',
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
                router.push('/tasks');
            } else {
                console.error('Failed to update the task');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <TaskForm
            task={task}
            setTask={setTask}
            isSubmitting={submitting}
            onSubmit={editTask}
        />
    );
}

export default EditTask;