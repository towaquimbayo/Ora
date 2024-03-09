const OpenAI = require("openai");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

class ApiInterface {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_AUTH,
        });
    }

		setupModelDetails(instructions, prompt) {
			const modelDetails = {
				model: 'gpt-3.5-turbo-0125',
				messages: [{"role": "user", "content": `INSTRUCTIONS TO BE FOLLOWED: ${instructions} PROMPT: ${prompt}`}],
				temperature: 0,
				max_tokens: 1024
			};

			return modelDetails;
		}

		async reorderTasks(tasksArray) {
			const instructions = `
			Based on all the information provided for all the tasks,
			weigh each option against each other for all tasks
			pecentageWorth of each task
			dueDate of each task
			
			to determine which task the user should work on next
			
			IMPORTANT: Give back JUST an array of these objects reordered with the tasks reordered, and the tasks order in descending order of importance, 
			the most important task is the very first in the list and 
			the least important is at the very bottom of the array`

			const prompt = JSON.stringify(tasksArray);

			const modelObj = this.setupModelDetails(instructions, prompt)

			try {
				const response = await this.openai.chat.completions.create(modelObj);

				return JSON.parse(response.choices[0].message.content);
			} catch(error) {
				console.error("Error:", error);
			}
		}

    // async generatePromptResponse(instructions, messages) {
    //     try {
    //         const response = await this.openai.chat.completions.create({
    //             model: 'gpt-3.5-turbo-0125',
    //             messages: [{"role": "user", "content": `${instructions} PROMPT: ${messages}`}],
		// 						temperature: 0,
		// 						max_tokens: 10
    //         });
    
    //         return response.choices[0].message.content;
    //     } catch (error) {
    //         console.error("Error:", error);
    //         return null; // or throw error
    //     }
    // }
}

// Example usage
async function main() {
    const apiInterface = new ApiInterface();

		const tasksArray = [
			{
				title: "Lab 3: SQL Queries",
				dueDate: "2023-03-16",
				type: "assignment",
				status: "in-progress",
				course: "COMP 4537",
				percentageWorth: 10
			},
			{
				title: "Assignment 2: Data Structures",
				dueDate: "2023-03-13",
				type: "assignment",
				status: "completed",
				course: "COMP 3760",
				percentageWorth: 15,
			},
			{
				title: "Assignment 4: Ethics Report",
				dueDate: "2023-04-01",
				type: "assignment",
				status: "in-progress",
				course: "LIBS 7102",
				percentageWorth: 10
			},
			{
				title: "Midterm Exam: Object-Oriented Programming",
				dueDate: "2023-04-06",
				type: "exam",
				status: "in-progress",
				course: "COMP 3522",
				percentageWorth: 10
			},
			{
				title: "Quiz 2: Operating Systems",
				dueDate: "2023-03-08",
				type: "quiz",
				status: "in-progress",
				course: "COMP 4736",
				percentageWorth: 2,
			}
			]
			
    const generatedText = await apiInterface.reorderTasks(tasksArray);
    console.log(generatedText);
}

main();