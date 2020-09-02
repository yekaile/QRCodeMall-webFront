import {server} from '../config';

export const selectAllGoods = params => {
    return server({
        method: 'get',
        url: '/goods/allGoods',
        params
    });
};

//验证码
export const selectAllGoodsType = params => {
    return server({
        method: 'get',
        url: '/goods/goodsType',
        params
    });
};
export const selectGoods = params => {
    return server({
        method: 'get',
        url: '/goods/'+params.goodsId,
    });
};
export const insertToShoppingCart = data => {
    return server({
        method: 'post',
        url: '/goods/addToShoppingCart',
        data
    });
};
export const shoppingCart = params => {
    return server({
        method: 'get',
        url: '/goods/shoppingCart',
        params
    });
};

export const deleteShoppingCartGoods = data => {
    return server({
        method: 'post',
        url: '/goods/deleteShoppingCartGoods',
        data
    });
};

export const deleteAllShoppingCartGoods = params => {
    return server({
        method: 'delete',
        url: '/goods/deleteAllShoppingCartGoods',
        params
    });
};












