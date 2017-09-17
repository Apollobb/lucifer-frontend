import {login, logout, getInfo} from 'api/auth';

const user = {
    state: {
        code: '',
        token: localStorage.getItem('token'),
        islogin: false,
        userinfo: localStorage.getItem('userinfo'),
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_ISLOGIN: (state, islogin) => {
            state.islogin = islogin;
        },
        SET_USERINFO: (state, userinfo) => {
            state.userinfo = userinfo;
        },
        SET_TOKEN_TIME: (state, token_time) => {
            state.token_time = token_time;
        },
        LOGIN_SUCCESS: () => {
            console.log('login success')
        },
        LOGOUT_USER: state => {
            state.user = '';
        }
    },

    actions: {
        Login({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const cur_date = new Date().getTime();
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('token_time', cur_date);
                    commit('SET_TOKEN', response.data.token);
                    commit('SET_ISLOGIN', true);
                    commit('SET_TOKEN_TIME', cur_date);
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', ''),
                commit('SET_USERINFO', ''),
                localStorage.removeItem('token');
                localStorage.removeItem('userinfo');
                resolve();
            })
        },

        // 获取用户信息
        getUserInfo({commit},username) {
            return new Promise((resolve, reject) => {
                getInfo(username).then(response => {
                    const data = response.data.results[0];
                    commit('SET_USERINFO', data);
                    localStorage.setItem('userinfo', data);
                    localStorage.getItem('userinfo');
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        // 动态修改权限
        ChangeRole({commit}, role) {
            return new Promise(resolve => {
                commit('SET_ROLES', [role])
                resolve();
            })
        }
    }
};

export default user;
