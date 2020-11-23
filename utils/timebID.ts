import Constants from "expo-constants";

export default class timebID {
    constructor() {
        this.iterator = 0;
        this.lastTime = 0;
        this.sessionId = Constants.sessionId.slice(0, 8);
    }

    getID(): string {
        const time = Date.now(),
            hexCurrentTime = time.toString(16);

        if (this.lastTime == time) {
            this.iterator++;

            if (this.iterator > 255) {
                this.iterator = 0;
                while (Date.now() <= time) {
                    return;
                }
            }
        } else {
            this.iterator = 0;
        }

        this.lastTime = time;

        const hexIterator = this.iterator.toString(16).padStart(2, "0");

        const id = this.sessionId + hexCurrentTime + hexIterator;
        return id;
    }
}
