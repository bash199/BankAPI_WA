import { Router } from "express";
import { accountRoute } from "./bankAccouns.Route.js";
import { usersRoute } from "./bankUsers.Route.js";


`/accounts[
   //account{
       passportid: 1234
       cash:0
        credit:1000$
   }`
   



export const indexRoute = Router();

//localhost:8000/api/accounts
indexRoute.use('/accounts', accountRoute);

//localhost:8000/api/users
indexRoute.use('/users', usersRoute);

`/users[
    //user{
        passportid: 1234
        first name: Omer
        last name: Tarif
        acoounts:[#account id,#account id]
    }`

    //? UPDATE user? -----
    // function transfer()
    // function withdraw()
    // function deposit()
    // function checkCash()
    // function checkCredit()
    // function checkAccounts()

    // --------
    // function loadUsers()
    // function loadAccounts()
    // function saveAccounts()
    // function saveUsers();