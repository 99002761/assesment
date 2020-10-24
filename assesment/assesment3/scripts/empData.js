 
let employee = function(id, name, address) {
    this.empId = id;
    this.empName = name;
    this.empAddress = address;
}

let empManager = function() {
    this.empData = []; 

    this.addEmployee = function(emp) {
        this.empData.push(emp);
        
    }

    this.deleteEmployee = function(id) {
        let emp = this.empData.find(function(e) {
            return e.empId == id
        });
        let index = this.empData.indexOf(emp);
        this.empData.splice(index, 1);
        alert("User deleted successfully from the database");
    }

    this.findEmployee = function(id) {
        let emp = this.empData.find(function(e) {
            return e.empId == id
        });
        if (emp == null)
            throw `user with ID ${id} not found`;
        return emp;
    }
    this.updateEmployee = function(emp) {
        for (let index = 0; index < this.empData.length; index++) {
            let element = this.empData[index];
            if (element.empId == emp.empId) {
                element.empName = emp.empName;
                element.empAddress = emp.empAddress;
                return;
            }
        }
        throw "User not found to update";
    }
    this.getAll = function() {
        return this.empData; 
    }
}