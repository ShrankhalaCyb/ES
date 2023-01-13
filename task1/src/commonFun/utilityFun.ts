import { error } from "console"
import { readFile, writeFile } from "fs"
import { promisify } from "util"


/* Data is processed in chunks which is smaller size of array , the resulting data that is written in the file is not in correct json format
* This method formats the data in correct data */

export function fileFormatting(path: string) {
    const readFilePromise = promisify(readFile)
    const writeFilePromise = promisify(writeFile)

    readFilePromise(path)
        .then(data => {
            let tempdata = data.toString().split('][').join(',').replace(/(,)+/g, ',')
            if (tempdata.charAt((tempdata.length - 2)) == ',') { 
               return replaceCommaAtEnd(tempdata.length - 2, ' ', tempdata) 
            }
           else 
                return tempdata 
        })

        .then(data => writeFilePromise(path, data)).catch(err => error(err))

}

function replaceCommaAtEnd(index: number, character: any, str: string) {
    return str.substr(0, index) + character + str.substr(index + character.length);
};