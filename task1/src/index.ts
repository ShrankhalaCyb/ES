import fs from "fs";
import { getUsersAboveFiftyAgePromise, getEmployeesPromise, getUsersByCountry } from "./commonFun/promises";
import { fileFormatting } from "./commonFun/utilityFun";
import users from './data/users.json';
import { UserStream } from "./streams/userStream";

const { log, error } = console

/* to execute this file run - npx ts-node src/index.ts in terminal */

 function filterUserRecords(cb: any) {
    const userStream = new UserStream(users)
    /* specify the path where the response or output files will be store */
     const pathForUsersAboveFiftyJsonFile = './outputData/usersAboveFifty.json'
     const pathForEmployeesJsonFile = './outputData/employees.json'
     const pathForUsersFilteredByCountry = './outputData/usersFilteredByCountry.json'

     /* data is recieved in smaller chunks (event-data) */
    userStream.on('data', (chunk) => {

        /* get all users above age 50 */
        getUsersAboveFiftyAgePromise(JSON.parse(chunk))
            .then(data => {
                fs.appendFile(pathForUsersAboveFiftyJsonFile, JSON.stringify(data), err => {
                    if (err) error(err)
                })
            })
            .catch(err => error(err))

        /* get all users who are employees */
        getEmployeesPromise(JSON.parse(chunk))
            .then((data: any) => {
                fs.appendFile(pathForEmployeesJsonFile, JSON.stringify(data), err => {
                    if (err) error(err)
                })
            })
            .catch((err: any) => error(err))

        /* get all users who are from USA */
        getUsersByCountry(JSON.parse(chunk), 'USA').then((data: any) => {
            fs.appendFile(pathForUsersFilteredByCountry, JSON.stringify(data), err => {
                if (err) error(err)
            })
        })
            .catch((err: any) => error(err))
    })

    userStream.on('end', () => {
       log("Stream ended")
    }) 

    
//to format the files call back function fileFormatting is called
    cb(pathForEmployeesJsonFile)
    cb(pathForUsersAboveFiftyJsonFile)
    cb(pathForUsersFilteredByCountry)
}

filterUserRecords(fileFormatting)



















/* import fs from "fs";
import { usersType } from "./types/types";


const { log, error } = console


fs.readFile('./src/data/users.json', 'utf-8', (err, dataInStringFormat) => {
    if (err) error(err)
    else {
        try {
            const dataInJsonFormat: usersType[] = [] //JSON.parse(dataInStringFormat)
            userAboveAge25(dataInJsonFormat).then(data => log(data)).catch(err => log(err))
        } catch (error) {
            log("Error parsing JSON", error)
        }
    }
    
}) 

fs.appendFile('./outputData/usersAboveFifty.json', `"usersAboveAgeFifty":${JSON.stringify(data)},`, err => {
                if (err) error(err)
            })


*/





