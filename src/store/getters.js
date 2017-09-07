const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  islogin: state => state.user.islogin,
  userinfo: state => state.user.userinfo,
};
export default getters
