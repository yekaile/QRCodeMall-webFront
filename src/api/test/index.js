import {server} from "../config";

export const setSession = params => {
    return server({
        method: 'get',
        url: '/test/setSession',
        params
    });
};
export const getSession = () => {
    return server({
        method: 'get',
        url: '/test/getSession',
    });
};

export const getCookie = (params) => {
    return server({
        method: 'get',
        url: '/test/getCookie',
        params
    });
};


export const addCookie = (params) => {
    return server({
        method: 'get',
        url: '/test/addCookie',
        params
    });
};

