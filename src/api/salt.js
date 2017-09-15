import fetch from 'utils/fetch';
import apiURL from '@/config'

// cmdrun
export function saltCmdrun(data) {
  return fetch({
    url: apiURL.cmdrun,
    method: 'post',
    data
  });
}