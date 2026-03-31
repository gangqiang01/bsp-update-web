
let childRoute = [

 
    {
        path: 'linuxOs/list',
        component: resolve => require(["@/components/linuxPkgMagr/os"], resolve),
        name: 'linuxOs',
        meta: {
            menuName: 'linux-os'
        }
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
    },
    {
        path: '/os',
        name: 'os',
        component: resolve => require(['@/components/linuxPkgMagr/os'], resolve)  
    },
    {
        path: '*',
        redirect:'/'
    }
    // {
    //     path: '/',
    //     component: resolve => require(['@/components/linuxPkgMagr/os'], resolve),
    //     name: 'os',
    // },
    // {
    //     path: '*',
    //     redirect:'/'
    // }
    
]

export default route