npm init -y
tsc --init 
uncomment "resolveJsonModule": true, 

npm install @types/node typepscript ts-node



to run project -
npx ts-node src/index.ts


/*

index2.ts
===========
import { fileFormatting } from "./commonFun/utilityFun";

const pathForUsersAboveFiftyJsonFile = './outputData/usersAboveFifty.json'
const pathForEmployeesJsonFile = './outputData/employees.json'
const pathForUsersFilteredByCountry = './outputData/usersFilteredByCountry.json'


    fileFormatting(pathForEmployeesJsonFile)
    fileFormatting(pathForUsersAboveFiftyJsonFile)
    fileFormatting(pathForUsersFilteredByCountry)

*/


