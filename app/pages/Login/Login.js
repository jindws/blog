import React,{Component} from "react"
import DB from '../../DB'
import Header from '../../Component/Header'
import {Button,Input,message} from 'antd'
import md5 from 'md5'

import {observable,action} from 'mobx';
import { observer ,inject} from "mobx-react/custom"

const _data = observable({
    // loading:false,
    // username:'',
    // password:'',
    // repassword:'',
    // type:0,
})

const _change = action((name,value)=>_data[name] = value)

const _clear = action(type=>{
    Object.assign(_data,{
        type,
        username:'',
        password:'',
        repassword:'',
    })
})

@inject('store')
@observer
class Login extends Component {

    constructor(props){
        super(props)
        this.props.store._change('title','登录')
    }

    _login(){
        const {username,password,type} = _data
        if(type){
            return _clear(0)
        }
        if(!username||!password){
            return message.error('请输入用户名或密码')
        }
        _change('loading',true)
        DB.Admin.Login({
            username,
            password:md5(password),
        }).then(()=>{
            location.replace('/')
        },({errorMsg})=>{
            _change('loading',false)
            message.error(errorMsg)
        })
    }

    _regist(){
        const {username,password,repassword,type} = _data
        if(!type){
            return _clear(1)
        }
        if(!username||!password){
            return message.error('请输入用户名或密码')
        }
        if(password!==repassword){
            return message.error('两次密码输入不一致')
        }
        _change('loading',true)

        DB.Admin.Create({
            username,
            password:md5(password),
        }).then(()=>{
            message.success('注册成功')
            setTimeout(()=>location.replace('/'),1000)
        },({errorMsg})=>{
            _change('loading',false)
            message.error(errorMsg)
        })
    }

    render() {
        const {username,password,repassword,type,loading} = _data

        return [
            <Header/>,
            <section id='login'>
                <em>{type? '注册':'登录'}</em>,
                <Input addonBefore="用户名"
                    value={username}
                    onChange={({target})=>{
                        _change('username',target.value)
                    }}
                    placeholder='请输入用户名'/>
                <Input addonBefore="密&nbsp;&nbsp;&nbsp;码"
                    type='password'
                    value={password}
                    onChange={({target})=>{
                        _change('password',target.value)
                    }}
                    placeholder='请输入密码'/>
                <Input
                    addonBefore="重复密码"
                    type='password'
                    value={repassword}
                    onChange={({target})=>{
                        _change('repassword',target.value)

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
                        onClick={this._login}>
                        {
                            type? '我要登录':'登录'
                        }</Button>
                    <Button
                        type={
                            type? 'primary':'dashed'
                        }
                        loading = {type&&loading}
                        onClick={this._regist}
                        >{type? '确认注册':'我要注册'}</Button>
                </div>
            </section>
        ]
    }
}

export default Login
