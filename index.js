const db = require('./db/connection');
//const DB = require('./db/index');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const Choice = require('inquirer/lib/objects/choice');


console.table(
    "\n------------ EMPLOYEE TRACKER ------------\n"
)

function mainMenu() {
    inquirer
    .prompt([
        {
        type: 'list',
        name: 'menu',
        message: 'Please select from following options.',
        choices: ['view all departments', 
        'view all roles', 
        'view all employees', 
        'add a department', 
        'add a role', 
        'add an employee',
        'update an employee role',
        'quit app'
    ],

        validate: (value)=> {
            if(value) {
                return true;
            } else {
                console.log('Please select a option')
                return false;
            }
            }
        }
    ])
    .then( answer => {
        switch(answer.menu) {
            case 'view all departments':
            displayDepartment();
            break;
            case 'view all roles':
            displayRoles();
            break;
            case 'view all employees':
            displayEmployee();
            break;
            case 'add a department':
            addDepartment();
            break;
            case 'add a role':
            addRole();
            break;
            case 'add an employee':
            addEmployee();
            break;
            case 'update an employee role':
            updateEmployeeRole();
            break;
            case 'quit app':
            exitApp();
            break;
                   
        }
        }
    )
}

function displayDepartment() {
    console.log('All Department List')
    db.query('SELECT * FROM department ORDER BY id', (err, res) => {
        if (err) {
            return err;
          } else
          console.table(res);

          //back to main menu
          mainMenu();
    });
};

function displayRoles() {
    console.log('All Roles List')
    db.query('SELECT * FROM roles LEFT JOIN department ON roles.department_id = department.id', (err, res) => {
        if (err) {
            return err;
          } else
          console.table(res);

          //back to main menu
          mainMenu();
    });
};   

function displayEmployee() {
    //display employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    console.log('All Employees List')
    db.query('SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name AS department_name FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id', (err, res) => {
        if (err) {
            return err;
          } else
          console.table(res);

          //back to main menu
          mainMenu();
    });
};
 //enter the name of the department and that department is added to the database
function addDepartment() {
    console.log('Add new department')
    inquirer.prompt([
        //ask for department name
        {
            type: 'text',
            name: 'name',
            message: 'What is the name of the department you would like to add?',
        
            validate: (value)=> {
                if(value) {
                    return true;
                } else {
                    console.log("Please enter name of the new department")
                    return false;
                }
            }
        }
        ])
        .then(function(addDepartment) {
            //console.log(addDepartment);
             db.query('INSERT INTO department SET ?', (addDepartment), (err, res) => {
                if (err) {
                     return err;
                } else console.log(`${addDepartment.name} is add to database`);
                mainMenu();
            })
            
        });
};
//enter the name, salary, and department for the role and that role is added to the database
//get departments to use as options for user to choose from. since Query is producing a code and promptUser is using it 
function departmentOptions() {
    return db.promise().query('SELECT id, name FROM department') 
};
const addRole = async () => {
    console.log('Add new role')
    try {
    const promptUser = () => {
        //console.log('test');
        return inquirer.prompt([
          //ask for role name
            {
                type: 'text',
                name: 'title',
                message: 'What role you would like to add?',
            
                validate: (value)=> {
                    if(value) {
                        return true;
                    } else {
                        console.log("Please enter role name")
                        return false;
                    }
                }
            },
          //ask for salary
            {
                type: 'text',
                name: 'salary',
                message: 'How much is the salary for this role?',
            
                validate: (value)=> {
                    if(value) {
                        return true;
                    } else {
                        console.log("Please salary amount for this role")
                        return false;
                    }
                }
            },
          //ask for department for the role
          {
            type: 'rawlist',
            name: 'department_id',
            message: 'Please select from following options.',
            choices: function() {
                //const departments = await departmentOptions();
                const choiceArray = [];
                departments.forEach(department => {
                    const departmentObj = {
                        name: department.name,
                        value: department.id
                    }
                    choiceArray.push(departmentObj)
                })
                return choiceArray;
          },
            validate: (value)=> {
                if(value) {
                    return true;
                } else {
                    console.log('Please select a department for this role')
                    return false;
                }
                }
            }
          ])
          .then(function(addRole) {
              //console.log(addRole);
              //var toAdd = {title: addRole.name, salary: addRole.salary, department_id: addRole.department}
            db.query('INSERT INTO roles SET ?', (addRole), (err, res) => {
                if (err) {
                    return err;
                } else
                console.log(`${addRole.title} role is added to database`);
                mainMenu();
            })
          });
        };
    let departments = await departmentOptions();
    departments = departments[0];
    await promptUser();
    
     } catch (err) {
          console.log(err)
      }
};

