
let childRoute = [

 
    {
        path: 'os/list',
        component: resolve => require(["@/components/linuxPkgMagr/os"], resolve),
        name: 'os',
        meta: {
            menuName: 'os'
        }
    },

    {
        path: '*',
        redirect:'os/list'
    }
]
let route = [
    {
        path: '/',
        component: resolve => require(['@/components/account/login'], resolve),
        name: 'login',
    },
    {
        path: '/main',
        name: 'main',
        component: resolve => require(['@/components/home'], resolve),
        
        children: childRoute,
        redirect:'/main/os/list'    
    },
    // {
    //     path: '/os',
    //     name: 'os',
    //     component: resolve => require(['@/components/linuxPkgMagr/os'], resolve)  
    // },
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