import {server} from '../config';

export const getKeys = params => {
    return server({
        method: 'get',
        url: '/qrcode/goodsType',
        params
    });
};export const addProperty = data => {
    return server({
        method: 'post',
        url: '/qrcode/addValue',
        data
    });
};



export const addQrcode = data => {
    return server({
        method: 'post',
        url: '/qrcode/addQrcode',
        data
    });
};


export const myQrcode = params => {
    return server({
        method: 'get',
        url: '/qrcode/myQrcode',
        params
    });
};

export const updateQrcode = data => {
    return server({
        method: 'put',
        url: '/qrcode/updateQRCode',
        data
    });
};export const updateValue = data => {
    return server({
        method: 'put',
        url: '/qrcode/updateValue',
        data
    });
};
export const deleteQRcode = params => {
    return server({
        method: 'delete',
        url: '/qrcode/deleteQRCode',
        params
    });
};
export const getQRcodeInfo = params => {
    return server({
        method: 'get',
        url: `/qrcode/${params.qrcodeId}`,
        params
    });
};
export const addMail = data => {
    return server({
        method: 'post',
        url: '/qrcode/addMail',
        data
    });
};
export const getQrcodeBatch = params => {
    return server({
        method: 'get',
        url: '/qrcodeBatch/find',
        params
    });
};





