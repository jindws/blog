import React, {Component} from "react"
import { Drawer,Button,Popconfirm,message,Input} from 'antd'
import DB from '../../DB'

import {observable,action} from 'mobx';
import { observer } from "mobx-react/custom"
const Search = Input.Search;

const _data = observable({
    show:false,
    username:'',
    status:0,//0? 1登录 2未登录
    list:[],
})

const _change = action((name,value)=>_data[name] = value)


export default @observer class _Drawer extends Component{

    componentDidMount(){
        DB.Type.List().then(({list})=>{
            _change('list',list)
        })
    }

    render(){
        const {show,username,status,list} = _data
        return [
            <Button
                style={{
                    position:'fixed',
                    right:'1vw',
                    top:'3vw',
                    zIndex: 10,
                }}
                onClick={()=>{
                    DB.Admin.Message().then(({username})=>{
                        _change('username',username)
                        _change('status',1)
                    },()=>{
                        _change('username','分类')
                        _change('status',2)
                    })
                    _change('show',true)
                }}
                type="dashed"
                icon="profile">更多</Button>,
            <Drawer
                 title={username}
                 placement="right"
                 closable={true}
                 onClose={()=>_change('show',false)}
                 visible={show}
               >
                  <Search
                      placeholder='按标题搜索'
                      onSearch={value =>{
                          if(!value.trim()){
                              return message.error('请先输入内容')
                          }
                          location.href = `/search/${value}`
                      }}
                  />
                 <Button
                     style={{
                         display:(status === 1?'':'none'),
                         marginRight:20,
                     }}
                     onClick={()=>location.href = '/operate'}
                     >写文章</Button>
                 <Button
                     type = 'primary'
                     onClick={()=>location.href = '/my'}
                     >我的文章</Button>
                 <div className='drawer_list'>
                     {
                         list.map(({type,sum})=>{
                             return <Button
                                 onClick={()=>{
                                     location.href = `/type/${type}`
                                 }}
                                 block>{type}({sum})</Button>
                         })
                     }
                 </div>
                 <div className='login_out' style={{
                     display:(status?'':'none')
                 }}>
                     <Button
                         style={{
                             display:(status === 2?'':'none')
                         }}
                         icon="login"
                         type="primary"
                         onClick={()=>location.href = '/login'}
                         >登录</Button>

                         <Popconfirm title="确认登出?"
                             onConfirm={()=>{
                                 DB.Admin.Logout()
                                 message.success('退出成功')
                                 _change('username','分类')
                                 _change('status',2)
                             }}
                             okText="确认"
                             cancelText="取消">
                             <Button
                                 style={{
                                     display:(status === 1?'':'none')
                                 }}
                                 type="danger"
                                 icon="logout"
                                 >登出</Button>
                         </Popconfirm>
                 </div>
           </Drawer>
        ]
    }
}
