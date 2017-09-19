import fetch from 'utils/fetch';
import apiURL from '@/config'

// cmdrun
export function postCmdrun(data) {
  return fetch({
    url: apiURL.saltcmdrun,
    method: 'post',
    data
  });
}

export function getCmdrun(query) {
    return fetch({
        url: apiURL.saltcmdrun,
        method: 'get',
        params: query
    });
}