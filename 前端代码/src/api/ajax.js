import axios from "axios";
import {message} from "antd";
// const baseUrl = 'http://localhost:3000'
const baseUrl = ''
export default function ajax(url,data={},type='GET'){
    return new Promise((resolve, reject)=>{
            let promise
            if(type === 'GET'){
                promise = axios.get(baseUrl+url,{
                    params:data
                })
            }else {
                promise = axios.post(baseUrl+url,data)
            }
            promise.then(response=>{
                resolve(response.data)
            }).catch(error=>{
                message.error("请求出错了")
            })
        }
    )

}