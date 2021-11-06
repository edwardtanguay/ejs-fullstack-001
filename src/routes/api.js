import express from 'express';
import * as qfil from '../qtools/qfil.js';

const router = express.Router();
router.use(express.json());

router.patch('/changeState', (req, res) => {
	const { showImages, password } = req.body;
	if (password === 'pass123') {
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

export default router;