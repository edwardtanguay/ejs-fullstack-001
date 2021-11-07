import express from 'express';
import * as qfil from '../qtools/qfil.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const router = express.Router();
router.use(express.json());
dotenv.config();

// connection to mongo
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// mongoose schema
const Schema = mongoose.Schema;
const FlashcardSchema = new Schema({
	front: String,
	back: String,
	whenCreated: {
		type: String,
		default: Date.now()
	}
});

// mongoose model
const Flashcard = mongoose.model('Flashcard', FlashcardSchema);
// item
const flashcardData = {
	front: process.env.APP_LOCATION,
	back: 'ok'
};

const flashcard = new Flashcard(flashcardData);
flashcard.save(err => {
	if (err) {
		console.log('error saving: ' + err);
	} else {
		console.log('data saved');
	}
});

mongoose.connection.on('connected', () => {
	console.log('mongoose connected');
});

router.patch('/changeState', (req, res) => {
	const { showImages, password } = req.body;
	if (password === process.env.ADMIN_PASSWORD) {
		qfil.getJsonDataFromFile('siteData.json', (siteData) => {
			siteData.showImages = showImages;
			qfil.saveJsonDataToFile('siteData.json', siteData, () => {
				res.status(200).json({
					message: showImages ? `This site now shows images.` : `This site now hides images.`
				});
			});
		});
	} else {
		res.status(401).json({
			message: `Password was not correct. No settings were changed.`
		});
	}
});

router.get('/flashcards', (req, res) => {
	Flashcard.find({})
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			console.log(err);
		});
});

export default router;