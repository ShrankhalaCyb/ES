import { log } from "console"
import { usersType } from "../dataTypes/types"

/*  get all users who are employees */
export function getEmployeesPromise(usersArray: usersType[]): Promise<usersType[] | string > {
    let users: usersType[] = []

    return new Promise((resolve, reject) => {
        if (usersArray.length != 0) {
            for (let index = 0; index < usersArray.length; index++) {
                {
                    if (usersArray[index].isEmployee == true)
                        users.push(usersArray[index])
                }
                // log(users)
                resolve(users)
            }
        }

        else {
            reject("Data not present")
        }
    })
}

/* get all users above age 50 */
export function getUsersAboveFiftyAgePromise(usersArray: usersType[]): Promise<usersType[] | string> {
    let users: usersType[] = []

    return new Promise((resolve, reject) => {
        if (usersArray.length != 0) {
            for (let index = 0; index < usersArray.length; index++) {
                {
                    if (usersArray[index].age > 50)
                        users.push(usersArray[index])
                }
                resolve(users)
            }
        }
        else {
            reject("Data not present")
        }
    })
}

/* get all users by country passed as argument */
export function getUsersByCountry(usersArray: usersType[],country:string): Promise<usersType[] | string> {
    let users: usersType[] = []

    return new Promise((resolve, reject) => {
        if (usersArray.length != 0) {
            for (let index = 0; index < usersArray.length; index++) {
                {
                    if (usersArray[index].country.toLowerCase()==country.toLowerCase() )
                        users.push(usersArray[index])
                }
                resolve(users)
            }
        }
        else {
            reject("Data not present")
        }
    })
}