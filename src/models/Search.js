// ****ES6 MODULE *******

// export default "hey";
import axios from "axios";
import { key, proxy } from "../views/config"


export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults(query) {

        try {
            //console.log(this.query)
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            //console.log(res);
            this.result = res.data.recipes;
            //console.log(this.result);
        }
        catch (error) {
            alert("there is an error in search");
        }

    }
}

