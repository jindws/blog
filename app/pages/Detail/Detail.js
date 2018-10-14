import React,{Component} from "react"
import {Link} from 'react-router-dom'
import DB from '../../DB'
import moment from 'moment'
import Header from '../../Component/Header'
import {Tag,Button,message} from 'antd'

import {observable,action} from 'mobx';
import { observer } from "mobx-react"

@observer class Detail extends Component {

    @observable title
    @observable content
    @observable create_time
    @observable author

    constructor(props){
        super(props)
        this.id = props.match.params.id
    }

    componentDidMount(){
        const {id} = this
        DB.Article.Detail({
            id,
        }).then((data)=>{
            Object.assign(this,data)
        },({errorMsg})=>{
            message.error(errorMsg)
        })
    }

    render() {
        const {title,content,create_time,id,type = '',author} = this
        return [
            <Header key='header'/>,
            <section key='detail' id='detail' className='ql-snow'>
                <header>{title}</header>
                {
                    type&&type.split(',').map(it=><Tag>{it}</Tag>)
                }
                <time>{create_time&&moment(create_time).format('YYYY-MM-DD HH:mm:ss')}</time>
                <div className='content ql-editor'
                    dangerouslySetInnerHTML = {{ __html: content}}
                />
                <a href={`/operate/${id}`}
                style={{display:(author?'':'none')}}
                ><Button shape="circle" icon="edit" /></a>
            </section>,

        ]
    }
}

export default Detail
