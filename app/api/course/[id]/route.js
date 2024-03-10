import { connectToDB } from "@/utils/database";
import Course from "@/models/course";

// GET (read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const course = await Course.findById(params.id);

        if (!course) return new Response("Course not found", { status: 404 });

        return new Response(JSON.stringify(course), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch the course", { status: 500 });
    }
}

// PATCH (update)
export const PATCH = async (req, { params }) => {
    const { name, description, credits, professor, status, breakdown } = await req.json();

    try {
        await connectToDB();
        const existingCourse = await Course.findById(params.id);

        if (!existingCourse) return new Response("Course not found", { status: 404 });

        existingCourse.name = name;
        existingCourse.description = description;
        existingCourse.credits = credits;
        existingCourse.professor = professor;
        existingCourse.status = status;
        existingCourse.breakdown = breakdown;

        await existingCourse.save();

        return new Response("Successfully updated the course", { status: 200 });
    } catch (error) {
        return new Response("Failed to update the course", { status: 500 });
    }
}