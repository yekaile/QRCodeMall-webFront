import {server} from '../config';

export const selectGoods = params => {
    return server({
        method: 'get',
        url: '/admin/goods',
        params
    });
};


export const selectQRCode = params => {
    return server({
        method: 'get',
        url: '/admin/QRCode',
        params
    });
};

export const selectUser = params => {
    return server({
        method: 'get',
        url: '/admin/user',
        params
    });

}
export const updateUser = data => {
    return server({
        method: 'put',
        url: '/admin/updateUser',
        data
    });


};
    export const selectUserBill = params => {
        return server({
            method: 'get',
            url: '/admin/userBill',
            params
        });
    };
    export const outputMoney = data => {
        return server({
            method: 'put',
            url: '/admin/outputMoney',
            data
        });
    };

    export const selectSales = params => {
        return server({
            method: 'get',
            url: '/goods/sales',
            params
        });
    };


    export const selectNotice = params => {
        return server({
            method: 'get',
            url: '/admin/notice',
            params
        });
    };











