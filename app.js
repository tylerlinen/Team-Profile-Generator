const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

function askManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your name?",
            validate: answer => {
                if(answer !== "") {
                    return true;
                }
                return "Please enter your name"
            }
        },
        {
            type: "input",
            name: "managerId",
            message: "What is ID?",
            validate: answer => {
                const pass = answer.match(/^[0-9]*$/);
                if(pass) {
                    return true;
                }
                return "Only digits please"
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your email?",
            validate: answer =>{
                const pass = answer.match(/[^\s]*@[a-z0-9.-]*/);
                if (pass){
                    return true;
                }
                return "Enter valid email"
                
            }
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your Office Number?",
            validate: answer => {
                const pass = answer.match(/^[0-9]*$/);
                if(pass) {
                    return true;
                }
                return "Only digits please"
            }
        },
    ]).then(function(data) {
      
        const manager = new Manager(data.managerName,data.managerId,data.managerEmail,data.managerOfficeNumber);
        console.log(manager);
        teamMembers.push(manager);
        addEmployee();
    })

}
function askEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your name?",
            validate: answer => {
                if(answer !== "") {
                    return true;
                }
                return "Please enter your name"
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is ID?",
            validate: answer => {
                const pass = answer.match(/^[0-9]*$/);
                if(pass) {
                    return true;
                }
                return "Only digits please"
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your email?",
            validate: answer =>{
                const pass = answer.match(/[^\s]*@[a-z0-9.-]*/);
                if (pass){
                    return true;
                }
                return "Enter valid email"
                
            }
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your Github?",
            validate: answer => {
                if(answer !== "") {
                    return true;
                }
                return "Please enter your Github"
            }
        },
    ]).then(function(data) {
      
        const engineer = new Engineer(data.engineerName,data.engineerId,data.engineerEmail,data.engineerGithub);
        console.log(engineer);
        teamMembers.push(engineer);
        addEmployee()
    })

}
function askIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is your name?",
            validate: answer => {
                if(answer !== "") {
                    return true;
                }
                return "Please enter your name"
            }
        },
        {
            type: "input",
            name: "internId",
            message: "What is ID?",
            validate: answer => {
                const pass = answer.match(/^[0-9]*$/);
                if(pass) {
                    return true;
                }
                return "Only digits please"
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your email?",
            validate: answer =>{
                const pass = answer.match(/[^\s]*@[a-z0-9.-]*/);
                if (pass){
                    return true;
                }
                return "Enter valid email"
                
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is your School?",
            validate: answer => {
                if(answer !== "") {
                    return true;
                }
                return "Please enter your School"
            }
        },
    ]).then(function(data) {
      
        const intern = new Intern(data.internName,data.internId,data.internEmail,data.internSchool);
        console.log(intern);
        teamMembers.push(intern);
        addEmployee()
    })

}
function addEmployee(){
    inquirer.prompt([{
        type:"list",
        name: "switch",
        message: "Would you like to add another employee",
        choices: ["add Engineer", "add Intern", "add Manager", "done"]
    }]).then(function(data){
        switch(data.switch) {
            case "add Engineer":
             askEngineer()
              break
            case "add Intern":
              askIntern()
              break;
            case "add Manager":
              askManager()
                break;
            default:
              createTeam()
          }
    })
}

function createTeam() {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
}
askManager()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
