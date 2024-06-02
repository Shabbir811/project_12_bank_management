import { randomInt } from "crypto";


//-----------------------------------------------------------------------------------------------------------------------------------

//create interface for class of bank account  
export interface Bank_account {
    accountNumber: number;
    currentBalance: number;

    withdrawl(amount: number): void;
    deposit(amount: number): void;
    veiwBalance():void;

}
//----------------------------------------------------------------------------------------------------------------------------
// create bank accounts class through interface
export class Bank_account implements Bank_account {
    accountNumber: number;
    currentBalance: number;

    constructor(account_number:number,balance:number){
        this.accountNumber = account_number
        this.currentBalance = balance;
    }
    // debit method
    withdrawl(amount: number): void {
        if (amount <= this.currentBalance) {
            this.currentBalance -= amount;
            console.log(`\tdear customer you successfully withdrawal $${amount}\n`);

            console.log(`\tyour remaining account balance is $${this.currentBalance}\n`);

        } else {
            console.log(`\tdear customer you have insufficent account balance for withdrawal\n`);
            console.log(`\tyour current balance is $${this.currentBalance}\n`);
        }
    }
    // credit method
    deposit(amount: number): void {
        if (amount <= 100) {
            this.currentBalance += amount;
            console.log(`\tdear customer you successfully deposit $${amount}\n`);

            console.log(`\tnow your current account balance is $${this.currentBalance}\n`);

        } else {
            this.currentBalance += (amount - 1)
            console.log(`\tdear customer you successfully deposit $${amount}\n`);
            console.log(`\tyour current balance is $${this.currentBalance} $1 tax charged\n`);
        }

    }
    // cheack balance method
    veiwBalance(): void {
        console.log(`\tyour current balance is $${this.currentBalance}\n`);

    }

    


}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// create customer class
class Customer {
    first_name : string;
    last_name : string;
    private age : number ;
    gender : string;
    private _mobile_number:number ;
    bank_account:Bank_account 

    constructor( firstName: string,  lastName: string ,age : number,  gender: string ,mobile_number:number, account:Bank_account) {
        this.first_name = firstName;
        this.last_name = lastName;
        this.gender = gender;
        this.age = age;
        this._mobile_number = mobile_number
        this.bank_account = account

    }


    // show all customer details through this method
    veiwCustomerDetail() {
        console.log(`\n\t\t\t Account deatils of bank's customer\n\n\t\t\t${"-".repeat(40)}\n`);

        console.log(`\t\t\tfullname:                   ${this.first_name} ${this.last_name}`);
        console.log(`\t\t\tage:                        ${this.age}`);
        console.log(`\t\t\tgender:                     ${this.gender}`);
        console.log(`\t\t\tmobile detail:              ${this._mobile_number}`);
        console.log(`\t\t\tbank account number:        ${this.bank_account.accountNumber}`);
        console.log(`\t\t\tbank account balance:       $${this.bank_account.currentBalance}\n`);
        
    }
}

//=============================================================================================================================================================

export class create_customer{
    random_accountNumber;
    customers:Customer[];

    constructor(){

        this.random_accountNumber = randomInt(1001,1999)  //create random number for customer's bank account number
        this.customers = [] // in this customers array we store customer
    }

    // in this method we add a new customer in the customer array
    add_newCustomer(firstName:string,lastName:string,age:number,gender:string,mobileNumber:number,balance:number){
        let customer = new Customer(firstName,lastName,age,gender,mobileNumber,new Bank_account(this.random_accountNumber++,balance)) //create a customer through Customer class store in a variable
        this.customers.push(customer) // and push customer in customers array
        console.log(`\tyou sucessfully create a bank account\n\n \t${customer.first_name}: your account number is ${customer.bank_account.accountNumber}`);

        
    }
    
    // this method showing all details of selected customer 
    veiwDetails(accountNum:number){
        let customer = this.customers.find(customer => customer.bank_account.accountNumber === accountNum)  // find customer through account number 
        if(customer){
           customer.veiwCustomerDetail()
        }else{
            console.log(`\t\t\tplese enter correct account number\n`);
            
        }
       
    }
}
