
import {createRouter, defineEventHandler, getQuery, getRouterParams, readBody} from "h3";
import axios from "axios";
import * as https from "https";
import * as fs from "fs";
import FormData from "form-data";

var agent = new https.Agent({
    ca: fs.readFileSync('api.akx3.com.pem')
});

// @ts-ignore
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {user} = await getQuery(event);

    const item: any = body;

    const formData = new FormData();
    formData.append("file", body);



    const url = process.env["NUXT_APP_AKX_PRIVATE_API_URL"]+ 'avatar/upload/'+user;
    try {
        // @ts-ignore

        const res = await axios({
            url: url,
            method: 'POST',
            headers: {...formData.getHeaders()},
            data: formData
        })
        return res;
    } catch(e) {
        console.log(e);
        return e;
    }

});

