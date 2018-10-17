import React,{Component} from "react"
import {Link} from 'react-router-dom'
import DB from '../../DB'
import moment from 'moment'
import {Tag,message,Pagination,Spin,Skeleton} from 'antd'

import {observable,action} from 'mobx';
import { observer } from "mobx-react"

const _data = observable({
    pageNum:1,
    list:[],
    count:0,
    pageSize:10,
    loading:true,
})

const _change = action((name,value)=>_data[name] = value)

@observer class Home extends Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.getList()
    }

    getList(){
        const {pageNum,pageSize} = _data
        _change('loading',true)
        DB.Article.List({
            pageSize,
            pageNum,
        }).then(({count,list})=>{
            _change('count',count)
            _change('list',list)
            _change('loading',false)
        },({errorMsg})=>{
            message.error(errorMsg)
        })
    }

    render() {
        const {list,count,loading} = _data
        return [
            <header key='header' className='header'>
                <div className='animated fadeIn'>
                    A brand new start.
                </div>
            </header>,

            <Spin key='section' spinning={loading}>
                <section key='section' className='section contain'>
                    <Skeleton loading = {loading} paragraph={{ rows: 20 }}>
                        {
                            list.map(itm=>{
                                return <dl key={itm.id}>
                                    <dt>
                                        <a href={`/detail/${itm.id}`}>{itm.title}</a>
                                    </dt>
                                    <dd className='content'
                                        dangerouslySetInnerHTML = {{ __html: itm.content||'暂无预览'}}
                                    />

                                    <dd className='time'>
                                        {
                                            itm.type&&itm.type.split(',').map(it=><Tag>{it}</Tag>)
                                        }
                                        {moment(itm.create_time).format('YYYY-MM-DD HH:mm:ss')}
                                    </dd>
                                </dl>
                            })
                        }
                    </Skeleton>
                </section>
                <Pagination total={count}
                    onChange = {pageNum=>{
                        _change('pageNum',pageNum)
                        this.getList()
                    }}
                    onShowSizeChange={(pageNum, pageSize)=>{
                    _change('pageNum',pageNum)
                    _change('pageSize',pageSize)
                    this.getList()
                }} showSizeChanger showQuickJumper />
            </Spin>,
        ]
    }
}

export default Home
