import { connectToDB } from "@/utils/database";
// import Task from "@/models/task";

export async function POST(req) {
  const {userId, tasks} = await req.json();
  try {
    await connectToDB();

    // @TODO: find tasks by userId
    // @TODO: update tasks in db

    const task = null;
    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response("Failed to update tasks", { status: 500 });
  }
}
