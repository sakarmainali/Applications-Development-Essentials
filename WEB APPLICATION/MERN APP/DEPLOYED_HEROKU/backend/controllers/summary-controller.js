const fs = require('fs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Summary = require('../models/summary');
const User = require('../models/user');

console.log("triggred");
//Module to get the summary of user by summary id 


//get user
const getSummaries = async (req, res, next) => {
  let summaries;
  try {
    summaries = await Summary.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching summaries failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ summaries: summaries.map(summary => summary.toObject({ getters: true })) });
};


const getSummaryById = async (req, res, next) => {
  const summaryId = req.params.sid;

  let summarybyid;
  try {
    console.log("insidesbyid");
    summarybyid = await Summary.findById(summaryId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a summary.',
      500
    );
    return next(error);
  }

  if (!summarybyid) {
    const error = new HttpError(
      'Could not find summary for the provided id what what',
      404
    );
    return next(error);
  }

  res.json({ summarybyid: summarybyid.toObject({ getters: true }) });
};


//Module to get summary by user id


const getSummaryByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  console.log(userId);
  console.log("This is user");
  let userWithSummary;
  try {
    userWithSummary = await User.findById(userId).populate('summary');
  } catch (err) {
    const error = new HttpError(
      'Fetching summarys failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!userWithSummary || userWithSummary.summary.length === 0) {
    return next(
      new HttpError('Could not find summarys for the provided user id check err.', 404)
    );
  }

  res.json({
    summarys: userWithSummary.summary.map(summary =>
      summary.toObject({ getters: true })
    )
  });
};


//Module to create new summary 

const createSummary = async (req, res, next) => {
 
  const errors = validationResult(req);
  console.log("IMMMMCREATIIINg");
  console.log(req.body);
  
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const {book_description,summary_title,summary_body} = req.body;
  let cover;
  
  try{
    cover=req.file.path;

  }catch{
    cover=String("uploads/images/default.png");

  }
  
  
  const createdSummary = new Summary({
    book_description,
    summary_title,
    summary_body,
    summary_cover: cover ,
    creator_id: req.userData.userId,
  });


  let user;
  try {
    user = await User.findById(req.userData.userId);
    console.log(user);
  } catch (err) {
    const error = new HttpError(
      'Creating... summary failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  //populating summary data both on user and summary

  console.log(user);

  try {
    
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdSummary.save({ session: sess });
    user.summary.push(createdSummary);
    await user.save({ session: sess });
    await sess.commitTransaction();
    
  } catch (err) {
    const error = new HttpError(
      'Creating okay okay dasdasdasd kinakina summary failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ summary: createdSummary });
};

//Updating summary

const updateSummary = async (req, res, next) => {
  console.log("inside patcher");
  console.log(req.body);
  
 /* const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data carefully.', 422)
    );
  }
 */
  

  const {title,description,body} = req.body;
  const summaryId = req.params.sid;

  let summary;
  try {
    summary = await Summary.findById(summaryId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update the summary.',
      500
    );
    return next(error);
  }

  if (summary.creator_id.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to edit this summary.', 401);
    return next(error);
  }

  summary.book_description = description;
  summary.summary_title = title;
  summary.summary_body=body;

  
  try {
    console.log("updating");
    await summary.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update summary.',
      500
    );
    return next(error);
  }

  res.status(200).json({ summary: summary.toObject({ getters: true }) });
  console.log("response send");
};

//deleting summary

const deleteSummary = async (req, res, next) => {

  const summaryId = req.params.sid;
  


  let summary;
  try {
     summary= await Summary.findById(summaryId).populate('creator_id');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete summary.',
      500
    );
    return next(error);
  }
  

  if (!summary) {
    const error = new HttpError('Could not find summary for this id kina kina.', 404);
    return next(error);
  }

  if (summary.creator_id.id !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to delete this summary.',
      401
    );
    return next(error);
  }

  const imagePath = summary.summary_cover;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await summary.remove({ session: sess });
    summary.creator_id.summary.pull(summary);
    await summary.creator_id.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete summary.',
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, err => {
    console.log(err);
  });

  res.status(200).json({ message: 'Deleted summary.' });
};

exports.getSummaries=getSummaries;
exports.getSummaryById = getSummaryById;
exports.getSummaryByUserId = getSummaryByUserId;
exports.createSummary = createSummary;
exports.updateSummary = updateSummary;
exports.deleteSummary = deleteSummary;
