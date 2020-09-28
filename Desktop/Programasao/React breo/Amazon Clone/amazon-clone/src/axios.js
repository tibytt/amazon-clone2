import axios from "axios";

const instance = axios.create({
    //url del api
    baseUrl: "http://localhost:5001/clone-ddae1/us-central1/api" //local endpoint
});

export default instance;