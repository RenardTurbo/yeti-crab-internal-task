const defaultRequests = [
    {
        requestId: 0,
        dateTime: new Date(),
        companyName: "Apricode",
        carrier: 3,
        carrierPhoneNumber: "8(800)555-35-35",
        comment: "Lorem ",
        atiCode: "12345"
    },
    {
        requestId: 1,
        dateTime: new Date(),
        companyName: "Apricode",
        carrier: 2,
        carrierPhoneNumber: "8(800)555-35-35",
        comment: "Lorem ",
        atiCode: "12345"
    },
    {
        requestId: 2,
        dateTime: new Date(),
        companyName: "Apricode",
        carrier: 1,
        carrierPhoneNumber: "8(800)555-35-35",
        comment: "Lorem ",
        atiCode: "12345"
    }
]

const defaultCarriers = [
    {id: 1, name: "Tarbe"},
    {id: 2, name: "Tarbeev A.V"},
    {id: 3, name: "Tarbeeeeeev A.V"},
]

class FakeAPI {
    /*
    *  заявки
    * */
    requests = [];
    carriers = [];
    _maxRequestId;

    get maxRequestId() {
        return this._maxRequestId;
    }

    set maxRequestId(value) {
        this._maxRequestId = value;
    }

    getNextId() {
        this.maxRequestId += 1;
        return this.maxRequestId;
    }

    constructor(requests = defaultRequests, carriers = defaultCarriers, maxRequestId = 0) {
        this.requests = requests;
        this.carriers = carriers;
        this.maxRequestId = maxRequestId;
    }

    getCarriers = () => {
        return JSON.stringify(
            this.carriers.reduce((acc, cur) => {
                acc[cur.id] = cur.name;
                return acc;
            }, {})
        );
    }

    getRequests = () => {
        return JSON.stringify(this.requests);
    }

    getRequest = (id) => {
        return JSON.stringify(this.requests[id]);
    }

    postRequest = (newRequest) => {
        const newRequestCopy = {...newRequest};
        newRequestCopy.requestId = this.getNextId();
        this.requests.push(newRequestCopy);
        return JSON.stringify(this.requests);
    }

    editRequest = (id, request) => {
        this.requests[id] = request;
        return JSON.stringify(this.requests);
    }

    deleteRequest = (id) => {
        this.requests.splice(id, 1);
        return JSON.stringify(this.requests);
    }
}

export const fakeApi = new FakeAPI(defaultRequests, defaultCarriers, 2);