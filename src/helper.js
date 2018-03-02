import {config} from "./config";

export const url = {
    controller: "",

    setController(name)
    {
        this.controller = name;
    },

    getURL(method = "")
    {
        return config.api_url + this.controller + (method !== "" ? "/" + method : "");
    },
};
