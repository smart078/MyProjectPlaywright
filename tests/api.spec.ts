import test, { expect, request } from "@playwright/test";
import { json } from "stream/consumers";

test("Get api", async () => {
    
    const header = await request.newContext({});
    const response = await header.get("https://reqres.in/api/users/2");

    const status = response.status();
    const statusText = response.statusText();
    const body = await response.body();

    const data = JSON.parse(body.toString());
    console.log();

});

test("Post api", async () => {
    
    const header = await request.newContext({});
    const response = await header.post("https://reqres.in/api/users", 
    { 
        data: {
                "name": "smart",
                "job": "leader"
        }
    });

    const status = response.status();
    const statusText = response.statusText();
    const body = await response.body();

    const data = JSON.parse(body.toString());
    console.log();

});

test("Put api", async () => {
    
    const header = await request.newContext({});
    const response = await header.fetch("https://reqres.in/api/users/2", {
        method: "put",
        data: {
            "name": "smart",
            "job": "rookie"
        }
    })

    const status = response.status();
    const statusText = response.statusText();
    const body = await response.body();

    const data = JSON.parse(body.toString());
    expect(data.job).toEqual("rookie");
    console.log();

});

async function fetchAPi(auth:string, url:string, method:string, data: any = {}) {

    try {
        const header = await request.newContext({
            extraHTTPHeaders:{
                "Authentication": auth
            }
        });
        const response = await header.fetch(url, {
            method: method,
            data: data
        });

        const status = response.status();
        const statusText = response.statusText();

        return response;
    } 
    catch (error) {
        //throw error
        return "error";
    }
}

test("valid", async () => {

    const resp = await fetchAPi("","","get", {});
    console.log();

    const data = JSON.parse(body.toString());
    expect(data.job).toEqual("rookie");
    console.log();
});