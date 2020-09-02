import {server} from '../config';

export const buyGoods = data => {
    return server({
        method: 'post',
        url: '/orderForm/buyGoods',
        data
    });
};

//验证码
export const selectOneOrderForm = params => {
    return server({
        method: 'get',
        url: '/orderForm/myOrderForm',
        params
    });
};
export const selectAllOrderForms = params => {
    return server({
        method: 'get',
        url: '/orderForm/allOrderForms',
        params
    });
};
export const selectOrderDetails = params => {
    return server({
        method: 'post',
        url: '/orderForm/'+params.orderFormId,
        params
    });
};
export const updateOrderForm = data => {
    return server({
        method: 'put',
        url: '/orderForm/updateOrderForm',
        data
    });
};
export const deleteOrderForm = params => {
    return server({
        method: 'delete',
        url: '/orderForm/deleteOrderForm',
        params
    });
};

export const generateOrderForm = data => {
    return server({
        method: 'post',
        url: '/orderForm/generateOrderForm',
        data
    });
};
export const buyingSuccessfully = params => {
    return server({
        method: 'get',
        url: '/orderForm/buyingSuccessfully',
        params
    });
};










