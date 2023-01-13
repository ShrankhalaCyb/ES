
import { Readable } from "stream";
/* Custom readable stream class for users */
export class UserStream extends Readable {
    jsonArray: any[];
    si: number;
    ei: number;

    constructor(jsonArray: any[]) {
        super({ encoding: 'utf-8' });
        this.jsonArray = jsonArray;
        this.si = 0
        this.ei = 10

    }
/* read method breaks our data into smaller chunks , these smaller chunks are pushed to the stream */
    _read() {
        if (this.ei <= this.jsonArray.length) {
            let chunk = []
            for (let i = this.si; i < this.ei; i++) {
                chunk.push(this.jsonArray[i])
            }
            this.si = this.ei
            this.ei += 10
            this.push(JSON.stringify(chunk))
        }
        else {
            this.push(null)
        }

    }
}


