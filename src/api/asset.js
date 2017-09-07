import fetch from 'utils/fetch';
import apiURL from '@/config'

//hosts
export function postHost(data) {
    return fetch({
        url: apiURL.servers,
        method: 'post',
        data
    });
}
export function getHostList(query) {
    return fetch({
        url: apiURL.servers,
        method: 'get',
        params: query
    });
}

export function putHost(id, data) {
    console.log(data);
    return fetch({
        url: apiURL.servermodify + id + '/',
        method: 'put',
        data
    });
}

export function deleteHost(id) {
    return fetch({
        url: apiURL.servermodify + id,
        method: 'delete',
    });
}


// idcs
export function postIdc(data) {
    return fetch({
        url: apiURL.idcs,
        method: 'post',
        data
    });
}

export function getIdcList(query) {
    return fetch({
        url: apiURL.idcs,
        method: 'get',
        params: query
    });
}

export function putIdc(id, data) {
    return fetch({
        url: apiURL.idcmodify + id + '/',
        method: 'put',
        data
    });
}

export function deleteIdc(id) {
    return fetch({
        url: apiURL.idcmodify + id,
        method: 'delete',
    });
}