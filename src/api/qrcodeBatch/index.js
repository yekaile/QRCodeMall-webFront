import {server} from '../config';

export const addBatch = data => {
    return server({
        method: 'post',
        url: '/qrcodeBatch/addBatch',
        data
    });
};

export const findBatch = params => {
    return server({
        method: 'get',
        url: '/qrcodeBatch/find',
        params
    });
};



