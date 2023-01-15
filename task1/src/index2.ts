import { removeLastCommaFromInvalidJSON } from "./commonFun/utilityFun";
import { OutputFilePath } from "./config/outputFilePath";

removeLastCommaFromInvalidJSON(OutputFilePath.pathForEmployeesJsonFile)
removeLastCommaFromInvalidJSON(OutputFilePath.pathForUsersAboveFiftyJsonFile)
    removeLastCommaFromInvalidJSON(OutputFilePath.pathForUsersFilteredByCountry)