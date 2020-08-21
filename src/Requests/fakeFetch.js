import {fakeApi} from "./FakeAPI"

export function fakeFetch(url, options) {
    const method = options.method;
    const body = options.body;
    let [urlMethod, urlParameters] = url.split("?");
    if (!urlParameters) {
        urlParameters = "";
    }
    const parameters = urlParameters.split("&").reduce((acc, cur) => {
        const [key, value] = cur.split("=");
        acc[key] = value;
        return acc;
    }, {})
    switch (urlMethod) {
        case "/api/requests":
            switch (method) {
                case "GET":
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(fakeApi.getRequests())
                        }, 600)
                    })
                default :
                    return new Promise((_, reject) => {
                        reject()
                    })
            }
        case "/api/carriers" :
            switch (method) {
                case "GET" :
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(fakeApi.getCarriers())
                        })
                    })
                default :
                    return new Promise((_, reject) => {
                        reject()
                    })
            }

        case "/api/request" :
            switch (method) {
                case "GET": {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(fakeApi.getRequest(Number(parameters.id)))
                        }, 600);
                    })
                }
                case "POST": {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(fakeApi.postRequest(body))
                        }, 600)
                    })
                }
                case "PUT" : {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(fakeApi.editRequest(Number(parameters.id), body));
                        }, 600)
                    })
                }
                case  "DELETE" : {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(fakeApi.deleteRequest(Number(parameters.id)))
                        }, 600)
                    })
                }
                default :
                    return new Promise((_, reject) => {
                        reject()
                    })
            }

    }
}

