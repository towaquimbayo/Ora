const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
const { getPineconeClient } = require("./pinecone.js");
const { PineconeStore } = require("@langchain/pinecone")
const { OpenAIEmbeddings } = require("@langchain/openai")
const OpenAI = require("openai");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function main() {
	const embeddings = new OpenAIEmbeddings({
		openAIApiKey: process.env.OPENAI_AUTH
	});			

	const pinecone = await getPineconeClient();

	// vectorize and index the entire document for embeddings
	const pineconeIndex = pinecone.Index("qds2024");

	const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
		pineconeIndex,
		namespace: 'lmaowth'
	});

	const message = "What is the title?";

	const results = await vectorStore.similaritySearch(message, 1);

	console.log(results);

	// const openai = new OpenAI({
	// 	apiKey: process.env.OPENAI_AUTH,
	// });

	// const response = await openai.chat.completions.create({
	// 	model: 'gpt-3.5-turbo-0125',
	// 	temperature: 0,
	// 	stream: true,
	// 	messages: [{"role": "user", "content": `message${prompt}`}]
	// })



}

main();

