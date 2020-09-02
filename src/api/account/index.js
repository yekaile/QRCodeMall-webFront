import {server} from "../config";

export const myAccount = params => {
    return server({
        method: 'get',
        url: '/account/myAccount',
        params
    });
};
