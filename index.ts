#! /usr/bin/env node

import inquirer from "inquirer";
import { Bank_account, create_customer } from "./my_classes.js";


// create an empty array of account which type Bank account
let account : Bank_account[] =[];
// assign values through for loop
for (let i=1; i<4; i++){
    let acc = new Bank_account((i),500*i*3)
    account.push(acc)
}


// ========================================================================================================================================================
//manually create customers
console.log("_".repeat(80));
console.log(`\t\t\t### Default accounts ###`);
let customers = new create_customer()
customers.add_newCustomer("Salman","Khan",52,"Male",3219876543,account[0].currentBalance)
console.log(`\n\n`);
customers.add_newCustomer("Faisal","Qurashi",41,"Male",3129876543,account[1].currentBalance)
console.log(`\n\n`);
customers.add_newCustomer("Maya","Ali",32,"Female",3279876543,account[2].currentBalance)
console.log("_".repeat(80));
// ========================================================================================================================================================

// implements functionality to our bank program
async function BANK() {
    console.log(`\t\t\t\t<<<<- welcome to my bank ltd ->>>>\n`.toUpperCase());
    while(true){
        let menu = [
            "create a new account",
            "existing accounts",
            "veiw accounts details",
            "exit the program"
        ]
        // use inquirer for asking questions 
        let UserInput = await inquirer.prompt([
            {
                name:"menu",
                type:"list",
                message:"\t\tWhat would you want to do?\n",
                choices:menu
            }
        ])
        if(UserInput.menu === menu[0]){ 
        
            UserInput = await inquirer.prompt([
                {
                    name:"fname",
                    type:"input",
                    message:"\tEnter your first name \n",
                    validate: (value)=>{

                        if(value === ""||!isNaN(value)){
                            console.log(`\t\t\tEnter a vaild name\n`);  
                        }else{
                            return true
                        }
                    }
                },
                {
                    name:"lname",
                    type:"input",
                    message:"\t\tEnter your last name \n",
                    validate: (value)=>{
                        if(value === ""||!isNaN(value)){
                            console.log(`\t\t\tEnter a vaild name\n`); 
                        }else{
                            return true
                        }
                    }
                },
                {
                    name:"age",
                    type:"number",
                    message:"\t\tEnter your age \n",
                    default: 18
                   
                },
                {
                    name:"gender",
                    type:"list",
                    message:"\t\tSelect your gender \n",
                    choices:["Male","Female","Other"],
                   
                },
                {
                    name:"mobile",
                    type:"number",
                    message:"\t\tEnter your mobile number \n",
                    default: 3090078610
                   
                },
                {
                    name:"balance",
                    type:"number",
                    message:"\t\tEnter ammount to deposit to the new account?\n",
                    default: 1000
                   
                }
            ])
            customers.add_newCustomer(UserInput.fname,UserInput.lname,UserInput.age,UserInput.gender,UserInput.mobile,UserInput.balance)
            
            UserInput = await inquirer.prompt([
                {
                    name:"account_number",
                    type:"number",
                    message: "enter your account number ",
                }
            ]) 
            customers.veiwDetails(UserInput.account_number)
            
            
        
        }else if(UserInput.menu === menu[1]){
            let userInput = await inquirer.prompt([
                {
                    name:"account_number",
                    type:"number",
                    message: "enter your account number ",
                    
                },
               
            ])
            
            let customer = customers.customers.find(customer => customer.bank_account.accountNumber === userInput.account_number)
            if(customer){
                console.log(`\n\t\t\twel-come ${customer.first_name} ${customer.last_name}\n`);
                let options = ["deposit","withdrawl","veiw_balance", "show all details","back to the previous page"]

                while (true){
                    userInput = await inquirer.prompt([
                        {
                            name:"option",
                            type:"list",
                            message:"What would you like to do?",
                            choices: options
                        }
                    ])
                    if(userInput.option === options[0]){
                        userInput =  await inquirer.prompt([
                            {
                                name:"amount",
                                type:"number",
                                message:"enter amount to deposit"
                            }
             
                        ])
                        customer.bank_account.deposit(userInput.amount)
                    }else if(userInput.option === options[1]){
                        userInput =  await inquirer.prompt([
                            {
                                name:"amount",
                                type:"number",
                                message:"enter amount to withdrawl"
                            }
             
                        ])
                        customer.bank_account.withdrawl(userInput.amount)
             
                    }else if(userInput.option === options[2]){
                        
                        customer.bank_account.veiwBalance()
             
                    }else if(userInput.option === options[3]){
                        
                        customer.veiwCustomerDetail()
                    }else if(userInput.option === options[4]){
                        
                        console.log(`\t\t\t\t<<<`.toUpperCase());
                        break;
                    }
                }
            }else{

                console.log(`\t\t\tplease enter correct account number\n`.toUpperCase());
            }
        }else if(UserInput.menu === menu[2]){
            UserInput = await inquirer.prompt([
                {
                    name:"account_number",
                    type:"number",
                    message: "enter your account number ",
                }
            ]) 

            customers.veiwDetails(UserInput.account_number)
        }else if(UserInput.menu === menu[3]){
            console.log(`\t\t\t\tthank you for using my bank app`.toUpperCase());
                    
                    setTimeout(()=>{
                        console.log(`>>> exit:done...`);
                    },2000)
                    break;
        }
        
    }
}


BANK()




































