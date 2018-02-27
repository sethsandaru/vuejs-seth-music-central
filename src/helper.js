import {config} from "./config";

export const url = {
    controller: "",

    setController(name)
    {
        this.controller = name;
    },

    getURL(method = "")
    {
        return config.app_name + controller + (method !== "" ? "/" + method : "");
    }
};
