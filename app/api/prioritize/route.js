import axios from 'axios';

export const POST = async (req) => {
    const { unorderedTasks, myCourses } = await req.json();

    const unorderedWithPercentage = unorderedTasks.map((task) => {
        const course = myCourses.find((course) => course._id === task.course);
        const type = course?.breakdown.find((type) => type._id === task.type);

        if (type) {
            return {
                ...task,
                percentageWorth: type.percentage
            };
        } else {
            return {
                ...task,
                percentageWorth: 15
            };
        }
    });

    const unorderedWithPercentageMin = unorderedWithPercentage.map((task) => {
        return {
            _id: task._id,
            dueDate: task.dueDate,
            percentageWorth: task.percentageWorth
        };
    });

    console.log("unorderedWithPercentageMin: ", unorderedWithPercentageMin);

    try {
        const response = await axios.post('https://qds2024-ai-api.vercel.app/reorder-tasks', unorderedWithPercentageMin);

        const data = response.data;

        console.log("data: ", data);

        let orderedTasks;
        if (!orderedTasks) {
            orderedTasks = data.map((task) => {
                return unorderedWithPercentage.find((unorderedTask) => unorderedTask._id === task._id);
            });
        }

        console.log("orderedTasks: ", orderedTasks);

        return new Response(JSON.stringify(orderedTasks), { status: 200 });
    } catch (error) {
        console.error(error);
    }
}