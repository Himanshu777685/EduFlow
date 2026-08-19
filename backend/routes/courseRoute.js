import express, { Router } from 'express';
import { CreateCourse, editCourse, freeCourseEnrollment, getCourseById, getCourseByIdForCreator, getCreatorCourse, getPublishedCourse, publishCourse, removeCourse, UnPublishCourse } from '../controller/courseController.js';
import isAuth from '../middleware/isAuth.js';
import upload from '../middleware/multer.js';

const courseRouter = express.Router();

courseRouter.post("/createCourse" , isAuth , upload.single("thumbnail") ,CreateCourse);
courseRouter.get("/getPublishedCourses" , getPublishedCourse);
courseRouter.get("/getCreatorCourse" ,isAuth , getCreatorCourse);
courseRouter.put("/editCourse/:courseId" , isAuth , upload.single("thumbnail") ,  editCourse);
courseRouter.get("/getCourse/:courseId" , getCourseById);
courseRouter.delete("/deleteCourse/:courseId" , isAuth ,removeCourse);
courseRouter.put("/publishCourse/:courseId" , isAuth , publishCourse);
courseRouter.put("/unPublishCourse/:courseId" , isAuth , UnPublishCourse);
courseRouter.get("/getCourseforCreator/:courseId" , isAuth , getCourseByIdForCreator);
courseRouter.put("/:courseId/freeCourseEnrollment", isAuth , freeCourseEnrollment);

export default courseRouter