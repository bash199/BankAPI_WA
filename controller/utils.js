import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import chalk from 'chalk';
import { writeFileSync,readFileSync } from "fs"
import * as url from "url";

const paths =()=> {
    const __controllersdirname = url.fileURLToPath(new URL(".", import.meta.url));
    const dbUsersPath = path.join(path.dirname(__controllersdirname), "/db/users.json");
    const dbAccountsPath = path.join(path.dirname(__controllersdirname), "/db/accounts.json");

    return {dbUsersPath,dbAccountsPath,__controllersdirname}
}

const loadData=(path)=>{
    try{   
    const dataBuffer = readFileSync(path)
    const data = dataBuffer.toString()
    return JSON.parse(data);
    }catch(error){
        console.log(error);
        return [] //maybe message to user?
   }
}


const saveData =(path,data)=>{
    const dataJSON = JSON.stringify(data)
    writeFileSync(path,dataJSON)
    return console.log(chalk.bgMagenta('Saved!'));
}

const {dbUsersPath,dbAccountsPath} = paths()

// const dataa = [{id:"fcd91c75-c746-4eb7-b998-48161e5e3bfb",credit:1000,cash:50}]
// saveData(dbAccountsPath,dataa);

//----------------------------------------------------------------------------------------------!!!!!!!!!!


export  {loadData,saveData,paths}




