import fs from 'fs';

export const getJsonDataFromFile = (fileName, callback) => {
	fs.readFile(`./src/data/${fileName}`, 'utf-8', (err, rawData) => {
		const data = JSON.parse(rawData);
		callback(data);
	});
}

export const saveJsonDataToFile = (fileName, content, callback) => {
	fs.writeFile(`./src/data/${fileName}`, JSON.stringify(content,null, 4), (err) => {
		callback();
	});
}