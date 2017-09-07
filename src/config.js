/**
 * Created by Itimor on 2017/7/12.
 */

let CONFIG;
// if (process.env.NODE_ENV === 'development') {
if (process.env.NODE_ENV === 'production') {
    CONFIG = {
        apiUrl: "",
    };
} else {
    CONFIG = {
        apiUrl: "http://172.16.33.140",
    };
}

//接口API根地址
const url = CONFIG.apiUrl;

module.exports = {
    apiUrl: url,

    //数据分页限制
    LIMIT: 10,

    //本地上传到服务器
    uploads: `${url}/api/upload/`,

    //登录
    login: `${url}/login/`,
    changePassword: `${url}/api/changepasswd/`,

    //用户
    users: `${url}/userpermission/staffs/`,
    staffmodify: `${url}/userpermission/staffmodify/`,

    groups: `${url}/userpermission/groups/`,
    groupmodify: `${url}/userpermission/groupmodify/`,

    roles: `${url}/userpermission/roles/`,
    rolemodify: `${url}/userpermission/rolemodify/`,

    staffroles: `${url}/userpermission/staffroles/`,
    staffrolemodify: `${url}/userpermission/staffrolemodify/`,

    rolepermissions: `${url}/userpermission/rolepermissions/`,
    rolepermissionmodify: `${url}/userpermission/rolepermissionmodify/`,

    staffpermissions: `${url}/userpermission/staffpermissions/`,
    staffpermissionmodify: `${url}/userpermission/staffpermissionmodify/`,


    //主机
    servers: `${url}/servermanage/servers/`,
    servermodify: `${url}/servermanage/servermodify/`,

    idcs: `${url}/servermanage/idcs/`,
    idcmodify: `${url}/servermanage/idcmodify/`,

    //项目服务
    projects: `${url}/servermanage/projects/`,
    projectmodify: `${url}/servermanage/projectmodify/`,

    services: `${url}/servermanage/services/`,
    servicemodify: `${url}/servermanage/servicemodify/`,

    //工具
    //巡检
    serverinspections: `${url}/inspectionmanage/serverinspections/`,
    //支付回调dns
    payhosts: `${url}/thirdmanage/payhosts/`,
    payhostmodify: `${url}/thirdmanage/payhostmodify/`,

    paydnses: `${url}/thirdmanage/paydnses/`,
    paydnsmodify: `${url}/thirdmanage/paydnsmodify/`,

    //值班
    dutysheets: `${url}/dailymanage/dutysheets/`,
    dutysheetmodify: `${url}/dailymanage/dutysheetmodify/`,

    //日志分析
    //用户设备查询
    agents: `${url}/loganalysis/agents/`,
    //用户地区查询
    areas: `${url}/loganalysis/areas/`,
    //用户访问cdn节点查询
    cdns: `${url}/loganalysis/cdns/`,
    //用户访问域名查询
    domainnames: `${url}/loganalysis/domainnames/`,
    //用户访问状态查询
    statuses: `${url}/loganalysis/statuses/`,
    //Nginx后台转发查询
    upstreams: `${url}/loganalysis/upstreams/`,


    //操作日志
    operaterecords: `${url}/operaterecord/operaterecords/`,
};