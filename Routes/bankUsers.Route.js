import {Router} from "express";
import {getAllUsers, getUser, createUser} from "../controller/usersUtils.js";

export const usersRoute = Router();

usersRoute.get("/", getAllUsers);
usersRoute.get("/:id", getUser);
usersRoute.post("/", createUser);
// usersRoute.patch("/:id",appendAccount)
