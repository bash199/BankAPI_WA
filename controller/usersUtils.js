import {loadData, saveData, paths} from "./utils.js";
import {v4 as uuidv4} from "uuid";
const {dbUsersPath} = paths();

const getAllUsers = (req, res) => {
   try {
      res.status(200).send(loadData(dbUsersPath));
   } catch (error) {
      res.status(404).send("Not Found :" + error);
   }
};

const getUser = (req, res) => {
   try {
      const data = loadData(dbUsersPath);
      const user = data.find((user) => user.id === req.params.id);
      if (user) return res.status(200).send(user);
      res.status(404).send(`User Not Found With Id: "${req.params.id}"`);
   } catch (error) {
      res.status(404).send(error);
   }
};

const createUser = (req, res) => {
   const data = loadData(dbUsersPath);
   const user = {id: uuidv4(), ...req.body, accounts: []};
   const users = [...data, user];
   if (req.body.name && req.body.lastName) {
      res.status(201).send(user);
      saveData(dbUsersPath, users);
      return
   }
   res.status(404).send(
      "No User was created, please fill in the Body (raw) the necessary Fields,(name & lastName) "
   );
};

export {getAllUsers, getUser, createUser};
