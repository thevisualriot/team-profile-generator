const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    //optional, additional input - office number
    getOfficeNumber() { 
        return this.officeNumber;
    };

    getRole() {
        return 'Manager';
    }
}

module.exports = Manager;