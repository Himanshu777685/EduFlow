import express from 'express'
import isAuth from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'
import { createLecture, deleteLecture, getLectureById, getLectures, publishLecture, unpublishLecture, updateLecture } from '../controller/lectureController.js'

const lectureRouter = express.Router()

lectureRouter.post("/create-lecture/:courseId",
    isAuth,
    upload.fields([{
        name: "video",
        maxCount: 1
    },
    {
        name: "resources",
        maxCount: 5
    }
    ]),
    createLecture
)

lectureRouter.get("/educator/:courseId/lectures",
    isAuth,
    getLectures
)

lectureRouter.get("/educator/lecture/:lectureId",
    isAuth,
    getLectureById
)

lectureRouter.put("/updateLecture/:lectureId",
    isAuth,
    upload.fields([{
        name: "video",
        maxCount: 1
    },
    {
        name: "resources",
        maxCount: 5
    }]),
    updateLecture
)

lectureRouter.delete("/deleteLecture/:lectureId" ,
    isAuth,
    deleteLecture
)

lectureRouter.put("/publishLecture/:lectureId", 
    isAuth,
    publishLecture
)

lectureRouter.put("/unpublishLecture/:lectureId", 
    isAuth,
    unpublishLecture
)



export default lectureRouter