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
//改变用户状态
export const reqStatus = (uId, type) => request({
    url: `users/${uId}/state/${type}`,
    method: 'put'
})
//添加用户
export const reqAddUSer = (data) => request({
    url: 'users',
    method: 'post',
    data
})
//修该用户
export const reqAlterUser = (id, email, mobile) => request({
    url: `users/${id}`,
    method: 'put',
    data: {
        email,
        mobile
    }
})

//删除用户
export const reqDelUser = id => request({
    url: `users/${id}`,
    method: 'delete'
})
//获取角色列表 roles
export const reqRoleList = () => request({
    url: "roles",
    method: "get"
})
//分配角色
export const reqAllotRole = (id, rid) => request({
    url: `users/${id}/role`,
    method: "put",
    data: {
        rid
    }
})

//所有权限列表
export const reqRights = (type) => request({
    url: `rights/${type}`,
    method: 'get'
})
//删除指定权限
export const regDelRights = (roleId, rightId) => request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
})
//添加角色 roleName,roleDesc
export const regAddRole = (data) => request({
    url: 'roles',
    method: 'post',
    data
})
//根据id查询角色 roles/:id
export const regSearchRole = (id) => request({
    url: `roles/${id}`,
    method: 'get',
})
//编辑角色 
export const regEditRole = (id, data) => request({
    url: `roles/${id}`,
    method: 'put',
    data
})
//删除角色 roles/:id
export const regDelRole = (id) => request({
    url: `roles/${id}`,
    method: 'delete',
})
//分配角色权限 roles/:roleId/rights
export const regAllotRole = (roleId, rids) => request({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: {
        rids
    }
})