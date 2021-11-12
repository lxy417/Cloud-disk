import ajax from './ajax'

// 获取文件列表
export const reqAllFiles = () =>
    ajax('https://6d37dbf4ca674819a048480016fc65f4.apig.cn-north-1.huaweicloudapis.com/all_list')

// 下载文件
export const reqDownLoadFile = (fileName) =>
    ajax('https://6d37dbf4ca674819a048480016fc65f4.apig.cn-north-1.huaweicloudapis.com/download', 
    fileName
    , 'POST')

// 删除文件
export const reqDelFile = (fileName) =>
    ajax('https://6d37dbf4ca674819a048480016fc65f4.apig.cn-north-1.huaweicloudapis.com/del', 
    fileName
    , 'POST')

// 上传文件前得到认证
export const reqBeforeUploadFile = () =>
    ajax('https://6d37dbf4ca674819a048480016fc65f4.apig.cn-north-1.huaweicloudapis.com/upload'
    , 'GET')


