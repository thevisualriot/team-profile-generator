/* *********************************************************    GLOBAL VARIABLES   *********************************************************** */

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let manager = "";
let employee = "";
let team = [];


/* *********************************************************    QUESTIONS   *********************************************************** */
const questions = [
    // MANAGER
    {
        type: 'input',
        name: 'manager name',
        message: "What is the name of your team's manager?"
    },
    {
        type: 'input',
        name: 'manager ID',
        message: "What is your manager's ID?"
    },
    {
        type: 'input',
        name: 'manager email',
        message: "What is your manager's email address?"
    },
    {
        type: 'input',
        name: 'office number',
        message: "What is your manager's office number?"
    },
    {
        type: 'list',
        name: 'employee',
        choices: ["Add an engineer", "Add an intern", "Finish building the team"]
    },

    // ALL EMPLOYEES
    {
        type: 'input',
        name: 'employee name',
        message: "Provide employee's name",
        when: (answers) => answers.employee !== "Finish building the team"
    },
    {
        type: 'input',
        name: 'employee id',
        message: "Provide employee's ID",
        when: (answers) => answers.employee !== "Finish building the team"
    },
    {
        type: 'input',
        name: 'employee email',
        message: "Provide employee's email address",
        when: (answers) => answers.employee !== "Finish building the team"
    },

    // ENGINEER
    {
        type: 'input',
        name: "github",
        message: "Provide employee's github username",
        when: (answers) => answers.employee === "Add an engineer"
    },

    // INTERN
    {
        type: 'input',
        name: "school",
        message: "Provide name of school of an intern",
        when: (answers) => answers.employee === "Add an intern"
    },
];

// Second run of questions when additional employee added
const additionalQuestions = [4, 5, 6, 7, 8, 9];
const secondaryQuestionaire = additionalQuestions.map((index) => questions[index]);


/* ***********************************************************   FUNCTIONS   *************************************************************** */

// RUN QUESTIONAIRE 
function runQuestionaire(questions, index) {
    inquirer.prompt(questions.slice(index))
        .then((answers) => {
            if (answers.employee === "Finish building the team") {
                renderData();
                return;
            }

            if(!manager){ // If manager was not added, add it to the array of team, otherwise skip
                manager = new Manager(answers['manager name'], answers['manager ID'], answers['manager email'], answers['office number'])
                manager.role = "manager";
                console.log("here 1: " + typeof manager.id);
                addMember(manager);
            }
            

            if(answers.employee === "Add an engineer"){ // add engineer
                employee = new Engineer(answers['employee name'], answers['employee id'], answers['employee email'], answers['github']);
                console.log("here: " + typeof employee.id);
                employee.role = "engineer";
                addMember(employee);
            } else if (answers.employee === "Add an intern"){ // add intern
                employee = new Intern(answers['employee name'], answers['employee id'], answers['employee email'], answers['school']);
                employee.role = "intern";
                addMember(employee);
            }

            runQuestionaire(questions, 4); // when adding new employee run questions from the 5th, to skip manager questions
        })
        .catch((err) => console.log(err));
}

// ADD MEMBER TO 'TEAM' ARRAY
function addMember(val) {
    team.push(val);
}

// RENDER TO HTML FILE
function renderData() {
    data = render(team);
    fs.writeFile(outputPath, data, (err) => {
        err ? console.error(err) : console.log("File Saved Successfully!");
    });
}


/* **************************************************************   LET'S GO!   ********************************************************** */

// Run the app
runQuestionaire(questions, 0)