//enter the employee’s first name, last name, role, and manager and that employee is added to the database
//get role to use as options for user to choose from. since Query is producing a code and promptUser is using it 
function roleOptions() {
    return db.promise().query('SELECT id, title FROM roles') 
};
function managerOptions() {
    return db.promise().query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL') 
};
const addEmployee = async () => {
    console.log('Add Employee')
    try {
    const promptUser = () => {
        //console.log('test');
    return inquirer.prompt([
          //ask for first name
          {
            type: 'text',
            name: 'first_name',
            message: 'What is the first name of the employee?',
        
            validate: (value)=> {
                if(value) {
                    return true;
                } else {
                    console.log("Please enter employee's first name")
                    return false;
                }
            }
        },
          //ask for last name
          {
            type: 'text',
            name: 'last_name',
            message: 'What is the last name of the employee?',
        
            validate: (value)=> {
                if(value) {
                    return true;
                } else {
                    console.log("Please enter employee's last name")
                    return false;
                }
            }
        },
         //ask for role 
        {
            type: 'rawlist',
            name: 'role_id',
            message: 'Please select from following options.',
            choices: function() {
                //console.log(roles);
                const choiceArrayRole = [];
                roles.forEach(role => {
                    const roleObj = {
                        name: role.title,
                        value: role.id
                    }
                    choiceArrayRole.push(roleObj)
                })
                return choiceArrayRole;
          },
            validate: (value)=> {
                if(value) {
                    return true;
                } else {
                    console.log('Please select a role for this employee')
                    return false;
                }
                }
            },
          //select manager
          {
            type: 'rawlist',
            name: 'manager_id',
            message: 'Please select manager from following options.',
            choices: function() {
                //console.log(managers);
                const choiceArrayManagers = [];
                managers.forEach(manager => {
                    const managerObj = {
                        name: name(manager.first_name, manager.last_name),
                        value: manager.id
                    }
                    choiceArrayManagers.push(managerObj)
                    
                })
                //choiceArrayManagers.push({name: 'No manager', value: 0})
                //console.log(choiceArrayManagers);
                
                //console.log(choiceArrayManagers);
                return choiceArrayManagers;
          }
        }
      ])
      .then(function(addEmployee) {
        //console.log('insert into db')
        //addEmployee.manager_id = addEmployee.manager_id.value === 0 ? null: addEmployee.manager_id.value;
        //console.log(addEmployee)
        db.query('INSERT INTO employee SET ?', (addEmployee), (err, res) => {
            if (err) {
                console.log(err)
            } 
            else 
            console.log(`${addEmployee.first_name} added to database`)
            mainMenu();
        })
        
      });
    };
      let roles = await roleOptions();
      roles = roles[0];
      let managers = await managerOptions();
      managers = managers[0];
      //console.log(managers);
      function name(first, last) {
        return first + " " + " " + last
      }
      await promptUser();
       } catch (err) {
            console.log(err)
        }
    };

//get list of employee from db
function currentEmployeeList() {
    return db.promise().query('SELECT id, first_name, last_name FROM employee')
};

const updateEmployeeRole = async () => {
    console.log('Update Employee role info');
        try {
            //prompt user with employeeArray with list of current employee to choose from to update
            const promptUser = () => {
            return inquirer.prompt([
                {
                type: 'rawlist',
                name: 'employee_id',
                message: 'Please select employee from following options to update.',
                choices: function() {
                    //console.log(managers);
                    const choiceArrayEmployee = [];
                    employee.forEach(emp => {
                        const empObj = {
                            name: name(emp.first_name, emp.last_name),
                            value: emp.id
                        }
                        choiceArrayEmployee.push(empObj)
                        
                    })
                    //console.log(choiceArrayEmployee);
                    return choiceArrayEmployee;
                }
            },
            //promot user with rolesArray with list of role to choose from to update in selected employee's info
            {
                type: 'rawlist',
                name: 'role_id',
                message: 'Please select new role from following options.',
                choices: function() {
                    //console.log(roles);
                    const choiceArrayRole = [];
                    roles.forEach(role => {
                        const roleObj = {
                            name: role.title,
                            value: role.id
                        }
                        choiceArrayRole.push(roleObj)
                    })
                    return choiceArrayRole;
              },
                validate: (value)=> {
                    if(value) {
                        return true;
                    } else {
                        console.log('Please select a role to update for this employee')
                        return false;
                    }
                    }
                },
        ])
        //insert the role value in the selected employee
        .then(function(updateEmployeeInfo) {
            //console.log(updateEmployeeInfo);
            const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
            const params = [updateEmployeeInfo.role_id, updateEmployeeInfo.employee_id];
            db.query(sql, params , (err, res) => {
                if (err) {
                    console.log(err)
                } else 
                console.log(`Employee info is updated in database`)
                mainMenu();
            })
           
        });
        }; 

        let employee = await currentEmployeeList();
        function name(first, last) {
            return first + " " + " " + last
          }
        employee = employee[0];

        let roles = await roleOptions();
        roles = roles[0];

        //console.log(currentEmployeeList);
        await promptUser(); 

        } catch (err) {
            console.log(err)
        }
    };
    
function exitApp() {
        db.end();
        process.exit();
      };

mainMenu();