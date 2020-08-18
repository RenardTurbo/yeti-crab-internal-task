const defaultRequests = [
    {
        requestId: 0,
        dateTime: String(new Date()),
        companyName: "Apricode",
        carrier: "Tarbeev A.V.",
        carrierPhoneNumber: "8(800)555-35-35",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
            " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
            "when an unknown printer took a galley of type and scrambled it to make a type specimen book. " +
            "It has survived not only five centuries, but also the leap into electronic typesetting, remaining " +
            "essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing" +
            " Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including" +
            " versions of Lorem Ipsum.",
        atiCode: "12345"
    },
    {
        requestId: 1,
        dateTime: String(new Date()),
        companyName: "Apricode",
        carrier: "Tarbeev A.V.",
        carrierPhoneNumber: "8(800)555-35-35",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
            " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
            "when an unknown printer took a galley of type and scrambled it to make a type specimen book. " +
            "It has survived not only five centuries, but also the leap into electronic typesetting, remaining " +
            "essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing" +
            " Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including" +
            " versions of Lorem Ipsum.",
        atiCode: "12345"
    },
    {
        requestId: 2,
        dateTime: String(new Date()),
        companyName: "Apricode",
        carrier: "Tarbeev A.V.",
        carrierPhoneNumber: "8(800)555-35-35",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
            " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
            "when an unknown printer took a galley of type and scrambled it to make a type specimen book. " +
            "It has survived not only five centuries, but also the leap into electronic typesetting, remaining " +
            "essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing" +
            " Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including" +
            " versions of Lorem Ipsum.",
        atiCode: "12345"
    }
]

const defaultCarriers = [
    { name: "Tarbeev A.V", phoneNumber: "8(800)555-35-35" },
    { name: "Tarbeev A.V", phoneNumber: "8(800)555-35-35" },
    { name: "Tarbeev A.V", phoneNumber: "8(800)555-35-35" },
]

class FakeAPI {
    /*
    *  заявки
    * */
    requests = [];
    carriers = [];


    constructor(requests = defaultRequests, carriers = defaultCarriers) {
        this.requests = requests;
        this.carriers = carriers;
    }

    getCarriers = () => {
        return this.carriers;
    }

    getRequests = () => {
        return this.requests;
    }

    getRequest = (id) => {
        return this.requests[id];
    }

    postRequest = (newRequest) => {
        this.requests.push(newRequest);
    }

    editRequest = (id, request) => {
        this.requests[id] = request;
    }

    deleteRequest = (id) => {
        this.requests.splice(id, 1);
    }
}

export const fakeApi = new FakeAPI();