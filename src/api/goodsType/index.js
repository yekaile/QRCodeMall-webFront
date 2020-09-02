import {server} from '../config';

export const selectAllGoodsType = params => {
    return server({
        method: 'get',
        url: '/goodsType/all',
        params
    });
};export const selectGoodsType = params => {
    return server({
        method: 'get',
        url: '/goodsType/'+params.goodsTypeName,
    });
};

//验证码
export const insertGoodsType = data => {
    return server({
        method: 'get',
        url: '/goodsType/add',
        data
    });
};
export const updateGoodsType = data => {
    return server({
        method: 'put',
        url: '/goodsType/update',
        data
    });
};
export const deleteGoodsType = params => {
    return server({
        method: 'post',
        url: '/goodsType/delete',
        params
    });
};










