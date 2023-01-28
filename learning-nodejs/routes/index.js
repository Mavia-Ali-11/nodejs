const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/index');
const upload = require('../middleware/index');

router.get('/', employeeController.read);
router.post('/id', employeeController.readById);
router.post('/add', upload.single('avatar'), employeeController.add);
router.post('/update', upload.single('avatar'), employeeController.update);
router.post('/delete', employeeController.destroy);

module.exports = router;