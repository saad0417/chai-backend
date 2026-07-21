import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler( async (req, res) => {
    // 1. get details from Frontend
    // 2. validatoin - email, password more (must not be empty)
    // 3. check if user already exists: username, email
    // 4. check for images, check for avatar (these 2 uses file handling (multer) done in user.routes.js)
    // 5. upload on cloudinary, check avatar
    // 6. create user object - create entry in db
    // 7. remove password and refresh token field from response
    // 8. check for user creation
    // 9. return responese

    // 1. get details from Frontend
    const { fullName, email, username, password } = req.body
    console.log("email:", email);

    // 2. validatoin - email, password more (must not be empty)
    // .some() method checks whether at least one element in an array satisfies a condition.
    if([fullName, email, username, password].some((field) => field?.trim() === ""))
    {
        throw new ApiError(400, "All fields are required!")
    }

    // 3. check if user already exists: username, email
    const existedUser = User.findOne({
        $or: [{ email }, { password }]
    })

    if(existedUser)
    {
        throw new ApiError(409, "User with email and password already exists!")
    }

    // 4. check for images, check for avatar (these 2 uses file handling (multer) done in user.routes.js)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath)
    {
        throw new ApiError(400, "Avatar is required!")
    }

    // 5. upload on cloudinary, check avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar)
    {
        throw new ApiError(409, "Avatar file is required!")
    }

    // 6. create user object - create entry in db
    const user = await User.create(
        {
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "", // here coverImage is optional field in DB you we are optionally checking it like if user hasn't uploded coverImage the DB may crash.
            email,
            password,
            username: username.toLowerCase()
        }
    )

    // 7. remove password and refresh token field from response
    // in .select() method all fields are already selected we have write the fields with '-' to exclude it.
    // So Mongoose internally does something like: User.findById("687d8d1234567890abcdef12");
    const checkUserCrated = await User.findById(user._id).select(
        "-password -refreshTokens"
    )
    
    // 8. check for user creation
    if(!checkUserCrated)
    {
        throw new ApiError(500, "Internal Server Error while registering the user!")
    }

    // 9. return responese
    return res.status(201).json(
        new ApiResponse(200, checkUserCrated, "User registered successfully!")
    )

})

export {registerUser}