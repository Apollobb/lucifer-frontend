import {login, logout, getInfo} from 'api/auth';

const user = {
    state: {
        code: '',
        islogin: false,
        userinfo: localStorage.getItem('userinfo'),
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code;
        },
        SET_ISLOGIN: (state, islogin) => {
            state.islogin = !!islogin;
        },
        SET_USERINFO: (state, userinfo) => {
            state.userinfo = userinfo;
            localStorage.setItem('userinfo', JSON.stringify(userinfo));
        },
        SET_LOGOUT: state => {
            state.userinfo = '';
            localStorage.removeItem('userinfo');
        }
    },

    actions: {
        Login({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const data = response.data;
                    commit('SET_ISLOGIN', true);
                    commit('SET_USERINFO', data);
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({commit}) {
            return new Promise((resolve, reject) => {
                commit('SET_ISLOGIN', false);
                commit('SET_LOGOUT');
                resolve();
            })
        }
    }
};

export default user;
