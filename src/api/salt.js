import fetch from 'utils/fetch';
import apiURL from '@/config'

// cmdrun
export function saltCmdrun(data) {
    console.log(data);
  return fetch({
    url: apiURL.cmdrun,
    method: 'post',
    data
  });
}