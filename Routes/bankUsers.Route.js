import { Router } from 'express';
import usersUtils from "../controller/usersUtils.js"
export const usersRoute = Router()

const {getAllUsers,getUser,createUser}= usersUtils

usersRoute.get("/",getAllUsers)
usersRoute.get("/:id",getUser)
usersRoute.post("/",createUser)
