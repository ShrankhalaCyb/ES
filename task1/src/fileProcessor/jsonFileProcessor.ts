import { UserStream } from "../streams/userStream"
import users from '../inputData/users.json';
import { getUsersAboveFiftyAgePromise, getEmployeesPromise, getUsersByCountry } from "../commonFun/promises";
import fs from "fs";


const { log, error } = console


export function filterUserRecords(pathForUsersAboveFiftyJsonFile: string, pathForEmployeesJsonFile: string, pathForUsersFilteredByCountry: string) {
    const userStream = new UserStream(users)

    /* data is recieved in smaller chunks (event-data) */
    userStream.on('data', (dataChunk) => {

        let prefix = "", postfix = ""
        let chunk = JSON.parse(dataChunk)
        console.log(chunk.isFirst, chunk.isLast)
        chunk.isFirst ? (prefix = "[") : (prefix = "")
        chunk.isLast ? (postfix = "]") : (postfix = ",")

        /* get all users above age 50 */
        getUsersAboveFiftyAgePromise((chunk.arr))
            .then(data => {
                if (data.length > 0) {
                    fs.appendFile(pathForUsersAboveFiftyJsonFile, prefix + JSON.stringify(data).slice(1, -1) + postfix, err => {
                        log(prefix , postfix)
                        if (err) error(err)
                    })
                }
            })
            .catch(err => error(err))


        /* get all users who are employees */
        getEmployeesPromise((chunk.arr))
            .then((data) => {
                if (data.length > 0) {
                    fs.appendFile(pathForEmployeesJsonFile, prefix + JSON.stringify(data).slice(1, -1) + postfix, err => {
                        if (err) error(err)
                    })
                }
            })
            .catch((err) => error(err))

        /* get all users who are from USA */
        getUsersByCountry((chunk.arr), 'USA').then((data) => {
            if (data.length > 0) {
                fs.appendFile(pathForUsersFilteredByCountry, prefix + JSON.stringify(data).slice(1, -1) + postfix, err => {
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





