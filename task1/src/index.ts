
import { createReadStream } from 'fs';
import { filterUserRecords } from './fileProcessor/jsonFileProcessor';




 filterUserRecords()



/* const readStream = createReadStream('./src/inputData/users.json', { highWaterMark: 16 });
const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log(chunk.toString());

    console.log()

}); */






















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





