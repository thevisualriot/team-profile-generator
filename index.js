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
    // MANAGER
    "What is the name of your team's manager?",
    "What is your manager's ID?",
    "What is your manager's email address?",
    "What is your manager's office number?",
    //EMPLOYEE
    "What is your name?", // 4
    "Whatis your ID?",
    "What is your email address?",
    // ENGINEER
    "What is your github username?", // 7
    // INTERN
    "What school did you graduate from?", //8
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
        },
    ]);


const employeeQuestions = () =>
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee name',
            message: questions[4]
        },
        {
            type: 'input',
            name: 'employee id',
            message: questions[5]
        },
        {
            type: 'input',
            name: 'employee email',
            message: questions[6]
        }
    ]);


const specifiedQuestions = (num, qName) => {
    inquirer.prompt([
        {
            type: 'input',
            name: qName,
            message: questions[num]
        },
    ]);
};



function runApp() {
    managerQuestions()
        .then((answers) => {
            employeeType = answers.employee;
        })
        
        .then(() => {

            if(employeeType !== "Engineer" && employeeType !== "Intern"){
                console.log("it's the end");
                return;
            }

            employeeQuestions()
                .then(() => {

                    if (employeeType === "Engineer") {
                        specifiedQuestions(7, "github")
                            .then((answers) => console.log("eng" + answers));
                    } else if (employeeType === "Intern") {
                        specifiedQuestions(8, "school")
                            .then((answers) => console.log("int" + answers));
                    } 

                });
        })

        .catch((err) => console.log(err));
};


function renderData() {
    console.log('render');
};




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

