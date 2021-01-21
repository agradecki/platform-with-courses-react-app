const express = require('express');
const { patchUser, postUser } = require('../controllers/users');

const router = express.Router();

router.post('/', postUser);
router.patch('/', patchUser);
router.use((request, response) => response.status(404).end());

module.exports = router;