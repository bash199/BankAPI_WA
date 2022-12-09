import {Router} from "express";
import {
   getAccountById,
   createAcount,
   withdrawFromAccount,
   depositAccount,
   transfer,
   deleteAccount,
   updateCredit,
} from "../controller/accountsUtils.js";
export const accountRoute = Router();

accountRoute.get("/:id", getAccountById); //√
accountRoute.post("", createAcount); //√
accountRoute.delete("", deleteAccount); //√
// accountRoute.put("/",) //√
accountRoute.put("", (req, res) => {
   switch (req.body.type) {
      case "withdraw":
         withdrawFromAccount(req, res);
         break;
      case "deposit":
         depositAccount(req, res);
         break;
      case "transfer":
         transfer(req, res);
         break;
      case "credit":
         updateCredit(req, res);
         break;
      default:
         res.send(
            "What Action (type) Would You Like To Take (withdraw, deposit, transfer,credit)"
         );
         break;
   }
}); //√
