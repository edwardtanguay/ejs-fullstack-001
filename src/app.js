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

	const port = process.env.PORT || siteData.localPort;
	const backendUrl = process.env.BACKEND_URL;

	app.get('/info', (req, res) => {
		res.render('info',
			{
				...siteData,
				port,
				backendUrl,
				message: "Welcome to info page."
			});
	});
	app.get('/settings', (req, res) => {
		res.render('settings',
			{
				...siteData,
				port,
				backendUrl,
				message: "Welcome to settings page."
			});
	});
	app.get('/', (req, res) => {
		res.render('index',
			{
				...siteData,
				port,
				backendUrl,
				message: 'Welcome to the home page.',
			});
	});

	// API
	app.get('/state', (req, res) => {
		res.json({
			test: "111"
		});
	});

	app.listen(port, () => {
		console.log(`Listening on port http://localhost:${port}`);
	});
});