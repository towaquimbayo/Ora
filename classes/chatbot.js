const OpenAI = require("openai");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

class Chatbot {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_AUTH,
        });
    }

		setupModelDetails(instructions, prompt) {
			const modelDetails = {
				model: 'gpt-3.5-turbo-0125',
				messages: [{"role": "user", "content": `INSTRUCTIONS TO BE FOLLOWED: ${instructions} PROMPT: ${prompt}`}],
				temperature: 0.5,
				max_tokens: 1024
			};

			return modelDetails;
		}

		async sendMessage(previousHistory, pdfContent, newMessage) {
			const instructions = `
			INSTRUCTIONS: 
			This is a chatbot implementation providing data being talked about and previous chat messages as context.

			DATA being asked about:
			${pdfContent}

			Following is the previous chat history arranged in order, use this as context

			${JSON.stringify(previousHistory)}
			
			IMPORTANT: Utilize the chat history as context and answer prompt question regarding DATA,
			and reply as if you are the chatbot in the conversation array continuing the conversation by replying to the new prompt`

			const prompt = newMessage;

			const modelObj = this.setupModelDetails(instructions, prompt)

			try {
				const response = await this.openai.chat.completions.create(modelObj);
				return response.choices[0].message.content;
			} catch(error) {
				console.error("Error:", error);
			}
		}
}

// Example usage
async function main() {
	const chatbot = new Chatbot();


	const previousHistory = [{"from": "Sarah", "text": "Hey, guess what? I found something incredible today!"},
	{"from": "ChatGPT", "text": "What did you find? Tell me all about it!"},
	{"from": "Sarah", "text": "I was exploring my grandmother's attic, and I stumbled upon this old, weathered notebook."},
	{"from": "ChatGPT", "text": "That sounds intriguing! What's inside the notebook?"},
	{"from": "Sarah", "text": "It's filled with the handwritten musings of a young girl named Emily, from many decades ago."},
	{"from": "ChatGPT", "text": "Wow, that's like discovering a piece of history! What did Emily write about?"},
	{"from": "Sarah", "text": "Her writings are so vivid, like she's painting pictures with her words. She talks about her adventures, dreams, and the challenges she faced."},
	{"from": "ChatGPT", "text": "It must be fascinating to read about someone else's life from a different era. Have you found anything particularly interesting in the notebook?"},
	{"from": "Sarah", "text": "Yes, there are pressed flowers, sketches, and even heartfelt poems tucked between the pages. It's like Emily's world comes alive through these little treasures."},
	{"from": "ChatGPT", "text": "It sounds like you've stumbled upon a hidden gem! What are you planning to do with the notebook?"},
	{"from": "Sarah", "text": "I want to uncover more about Emily's life, maybe even share her story with others. Her words have already inspired me in ways I never expected."},
	{"from": "ChatGPT", "text": "That's wonderful! It's amazing how the past can sometimes guide us in the present. Let me know if you need any help uncovering more about Emily's story!"}]

	const pdfContent = `Title: The Forgotten Notebook In the cluttered attic of an old 
	Victorian house, among forgotten treasures and dust-covered relics, 
	lay a weathered notebook. Its once vibrant cover had faded with time, 
	its pages yellowed and brittle. 
	It had been tucked away, hidden from the world, awaiting discovery. 
	One rainy afternoon, Sarah stumbled upon the forgotten notebook while 
	exploring the attic of her grandmother's house. She brushed off the 
	dust and opened it, curious about its contents. Inside, she found the 
	handwritten musings of a young girl named Emily, penned many decades 
	ago. As Sarah read through the entries, she was transported to another 
	time. Emily's words painted vivid pictures of her adventures, dreams, 
	and aspirations. She wrote of exploring the nearby woods, chasing 
	fireflies on summer evenings, and dreaming of faraway lands. But 
	amidst the tales of innocence and wonder, there was a sense of longing 
	in Emily's words. 
	She wrote of unfulfilled dreams, lost friendships, and the passage of 
	time. Sarah couldn't help but feel a connection to this girl from the 
	past, as if she were peering into her own soul. Determined to uncover 
	the mystery of Emily's life, Sarah delved deeper into the notebook. 
	She discovered pressed flowers tucked between the pages, their colors 
	still vibrant after all these years. She found sketches of imaginary 
	worlds, doodles of whimsical creatures, and heartfelt poems written in 
	the margins. As Sarah read on, she uncovered the story of a girl who 
	dared to dream in a world that often seemed gray and mundane. Emily's 
	words resonated with her own struggles and desires, reminding her that 
	even in the darkest of times, there is always hope. In the final pages
	of the notebook, Sarah found a letter addressed to future readers. In 
	it, Emily expressed her hope that whoever found her words would find 
	solace, inspiration, and courage to pursue their own dreams.
	Tears welled up in Sarah's eyes as she closed the notebook, feeling a 
	deep sense of gratitude for stumbling upon this forgotten treasure. In 
	Emily's words, she found not only a glimpse into the past but also a 
	guiding light for her own journey ahead. With the notebook tucked 
	under her arm, Sarah descended from the attic, ready to face whatever 
	challenges lay ahead. For in the words of a long-forgotten girl, she 
	found the strength to believe in herself and the power of her own 
	dreams.`


	const generatedText = await chatbot.sendMessage(previousHistory, pdfContent, "Does Emily get in trouble for following the past?");
	console.log(generatedText);
}

main();