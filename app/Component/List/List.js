import React, {Component} from "react"
import {Tag,message,Pagination,Spin,Skeleton} from 'antd'
import {observable,action} from 'mobx';
import { observer ,inject} from "mobx-react"
import DB from '../../DB'
import moment from 'moment'

const _data = observable({
    pageNum:1,
    list:[],
    count:0,
    pageSize:10,
    loading:true,
})

const _change = action((name,value)=>_data[name] = value)


@inject("store")
export default @observer class List extends Component{

    componentDidMount(){
        this.getList()
    }

    getList(){
        const {pageNum,pageSize} = _data
        const {type} = this.props
        _change('loading',true)
        DB.Article.List({
            pageSize,
            pageNum,
            type,
        }).then(({count,list})=>{
            _change('count',count)
            _change('list',list)
            _change('loading',false)
        },({errorMsg})=>{
            message.error(errorMsg)
        })
    }

    render(){
        const {list,count,loading} = _data
        const {marginTop=0} = this.props
        return <Spin key='section' spinning={loading}>
            <section key='section'
                style={{
                    marginTop,
                }}
                className='section contain'>
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
                                        itm.type&&itm.type.split(',').map(it=><Tag onClick={()=>{
                                            location.href = `/type/${it}`
                                        }}>{it}</Tag>)
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
        </Spin>
    }
}
