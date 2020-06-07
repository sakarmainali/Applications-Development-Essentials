const express = require('express');

const { check } = require('express-validator');

const SummaryControllers = require('../controllers/summary-controller');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', SummaryControllers.getSummaries);

router.get('/:sid', SummaryControllers.getSummaryById);

router.get('/user/:uid', SummaryControllers.getSummaryByUserId);

router.use(checkAuth);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('book_description')
      .not()
      .isEmpty(),
    check('summary_title').isLength({ min:5}),
    check('summary_body')
      .not()
      .isEmpty()
  ],
  SummaryControllers.createSummary
);

router.patch(
  '/:sid',
  [
    check('book_description')
      .not()
      .isEmpty(),
    check('summary_title').isLength({ min: 50})
  ],
  SummaryControllers.updateSummary
);

router.delete('/:sid', SummaryControllers.deleteSummary);

module.exports = router;

