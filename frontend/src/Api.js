import axios from "axios";


export default axios.create(
    {
        baseURL:`https://gpsbackend.onrender.com/api/v1`
    }
)