import { OutputFilePath } from './../config/outputFilePath';
import { UserStream } from "../streams/userStream"
import users from '../inputData/users.json';
import { getUsersByAgePromise, getEmployeesPromise, getUsersByCountryPromise } from "../commonFun/promises";
import fs, { write } from "fs";
import { removeLastCommaFromInvalidJSON, writeToJsonFile } from '../commonFun/utilityFun';
import { usersType } from '../dataTypes/types';


const { log, error } = console



export function filterUserRecords() {
    let usersByAge: usersType[] = [], employees: usersType[] = [], usersOfCountry: usersType[] = []
    const userStream = new UserStream(users)

    /* data is recieved in smaller chunks (event-data) */
    userStream.on('data', (dataChunk) => {

        let prefix = "", postfix = ""
        let chunk = JSON.parse(dataChunk)

        Promise.all([getUsersByAgePromise(chunk, 50), getEmployeesPromise(chunk), getUsersByCountryPromise(chunk, 'USA')])
            .then((results) => {
                if (results[0].length > 0) usersByAge.push(...results[0])
                if (results[1].length > 0) employees.push(...results[1])
                if (results[2].length > 0) usersOfCountry.push(...results[2])
            })
            .catch(err => log(err))

    })

    userStream.on('end', () => {
        log("Stream ended")

    })

    setTimeout(() => {
        console.log("write operation started " + new Date().getTime())
        writeToJsonFile(OutputFilePath.pathForEmployeesJsonFile, employees)
        writeToJsonFile(OutputFilePath.pathForUsersFilteredByAgeJsonFile, usersByAge)
        writeToJsonFile(OutputFilePath.pathForUsersFilteredByCountry, usersOfCountry)
    }, 5000)

}



























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





