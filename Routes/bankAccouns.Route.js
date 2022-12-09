import {Router} from "express";
import {
   getAccountById,
   createAcount,
   withdrawFromAccount,
   depositAccount,
} from "../controller/accountsUtils.js";
export const accountRoute = Router();

accountRoute.get("/:id", getAccountById); //√
accountRoute.post("", createAcount); //√
accountRoute.put("", (req, res) => {
   switch (req.body.type) {
      case "withdraw":
         withdrawFromAccount(req, res);
         break;
      case "deposit":
         depositAccount(req, res);
         break;
      case "transfer":
         transfer(depositAccount(req, res), withdrawFromAccount(req, res));
      default:
         res.send(
            "What Action (type) Would You Like To Take (withdraw, deposit, transfer)"
         );
         break;
   }
});
// accountRoute.put("",) //account withdraw / deposit } transfer
// accountRoute.patch("",createAcount2)//create new account and push to user
accountRoute.delete("");
