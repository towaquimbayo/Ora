'use client';

import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import CourseForm from '@/components/CourseForm';

const EditCourse = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get('id');

    const [submitting, setIsSubmitting] = useState(false);
    const [course, setCourse] = useState({
        name: '',
        description: '',
        credits: 0,
        professor: '',
        status: 'in_progress',
        breakdown: []
    });

    useEffect(() => {
        const getCourseDetails = async () => {
            try {
                const response = await fetch(`/api/course/${courseId}`);
                const data = await response.json();

                setCourse({
                    name: data.name,
                    description: data.description,
                    credits: data.credits,
                    professor: data.professor,
                    status: data.status,
                    breakdown: data.breakdown,
                });
            } catch (error) {
                console.log(error);
            }
        };

        if (courseId) getCourseDetails();
    }, [courseId]);

    const editCourse = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/course/${courseId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    name: course.name,
                    description: course.description,
                    credits: course.credits,
                    professor: course.professor,
                    status: course.status,
                    breakdown: course.breakdown,
                }),
            });

            if (response.ok) {
                router.push('/');
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (

        <>
            <CourseForm type="Edit" course={course} setCourse={setCourse} submitting={submitting}
                        handleSubmit={editCourse}/>
        </>
    );
}

export default EditCourse;