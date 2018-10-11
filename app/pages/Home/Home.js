import React from "react"
import {Link} from 'react-router-dom'
import DB from '../../DB'
import moment from 'moment'
import {Tag,message} from 'antd'


class Home extends React.PureComponent {

    constructor(){
        super()
        this.state={
            pageNum:1,
            list:[],
            count:0,
        }
    }

    componentDidMount(){
        const {pageNum} = this.state
        DB.Article.List({
            pageSize:10,
            pageNum,
        }).then(({count,list})=>{
            this.setState({
                count,
                list,
            })
        },({errorMsg})=>{
            message.error(errorMsg)
        })
    }

    render() {
        const {count,list} = this.state
        return [
            <header key='header' className='header'>
                <div className='animated fadeIn'>
                    A brand new start.
                </div>
            </header>,
            <section key='section' className='section'>
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
                                    itm.type.split(',').map(it=><Tag>{it}</Tag>)
                                }
                                {moment(itm.create_time).format('YYYY-MM-DD HH:mm:ss')}
                            </dd>
                        </dl>
                    })
                }
            </section>
        ]
    }
}

export default Home
