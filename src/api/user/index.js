import {server} from '../config';

export const login = data => {
    return server({
        method: 'post',
        url: '/user/login',
        data
    });
};

//验证码
export const signin = data => {
    return server({
        method: 'post',
        url: '/user/signin',
        data
    });
};
export const logout = params => {
    return server({
        method: 'get',
        url: '/user/logout',
        params
    });
};
export const register = data => {
    return server({
        method: 'post',
        url: '/user/register',
        data
    });
};



export const sendVerifyCode = data => {
    return server({
        method: 'post',
        url: '/user/sendVerifyCode',
        data
    });
};export const checkVerifyCode = data => {
    return server({
        method: 'post',
        url: '/user/checkVerifyCode',
        data
    });
};
export const addAddress = data => {
    return server({
        method: 'post',
        url: '/user/addAddress',
        data
    });
};


export const updateAddress = data => {
    return server({
        method: 'put',
        url: '/user/updateAddress',
        data
    });
};
export const deleteAddress = params => {
    return server({
        method: 'delete',
        url: '/user/deleteAddress',
        params
    });
};
export const myAddress = params => {
    return server({
        method: 'get',
        url: '/user/myAddress',
        params
    });
};
export const selectAddressById = params => {
    return server({
        method: 'get',
        url: '/user/userAddress/'+params.userAddressId,
        params
    });
};

export const my = params => {
    return server({
        method: 'get',
        url: '/user/my',
        params
    });
};
export const myBill = (params) => {
    return server({
        method: 'get',
        url: '/user/myBill',
        params
    });
};

export const invitees = (params) => {
    return server({
        method: 'get',
        url: '/user/invitees',
        params
    });
};

export const selectUser = () => {
    return server({
        method: 'get',
        url: '/user/my',
    });
};





export const userPoints = data => {
    return server({
        method: 'post',
        url: '/user/usePoints',
        data
    });
};


export const modify = data => {
    return server({
        method: 'put',
        url: '/user/modify',
        data
    });
};









