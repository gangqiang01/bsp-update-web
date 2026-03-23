
let childRoute = [

    {
        path: 'user/list',
        component: resolve => require(['@/components/user/list'], resolve),
        name: 'userList',
        meta:{
            menuName: 'userList'
        }
    },
 
    {
        path: 'linuxOs/list',
        component: resolve => require(["@/components/linuxPkgMagr/os"], resolve),
        name: 'linuxOs',
        meta: {
            menuName: 'linux-os'
        }
    },
    {
        path: "linuxOs/add",
        component: resolve => require(["@/components/linuxPkgMagr/osAdd"], resolve),
        name: "linuxOsAdd",
        meta: {
        menuName: "linux-osAdd",
        },
    },

    {
        path: '*',
        redirect:'linuxOs/list'
    }
]
let route = [
    {
        path: '/',
        component: resolve => require(['@/components/account/login'], resolve),
        name: 'login',
        beforeEnter: (to, from, next) => {
            cookie.setCookie("EIToken",'',0)
            next();
        }
    },
    {
        path: '/main',
        name: 'main',
        component: resolve => require(['@/components/home'], resolve),
        beforeEnter: (to, from, next) => {
            let username = cookie.getCookie("apphub_username");
            let logintime = cookie.getCookie("apphub_logintime");
            let EIToken = cookie.getCookie("EIToken");
            if(EIToken === ""){
                next("/")
            }else{
                next()
            }
        },
        children: childRoute,
        redirect:'/main/linuxOs/list'    
    },
    {
        path: '*',
        redirect:'/'
    }
    
]

export default route