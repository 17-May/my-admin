import {
    request
} from "./request"

//登录请求
export const reqLogin = ({
    username,
    password
}) => request({
    url: 'login',
    method: 'post',
    data: {
        username,
        password
    }
})
//获取左侧菜单栏信息
export const reqMenu = () => request({
    url: 'menus',
    method: 'get'
})
//获取用户列表数据
export const reqUsers = (params) => request({
    url: 'users',
    method: 'get',
    params
})