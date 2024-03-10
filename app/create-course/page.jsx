'use client';

import {useState} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import CourseForm from '@/components/CourseForm';

const CreateCourse = () => {
    const router = useRouter();
    const {data: session} = useSession();

    const [submitting, setIsSubmitting] = useState(false);
    const [course, setCourse] = useState({
        name: '',
        description: '',
        credits: 0,
        professor: '',
        status: 'in_progress',
        breakdown: []
    });

    const createCourse = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/course/new', {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user.id,
                    name: course.name,
                    description: course.description,
                    credits: course.credits,
                    professor: course.professor,
                    status: course.status,
                    breakdown: course.breakdown,
                }),
            });

            if (response.ok) {
                router.push('/profile');
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
        <>
            <CourseForm type="Create" course={course} setCourse={setCourse} submitting={submitting} handleSubmit={createCourse}/>
        </>

    );
};

export default CreateCourse;