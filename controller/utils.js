import path from "path";
import chalk from "chalk";
import {writeFileSync, readFileSync} from "fs";
import * as url from "url";

const paths = () => {
   const __controllersdirname = url.fileURLToPath(
      new URL(".", import.meta.url)
   );
   const dbUsersPath = path.join(
      path.dirname(__controllersdirname),
      "/db/users.json"
   );
   const dbAccountsPath = path.join(
      path.dirname(__controllersdirname),
      "/db/accounts.json"
   );
   return {dbUsersPath, dbAccountsPath, __controllersdirname};
};

const loadData = (path) => {
   try {
      const dataBuffer = readFileSync(path);
      const data = dataBuffer.toString();
      return JSON.parse(data);
   } catch (error) {
      console.log(error);
      return [];
   }
};

const saveData = (path, data) => {
   const dataJSON = JSON.stringify(data);
   writeFileSync(path, dataJSON);
   return console.log(chalk.bgMagenta("Saved!"));
};

export {loadData, saveData, paths};
