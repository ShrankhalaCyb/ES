
import { Readable } from "stream";

/* Custom readable stream class for users */
export class UserStream extends Readable {
    userArray: any[];
    si: number;
    ei: number;

    constructor(userArray: any[]) {
        super({ encoding: 'utf-8' });
        this.userArray = userArray;
        this.si = 0
        this.ei = 10

    }
    /* read method breaks our data into smaller chunks , these smaller chunks are pushed to the stream */
    _read() {

        if (this.ei <= this.userArray.length) {

            let chunk = [], isFirst = false, isLast = false, i;

            //isFirst and isLast flag are pointers that tells fileProcessor if the chunk sent is first or last
            (this.si == 0) ? isFirst = true : isFirst = false
            for (i = this.si; i < this.ei; i++) {
                chunk.push(this.userArray[i])
            }
            this.si = this.ei
            this.ei += 10;

            (i >= this.userArray.length) ? isLast = true : isLast = false

            this.push(JSON.stringify({ arr: chunk, isFirst: isFirst, isLast: isLast }))
        }
        else {
            /* to end the stream push null  */
            this.push(null)
        }

    }
}


