import React, {Component} from 'react';
import './index.css'
import {useHistory } from 'react-router-dom'
import {Form, Input, Button, message} from 'antd';
import { UserOutlined ,LockOutlined } from '@ant-design/icons';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 24,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 0,
        span: 24,
    },
};



function Login () {
    const history = useHistory();
    const onFinish = (values) => {
        const {username,password} = values
        console.log('成功了',username,password)
        if(username === password){
            message.success('登陆成功')
            let storage=window.localStorage;
            storage['user'] = username
            history.push('/')
        }else {
            message.error("登陆失败")
        }
    };
    
    
        
        return (
            <div className="login">
                <header className="login-header">
                    <h1>云盘</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder={"Username"}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="password"/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" className="login-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    
}

export default Login;