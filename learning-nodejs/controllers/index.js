const Employee = require('../models/index');

// Read / Show the list of employees
const read = (req, res, next) => {
    Employee.find()
    .then(response => {
        res.json({response})
    })
    .catch(error => {
        res.json({error, message: 'An error occured'})
    })
}

// Get employee by ID
const readById = (req, res, next) => {
    let employeeId = req.body.id;
    Employee.findById(employeeId)
    .then(response => {
        res.json({response})
    })
    .catch(error => {
        res.json({error, message: 'An error occured'})
    })
}

// Add employee
const add = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        designation: req.body.designation,
        age: req.body.age,
    })
    if(req.file) {
        employee.avatar = req.file.path;
    }
    employee.save()
    .then(response => {
        res.json({response, message: 'Employee added successfully!'})
    })
    .catch(error => {
        res.json({error, message: 'An error occured'})
    })
}

// Update employee
const update = (req, res, next) => {
    let employeeId = req.body.id;
    let updateEmployee = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        designation: req.body.designation,
        age: req.body.age,
    }
    if(req.file) {
        updateEmployee.avatar = req.file.path;
    }
    Employee.findByIdAndUpdate(employeeId, {$set: updateEmployee})
    .then(response => {
        res.json({message: 'Employee updated successfully!'})
    })
    .catch(error => {
        res.json({error, message: 'An error occured'})
    })
}

// Delete employee
const destroy = (req, res, next) => {
    let employeeId = req.body.id;
    Employee.findByIdAndRemove(employeeId)
    .then(response => {
        res.json({response, message: 'Employee deleted successfully!'})
    })
    .catch(error => {
        res.json({error, message: 'An error occured'})
    })
}

module.exports = {read, readById, add, update, destroy}