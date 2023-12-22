const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let employeeType;


// TODO: Write Code to gather information about the development team members, and render the HTML file.


const questions = [
    // EMPLOYEE QUESTIONS
    "What is the name of your team's manager?",
    "What is your manager's ID?",
    "What is your manager's email address?",
    "What is your manager's office number?",
    // MANAGER
    "What is your office number?",
    // ENGINEER
    "What is your github username?",
    // INTERN
    "What school did you graduate from?",
];



const managerQuestions = () =>
    inquirer.prompt([
        {
            type: 'input',
            name: 'manager name',
            message: questions[0]
        },
        {
            type: 'input',
            name: 'manager ID',
            message: questions[1]
        },
        {
            type: 'input',
            name: 'manager email',
            message: questions[2]
        },
        {
            type: 'input',
            name: 'office number',
            message: questions[3]
        },
        {
            type: 'list',
            name: 'employee',
            choices: ["Engineer", "Intern", "I don't want to add more employees"]
        }
    ]);


function runApp() {
    managerQuestions()
        .then((answers) => {
            employeeType = answers.employee;
            // console.log(employeeType);
        })
        .then(() => {
            if(employeeType === 'Engineer'){
                console.log("it's an engineer!");
            } else if (employeeType === "Intern") {
                console.log("it's an intern!");
            } else if (employeeType === "I don't want to add more employees") {
                console.log("it's the end");
            }
        })
        .catch((err) => console.log(err));
}



runApp();






// const runQuestion = () =>
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "name",
//             message: questions[0]
//         },
//         {
//             type: "input",
//             name: "email",
//             message: questions[1]
//         },
//         {
//             type: "input",
//             name: "title",
//             message: questions[2],
//         },
//         {
//             type: "input",
//             name: "description",
//             message: questions[3],
//         },
//         {
//             type: "input",
//             name: "installation",
//             message: questions[4],
//             default: "nmp installation required"
//         },
//         {
//             type: "input",
//             name: "usage",
//             message: questions[5],
//         },
//         {
//             type: "list",
//             name: "license",
//             message: questions[6],
//             choices: ["Apache License 2.0", "Boost", "Creative Commons", "GNU GPL v3", "MIT", "None"],
//             default: "None"
//         },
//         {
//             type: "input",
//             name: "contributing",
//             message: questions[7],
//         },
//         {
//             type: "input",
//             name: "tests",
//             message: questions[8],
//             default: "npm run test"
//         }
//     ]);






// function writeToFile(fileName, data) {
//     fs.writeFile(fileName, data, (err) => {
//         err ? console.error(err) : console.log("File Saved Successfully!");
//     });
// }




// function to initialize program
// function init() {
//     runQuestion()
//         .then((answers) => writeToFile(filePath, generateMarkdown(answers)))
//         .then(() => console.log("Generating README..."))
//         .catch((err) => console.log(err));
// };


// function call to initialize program
// init();

