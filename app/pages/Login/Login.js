import React,{PureComponent} from "react"
// import {Link} from 'react-router-dom'
import DB from '../../DB'
import Header from '../../Component/Header'
import {Button,Input,message} from 'antd'
import md5 from 'md5'

class Login extends PureComponent {

    constructor(props){
        super(props)
    }

    _login(){
        const {username,password} = this
        DB.Admin.Login({
            username,
            password:md5(password),
        }).then(()=>{
            location.replace('/')
        },({errorMsg})=>{
            message.error(errorMsg)
        })
    }

    render() {
        return [
            <Header/>,
            <section id='login'>
                <Input addonBefore="用户名"
                    onChange={({target})=>this.username = target.value}
                    placeholder='请输入用户名'/>
                <Input addonBefore="密&nbsp;&nbsp;&nbsp;码" type='password'
                    onChange={({target})=>this.password = target.value}
                    placeholder='请输入密码'/>
                <div className='btn'>
                    <Button type="primary" onClick={this._login.bind(this)}>登录</Button>
                    <Button type="dashed" disabled>注册</Button>
                </div>
            </section>
        ]
    }
}

export default Login
