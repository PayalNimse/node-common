class addResponse {
    id: any;
    timeStamp: string;

    constructor(id: any, timeStamp: string) {
        this.id = id;
        this.timeStamp = timeStamp;
    }

    // Static method to create an addResponse instance
    public static fromResult(response: any): addResponse {
        return new addResponse(response.insertedId, new Date().toISOString());
    }
}

export default addResponse;