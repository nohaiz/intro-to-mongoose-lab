const mongoose = require('mongoose');

const dotenv = require('dotenv').config();

const Customer = require('./models/customer.js');

const prompt = require('prompt-sync')();

let isCallBackFn = false;

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
}

const createCustomer = async () => {
    const customerName = prompt("What is the customer's name: ");
    const customerAge = prompt("What is the customer's age: ");
    if (customerName && customerAge) {
        const customers = [
            {
            name : customerName,
            age: customerAge,
            }
        ]
        try {
            const customer = await Customer.create(customers);
        } catch(error) {
            console.log(error);
        }
    }
    else {
        console.log('Please do not fill in empty details');
    }
    crudSelection();
}

const viewCustomers = async (isCallBackFn) => {

    if (isCallBackFn) {
        console.log('Here are all the customers');
        try {
            const viewCustomer = Customer.find();
            (await viewCustomer).forEach((customer) => {
                console.log(customer.name);
            });
        } catch (error) {
            console.log(error);
        }
    } else if (!isCallBackFn){
        console.log('Here are all the customers');
        try {
            const viewCustomer = Customer.find();
            (await viewCustomer).forEach((customer) => {
                console.log(customer.name);
            });
        } catch (error) {
            console.log(error);
        }
        crudSelection();
    }
    
}

const updateCustomer = async () => {
    isCallBackFn = true;
    await viewCustomers(isCallBackFn);
    const customerName = prompt('Type in the customer name to update their details: ');
    if (customerName) {
        try {
            const findCustomer = await Customer.find({name : customerName});
            console.log(findCustomer);
        } catch (error) {
            console.log(error);
        }
    }
    else {
        console.log('This customer does not exist');
        process.exit();
    }

    const customerId = prompt('Paste in the id of the user u want to update: ');
    const customerNameUpdate = prompt("Update customer's name: ");
    const customerAgeUpdate = prompt("Update customer's age: ");

    if (customerId && customerNameUpdate && customerAgeUpdate) {
        try {
            const updateCustomer = await Customer.findByIdAndUpdate(customerId,
                {name : customerNameUpdate},
                {age: customerAgeUpdate},
            );
        } catch (error) {
            console.log(error);
        }  
    }
    else {
        console.log('Please fill out the information correctly.')
        process.exit();
    }
    crudSelection();
}

const deleteCustomer = async() => {
    isCallBackFn = true;
    await viewCustomers(isCallBackFn);
    const customerName = prompt('Type in the customer name to delete their details: ');
    if (customerName) {
        try {
            const findCustomer = await Customer.find({name : customerName});
            console.log(findCustomer);
        } catch (error) {
            console.log(error);
        }
    }
    else {
        console.log('This customer does not exist');
        process.exit();
    }

    const customerId = prompt('Paste in the id of the user u want to delete: ');
    if (customerId) {
        try {
            const deleteCustomer = await Customer.findByIdAndDelete(customerId);
        } catch (error) {
            console.log(error);
        }
    }
    else {
        console.log('This id does not exist');
        process.exit();
    }
    crudSelection();
}

const crudSelection = async () => {
    console.log('\nWelcome to the CRM \nWhat would you like to do?\n1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. quit');
    const CRUD = prompt('Number of action to run: ')
    connect();
    if (CRUD === '1') {
        await createCustomer();
    }
    else if (CRUD === '2') {
        await viewCustomers();
    }
    else if (CRUD === '3') {
        await updateCustomer();
    }
    else if (CRUD === '4') {
        await deleteCustomer();
    }
    else if (CRUD === '5') {
        process.exit();
    }
}

crudSelection();