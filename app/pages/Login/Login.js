import React,{PureComponent} from "react"
import DB from '../../DB'
import Header from '../../Component/Header'
import {Button,Input,message} from 'antd'
import md5 from 'md5'

class Login extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            type:0,//0登录,1注册
        }
    }

    _login(){
        const {username,password,type} = this.state
        if(type){
            return this._type(0)
        }
        if(!username||!password){
            return message.error('请输入用户名或密码')
        }
        DB.Admin.Login({
            username,
            password:md5(password),
        }).then(()=>{
            location.replace('/')
        },({errorMsg})=>{
            message.error(errorMsg)
        })
    }

    _regist(){
        const {username,password,repassword,type} = this.state
        if(!type){
            return this._type(1)
        }
        if(!username||!password){
            return message.error('请输入用户名或密码')
        }
        if(password!==repassword){
            return message.error('两次密码输入不一致')
        }

        DB.Admin.Create({
            username,
            password:md5(password),
        }).then(()=>{
            message.success('注册成功')
            setTimeout(()=>location.replace('/'),1000)
        },({errorMsg})=>{
            message.error(errorMsg)
        })
    }

    _type(type){
        this.setState({
            type,
            username:'',
            password:'',
            repassword:'',
        })
    }

    render() {
        const {username,password,repassword,type} = this.state

        return [
            <Header/>,
            <section id='login'>
                <Input addonBefore="用户名"
                    value={username}
                    onChange={({target})=>{
                        this.setState({
                            username : target.value
                        })
                    }}
                    placeholder='请输入用户名'/>
                <Input addonBefore="密&nbsp;&nbsp;&nbsp;码" type='password'
                    value={password}
                    onChange={({target})=>{
                        this.setState({
                            password : target.value
                        })
                    }}
                    placeholder='请输入密码'/>
                <Input
                    addonBefore="重复密码"
                    type='password'
                    value={repassword}
                    onChange={({target})=>{
                        this.setState({
                            repassword : target.value
                        })
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
                        onClick={this._login.bind(this)}>
                        {
                            type? '我要登录':'登录'
                        }</Button>
                    <Button
                        type={
                            type? 'primary':'dashed'
                        }
                        // onClick={this._type.bind(this,1)}
                        onClick={this._regist.bind(this)}
                        >{type? '确认注册':'我要注册'}</Button>
                </div>
            </section>
        ]
    }
}

export default Login
