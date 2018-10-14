import React,{Component} from "react"
import DB from '../../DB'
import Header from '../../Component/Header'
import {Button,Input,message} from 'antd'
import md5 from 'md5'

import {observable,action} from 'mobx';
import { observer } from "mobx-react"

@observer
class Login extends Component {

    @observable loading
    @observable username
    @observable password
    @observable repassword
    @observable type

    constructor(props){
        super(props)
    }

    _login(){
        const {username,password,type} = this
        if(type){
            return this._type(0)
        }
        if(!username||!password){
            return message.error('请输入用户名或密码')
        }
        this.loading = true
        DB.Admin.Login({
            username,
            password:md5(password),
        }).then(()=>{
            location.replace('/')
        },({errorMsg})=>{
            this.loading = false
            message.error(errorMsg)
        })
    }

    _regist(){
        const {username,password,repassword,type} = this
        if(!type){
            return this._type(1)
        }
        if(!username||!password){
            return message.error('请输入用户名或密码')
        }
        if(password!==repassword){
            return message.error('两次密码输入不一致')
        }
        this.loading = true

        DB.Admin.Create({
            username,
            password:md5(password),
        }).then(()=>{
            message.success('注册成功')
            setTimeout(()=>location.replace('/'),1000)
        },({errorMsg})=>{
            this.loading = false
            message.error(errorMsg)
        })
    }

    _type(type){
        this.type = type
        this.username = ''
        this.password = ''
        this.repassword = ''
    }

    render() {
        const {username,password,repassword,type,loading} = this

        return [
            <Header/>,
            <section id='login'>
                <Input addonBefore="用户名"
                    value={username}
                    onChange={({target})=>{
                        this.username = target.value
                    }}
                    placeholder='请输入用户名'/>
                <Input addonBefore="密&nbsp;&nbsp;&nbsp;码"
                    type='password'
                    value={password}
                    onChange={({target})=>{
                        this.password = target.value
                    }}
                    placeholder='请输入密码'/>
                <Input
                    addonBefore="重复密码"
                    type='password'
                    value={repassword}
                    onChange={({target})=>{
                        this.repassword = target.value
                    }}
                    style={{
                        display:(type?'':'none')
                    }}
                    placeholder='请重复密码'/>
                <div className='btn'>
                    <Button
                        type={
                            type? 'dashed':'primary'
                        }
                        loading = {!type&&loading}
                        onClick={this._login.bind(this)}>
                        {
                            type? '我要登录':'登录'
                        }</Button>
                    <Button
                        type={
                            type? 'primary':'dashed'
                        }
                        loading = {type&&loading}
                        onClick={this._regist.bind(this)}
                        >{type? '确认注册':'我要注册'}</Button>
                </div>
            </section>
        ]
    }
}

export default Login
