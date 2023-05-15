import axios from "axios";

export default class PostService {
    static async getAll(module, params) {
        try {
            const response = await axios.get(`http://localhost:3000/${module}`, {
                params,
            });

            return response;
        } catch (e) {
            console.log(e)
            return false
        }
    }
}