const express = require('express');

const coursesController = require('../controllers/courses');

const router = express.Router();

router.get('/:id', coursesController.getCourse);
router.get('/', coursesController.getCourses);
router.post('/', coursesController.postCourse);
router.put('/', coursesController.putCourse);
router.delete('/:id', coursesController.deleteCourse);
router.use((request, response) => response.status(404).end());

module.exports = router;