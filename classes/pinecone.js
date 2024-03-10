const PineconeClient = require('@pinecone-database/pinecone').Pinecone;

const getPineconeClient = async () => {
  const client = new PineconeClient();

	console.log(getAllFunctions(client));

  // await client.init({
  //   apiKey: process.env.PINECONE_API_KEY,
  //   environment: 'gcp-starter',
  // });

  return client;
};

function getAllFunctions(obj) {
	let functions = [];
	let currentObj = obj;
	
	while (currentObj) {
			functions = functions.concat(
					Object.getOwnPropertyNames(currentObj)
							.filter(property => typeof currentObj[property] === 'function')
			);
			currentObj = Object.getPrototypeOf(currentObj);
	}
	
	return functions;
}

// // Example usage:
// const functions = getAllFunctions(client); // Assuming client is your object
// console.log(functions);

module.exports = {
  getPineconeClient
};
