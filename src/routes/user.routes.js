import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js"
import { storage, upload } from "../middlewares/multer.middleware.js"


const router = Router()

router.route("/register").post(
    upload.fields([  // upload.fields can upload multiple files while upload.single uploads single file to multer.
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

export default router