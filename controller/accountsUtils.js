import {loadData, saveData, paths} from "./utils.js";
import {v4 as uuidv4} from "uuid";
const {dbUsersPath, dbAccountsPath} = paths();

const getAccountById = (req, res) => {
   const data = loadData(dbAccountsPath);
   const found = data.find((account) => {
      return account.id === req.params.id;
   });
   if (found) {
      return res.status(200).json(found);
   }
   return res
      .status(404)
      .send(`error: no account found with id: ${req.params.id}`);
};

const createAcount = (req, res) => {
   if (!req.body.accountOwner) {
      return res
         .status(404)
         .send(
            "No Account was created, please fill in the Body (raw) the necessary Fields,(accountOwner)"
         );
   }
   const data = loadData(dbAccountsPath);
   const users = loadData(dbUsersPath);
   const account = {
      id: uuidv4(),
      cash: req.body.cash || 0,
      credit: req.body.credit || 0,
   };
   const accounts = [...data, account];
   const found = users.some((user) => user.id === req.body.accountOwner);
   if (!found) {
      return res
         .status(404)
         .send(`error: no User found with id: ${req.body.accountOwner}`);
   }
   users.forEach((user) => {
      if (user.id === req.body.accountOwner) {
         user.accounts.push(account.id);
      }
   });
   saveData(dbAccountsPath, accounts);
   saveData(dbUsersPath, users);
   if (req.body.accountOwner) {
      return res.status(201).send(account);
   }
};

const withdrawFromAccount = (req, res) => {
   if (req.body.accountId && req.body.amount > 0) {
      const accounts = loadData(dbAccountsPath);
      const foundAccount = accounts.find(
         (acc) => acc.id === req.body.accountId
      );
      if (!foundAccount) {
         res.status(404).send(
            `error: no account found with id: ${req.body.accountId}`
         );
      }
      const amount = req.body.amount;
      accounts.forEach((account) => {
         if (account.id === req.body.accountId) {
            withdraw(account, amount)
               ? saveData(dbAccountsPath, accounts)
               : res.send("Not Enough credit");
         }
      });
      res.status(200).send(foundAccount);
   } else if (req.body.amount < 0) {
      res.send("Amount must be positive integer!");
   } else {
      res.status(403).send(
         "No Account Found, Please Fill In The Body (raw) The Necessary Fields,(accountId, amount)"
      );
   }
};

const depositAccount = (req, res) => {
   const accounts = loadData(dbAccountsPath);
   const foundAccount = accounts.find((acc) => acc.id === req.body.accountId);
   if (!foundAccount) {
      res.status(404).send(
         `Error: No Account Found with id: ${req.body.accountId}`
      );
   }
   const amount = req.body.amount;
   if (amount > 0) {
      accounts.forEach((account) => {
         if (account.id === req.body.accountId) {
            deposit(account, amount);
         }
      });
      saveData(dbAccountsPath, accounts);
      res.status(200).send(foundAccount);
   } else {
      res.status(403).send("amount must be posistive integer");
   }
};

const transfer = (req, res) => {
   const accounts = loadData(dbAccountsPath);
   const idFrom = req.body.fromAccount;
   const idTo = req.body.toAccount;
   const amount = req.body.amount;
   let bobo;
   let sender = accounts.find((account) => account.id === idFrom);
   let getter = accounts.find((account) => account.id === idTo);
   if (!sender || !getter) {
      if (!sender && getter) {
         return res
            .status(400)
            .send(`Bad Request: "from" wrong id ,with id: ${idFrom}`);
      } else if (!getter && sender) {
         return res
            .status(400)
            .send(`Bad Request: "to" wrong id ,with id: ${idTo}`);
      } else {
         res.status(404).send("Accounts IDs' not Found!");
      }
   }
   accounts.forEach((account) => {
      if (account.id === req.body.fromAccount) {
         withdraw(account, amount) ? null : (bobo = true);
      } else if (account.id === req.body.toAccount) {
         if (!bobo) {
            deposit(account, amount);
         }
      }
   });
   if (bobo) {
      return res
         .status(200)
         .send(`Sender account doesn't have enough cash to transfer `);
   }
   saveData(dbAccountsPath, accounts);
   return res.status(200).send("Transfer has been made successfully");
};

const deleteAccount = (req, res) => {
   const accounts = loadData(dbAccountsPath);
   const foundAccount = accounts.find(
      (account) => account.id === req.body.accountId
   );
   if (!foundAccount) {
      return res
         .status(404)
         .send(`Account  not found with id: ${req.body.accountId}`);
   }

   const filteredAccounts = accounts.filter(
      (account) => account.id !== req.body.accountId
   );
   saveData(dbAccountsPath, filteredAccounts);
   return res.status(200).send(foundAccount);
};

const updateCredit = (req, res) => {
   const accounts = loadData(dbAccountsPath);
   const amount = req.body.credit;
   const accountId = req.body.accountId;
   const foundAccount = accounts.find((account) => account.id === accountId);
   if (foundAccount) {
      accounts.forEach((account) => {
         if (account.id === accountId) {
            account.credit = amount;
         }
      });
      saveData(dbAccountsPath, accounts);
      return res.status(200).send(foundAccount);
   }
   return res.status(404).send("Account id not found");
};

const withdraw = (acc, amount) => {
   const {credit, cash} = acc;
   return cash + credit >= amount ? (acc.cash = cash - amount) : false;
};

const deposit = (acc, amount) => {
   const {cash} = acc;
   return acc ? (acc.cash = cash + amount) : false;
};

export {
   getAccountById,
   createAcount,
   withdrawFromAccount,
   depositAccount,
   transfer,
   deleteAccount,
   updateCredit,
};
