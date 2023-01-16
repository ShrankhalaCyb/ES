import { OutputFilePath } from './../config/outputFilePath';
import { UserStream } from "../streams/userStream"
import users from '../inputData/users.json';
import { getUsersAboveFiftyAgePromise, getEmployeesPromise, getUsersByCountry } from "../commonFun/promises";
import fs from "fs";
import { removeLastCommaFromInvalidJSON } from '../commonFun/utilityFun';


const { log, error } = console


export function filterUserRecords() {
    const userStream = new UserStream(users)

    /* data is recieved in smaller chunks (event-data) */
    userStream.on('data', (dataChunk) => {

        let prefix = "", postfix = ""
        let chunk = JSON.parse(dataChunk)
        // console.log(chunk.isFirst, chunk.isLast)
        /*  chunk.isFirst ? (prefix = "[") : (prefix = "")
         chunk.isLast ? (postfix = "]") : (postfix = ",") */

        /* get all users above age 50 */
        getUsersAboveFiftyAgePromise((chunk))
            .then(data => {
                if (data.length > 0) {
                    fs.appendFile(OutputFilePath.pathForUsersAboveFiftyJsonFile, JSON.stringify(data).slice(1, -1) + ",", err => {
                        // log(prefix , postfix)
                        if (err) error(err)
                    })
                }
            })
            .catch(err => error(err))


        /* get all users who are employees */
        getEmployeesPromise((chunk))
            .then((data) => {
                if (data.length > 0) {
                    fs.appendFile(OutputFilePath.pathForEmployeesJsonFile, JSON.stringify(data).slice(1, -1) + ",", err => {
                        if (err) error(err)
                    })
                }
            })
            .catch((err) => error(err))

        /* get all users who are from USA */
        getUsersByCountry((chunk), 'USA').then((data) => {
            if (data.length > 0) {
                fs.appendFile(OutputFilePath.pathForUsersFilteredByCountry, JSON.stringify(data).slice(1, -1) + ",", err => {
                    if (err) error(err)
                })
            }
        })
            .catch((err) => error(err))
    })

    userStream.on('end', () => {
        log("Stream ended")
    })



}

setTimeout(() => {
    log("After file processing")
    removeLastCommaFromInvalidJSON(OutputFilePath.pathForEmployeesJsonFile)
    removeLastCommaFromInvalidJSON(OutputFilePath.pathForUsersAboveFiftyJsonFile)
    removeLastCommaFromInvalidJSON(OutputFilePath.pathForUsersFilteredByCountry)
}, 5000)

























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





