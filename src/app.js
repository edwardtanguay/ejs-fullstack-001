import express from 'express';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
import * as qfil from './qtools/qfil.js';
import apiRouter from './routes/api.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './public/views'));

app.use('/api', apiRouter);

const staticDirectory = path.join(__dirname, './public');
app.use(express.static(staticDirectory));

qfil.getJsonDataFromFile('siteData.json', (siteData) => {

	siteData.port = process.env.PORT || siteData.localPort;
	siteData.applocation = process.env.APP_LOCATION;
	const backendUrl = siteData.applocation === 'local' ? process.env.BACKEND_URL + ':' + siteData.port : process.env.BACKEND_URL;

	app.get('/', (req, res) => {
		res.render('index',
			{
				...siteData,
				currentPageIdCode: 'home',
				backendUrl,
				message: 'Welcome to the home page.',
			});
	});
	app.get('/books', (req, res) => {
		res.render('books',
			{
				...siteData,
				currentPageIdCode: 'books',
				backendUrl,
				message: "Welcome to books page."
			});
	});
	app.get('/settings', (req, res) => {
		res.render('settings',
			{
				...siteData,
				currentPageIdCode: 'settings',
				backendUrl,
				message: "Welcome to settings page."
			});
	});

	// API
	app.get('/state', (req, res) => {
		res.json({
			test: "111"
		});
	});

	app.listen(siteData.port, () => {
		console.log(`Listening on port http://localhost:${siteData.port}`);
	});
});