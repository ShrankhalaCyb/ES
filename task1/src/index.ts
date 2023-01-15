import { OutputFilePath } from './config/outputFilePath';
import { promisify } from "util";
import { removeLastCommaFromInvalidJSON } from "./commonFun/utilityFun";
import { filterUserRecords } from './fileProcessor/jsonFileProcessor';


const { log, error } = console


/* to execute this file run - npx ts-node src/index.ts in terminal */



const filterRecordsPromise = promisify(filterUserRecords)
filterRecordsPromise(OutputFilePath.pathForUsersAboveFiftyJsonFile, OutputFilePath.pathForEmployeesJsonFile, OutputFilePath.pathForUsersFilteredByCountry)
.then(()=>{
     removeLastCommaFromInvalidJSON(OutputFilePath.pathForEmployeesJsonFile)
     removeLastCommaFromInvalidJSON(OutputFilePath.pathForUsersAboveFiftyJsonFile)
     removeLastCommaFromInvalidJSON(OutputFilePath.pathForUsersFilteredByCountry)
})
.catch((err)=> error(err))




















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





