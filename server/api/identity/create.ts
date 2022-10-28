
import {createRouter, defineEventHandler, getQuery, readBody} from "h3";
import Axios from 'axios';
import axios from "axios";
import * as https from "https";
import * as fs from "fs";

var agent = new https.Agent({
    ca: fs.readFileSync('api.akx3.com.pem')
});

// @ts-ignore
export default defineEventHandler(async (event) => {
    const body = await getQuery(event);
    const {user} = body
    const url = process.env["NUXT_APP_AKX_PRIVATE_API_URL"]+ 'api/v1/identity/create/'+user;
    try {
        // @ts-ignore
        const res = await axios.get(url, {agent:agent});
        return res.data;
    } catch(e) {
        console.log(e);
    }

});

