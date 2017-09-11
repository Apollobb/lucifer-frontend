import fetch from 'utils/fetch';
import apiURL from '@/config'

//users
export function postStaffPermissions(data) {
    return fetch({
        url: apiURL.staffpermissions,
        method: 'post',
        data
    });
}

export function getStaffPermissions(query) {
    return fetch({
        url: apiURL.staffpermissions,
        method: 'get',
        params: query
    });
}

export function putStaffPermissions(id, data) {
    console.log(data);
    return fetch({
        url: apiURL.staffpermissionmodify + id + '/',
        method: 'patch',
        data
    });
}

export function deleteStaffPermissions(id) {
    return fetch({
        url: apiURL.staffpermissionmodify + id,
        method: 'delete',
    });
}

//roles
export function postRolePermissions(data) {
    return fetch({
        url: apiURL.rolepermissions,
        method: 'post',
        data
    });
}

export function getRolePermissions(query) {
    return fetch({
        url: apiURL.rolepermissions,
        method: 'get',
        params: query
    });
}

export function putRolePermissions(id, data) {
    console.log(data);
    return fetch({
        url: apiURL.rolepermissionmodify + id + '/',
        method: 'patch',
        data
    });
}

export function deleteRolePermissions(id) {
    return fetch({
        url: apiURL.rolepermissionmodify + id,
        method: 'delete',
    });
}