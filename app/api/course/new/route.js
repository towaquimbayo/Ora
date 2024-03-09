import { connectToDB } from "@/utils/database";
import Course from "@/models/course";

export const POST = async (req) => {
    const { userId, name, description, credits, professor, state, breakdown } = await req.json();

    try {
        await connectToDB();

        const newCourse = new Course({
            creator: userId,
            name,
            description,
            credits,
            professor,
            state,
            breakdown,
        });

        await newCourse.save();

        return new Response(JSON.stringify(newCourse), { status: 201 });
    } catch (error) {
        return new Response("Failed to create new course", { status: 500 });
    }
}