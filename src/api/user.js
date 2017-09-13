import fetch from 'utils/fetch';
import apiURL from '@/config'

//users
export function postUser(data) {
    return fetch({
        url: apiURL.users,
        method: 'post',
        data
    });
}

export function getUserList(query) {
    return fetch({
        url: apiURL.users,
        method: 'get',
        params: query
    });
}

export function putUser(id, data) {
    return fetch({
        url: apiURL.staffmodify + id,
        method: 'put',
        data
    });
}

export function deleteUser(id) {
    return fetch({
        url: apiURL.staffmodify + id,
        method: 'delete',
    });
}


//groups
export function postGroup(data) {
    return fetch({
        url: apiURL.groups,
        method: 'post',
        data
    });
}

export function getGroupList(query) {
    return fetch({
        url: apiURL.groups,
        method: 'get',
        params: query
    });
}

export function putGroup(id, data) {
    return fetch({
        url: apiURL.groupmodify + id,
        method: 'put',
        data
    });
}

export function deleteGroup(id) {
    return fetch({
        url: apiURL.groupmodify + id,
        method: 'delete',
    });
}

//roles
export function postRole(data) {
    return fetch({
        url: apiURL.roles,
        method: 'post',
        data
    });
}

export function getRoleList(query) {
    return fetch({
        url: apiURL.roles,
        method: 'get',
        params: query
    });
}

export function putRole(id, data) {
    return fetch({
        url: apiURL.rolemodify + id,
        method: 'put',
        data
    });
}

export function deleteRole(id) {
    return fetch({
        url: apiURL.rolemodify + id,
        method: 'delete',
    });
}

//staffroles
export function postStaffRole(data) {
    return fetch({
        url: apiURL.staffroles,
        method: 'post',
        data
    });
}

export function getStaffRoleList(query) {
    return fetch({
        url: apiURL.staffroles,
        method: 'get',
        params: query
    });
}

export function putStaffRole(id, data) {
    return fetch({
        url: apiURL.staffrolemodify + id,
        method: 'put',
        data
    });
}

export function deleteStaffRole(id) {
    return fetch({
        url: apiURL.staffrolemodify + id,
        method: 'delete',
    });
}