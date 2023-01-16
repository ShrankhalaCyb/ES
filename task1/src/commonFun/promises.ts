import { usersType } from "../dataTypes/types"

/*  get all users who are employees */
export function getEmployeesPromise(usersArray: usersType[]): Promise<usersType[] > {
    let users: usersType[] = []

    return new Promise((resolve, reject) => {
        if (usersArray.length != 0) {
            users = usersArray.filter((singleUser) => singleUser.isEmployee === true)
            resolve(users)
        }
        else  reject("Data not present")
    })
}

/* get all users above age 50 */
export function getUsersByAgePromise(usersArray: usersType[],age:number): Promise<usersType[]> {
    let users: usersType[] = []

    return new Promise((resolve, reject) => {
        if (usersArray.length != 0) {
            users = usersArray.filter((singleUser) => singleUser.age>age)
            resolve(users)  
        }
        else {
            reject("Data not present")
        }
    })
}

/* get all users by country passed as argument */
export function getUsersByCountryPromise(usersArray: usersType[],country:string): Promise<usersType[]> {
    let users: usersType[] = []

    return new Promise((resolve, reject) => {
        if (usersArray.length != 0) {
                users = usersArray.filter((singleUser) => singleUser.country.toLowerCase() === country.toLowerCase())
                resolve(users)
            }
        else {
            reject("Data not present")
        }
    })
}