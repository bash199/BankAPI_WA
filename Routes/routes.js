import {Router} from "express";
import {accountRoute} from "./bankAccouns.Route.js";
import {usersRoute} from "./bankUsers.Route.js";

export const indexRoute = Router();

//localhost:5001/api/action
indexRoute.use("/action", accountRoute);

//localhost:5001/api/users
indexRoute.use("/users", usersRoute);
