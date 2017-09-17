import {login, logout, getInfo} from 'api/auth';

const user = {
    state: {
        code: '',
        token: localStorage.getItem('token'),
        islogin: false,
        username: localStorage.getItem('username'),
        avatar: localStorage.getItem('avatar'),
        roles: localStorage.getItem('roles'),
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
        SET_TOKEN_TIME: (state, token_time) => {
            state.token_time = token_time;
        },
        SET_USERNAME: (state, username) => {
            state.token_time = username;
        },
        SET_AVATAR: (state, avatar) => {
            state.token_time = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.token_time = roles;
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
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('token_time', cur_date);
                    localStorage.setItem('username', userInfo.username);
                    commit('SET_USERNAME', userInfo.username);
                    commit('SET_TOKEN', response.data.token);
                    commit('SET_TOKEN_TIME', cur_date);
                    commit('SET_ISLOGIN', true);
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
                commit('SET_USERNAME', ''),
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                resolve();
            })
        },

        // 获取用户信息
        getUserInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getInfo(state.username).then(response => {
                    const userinfo = response.data.results[0];
                    localStorage.setItem('avatar', userinfo.avatar);
                    localStorage.setItem('roles', userinfo.roles);
                    commit('SET_AVATAR', userinfo.avatar);
                    commit('SET_ROLES', userinfo.roles);
                    resolve();
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
