import personData from './mock'
import Mock from 'mockjs'

Mock.mock("/user/info", 'get', function(){
    return Mock.mock(
        personData
    )
})
