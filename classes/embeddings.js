const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
const { getPineconeClient } = require("./pinecone.js");
const { PineconeStore } = require("@langchain/pinecone")
const { OpenAIEmbeddings } = require("@langchain/openai")
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function main() {
    const loader = new PDFLoader("test.pdf");
    const pageLevelDocs = await loader.load();
    const pagesAmt = pageLevelDocs.length;

		const pinecone = await getPineconeClient();

		// vectorize and index the entire document for embeddings
		const pineconeIndex = pinecone.Index("qds2024");

		const embeddings = new OpenAIEmbeddings({
			openAIApiKey: process.env.OPENAI_AUTH
		});

		await PineconeStore.fromDocuments(pageLevelDocs,
			embeddings, 
			{
				pineconeIndex,
				namespace: "lmaowth"
			}
		) 

		console.log("file processed succesfully");

    // console.log(pageLevelDocs);
}

main();

