import React,{PureComponent} from "react"
import {Link} from 'react-router-dom'
import DB from '../../DB'
import moment from 'moment'
import Header from '../../Component/Header'
import {Tag,Button,message} from 'antd'

class Detail extends PureComponent {

    constructor(props){
        super(props)
        const {id} = props.match.params
        this.state = {
            id,
            title:'',
            content:'',
            create_time:null,
            type:'',
            author:false,
        }
    }

    componentDidMount(){
        const {id} = this.state
        DB.Article.Detail({
            id,
        }).then((data)=>{
            this.setState(data)
        },({errorMsg})=>{
            message.error(errorMsg)
        })
    }

    render() {
        const {title,content,create_time,id,type,author} = this.state
        return [
            <Header key='header'/>,
            <section key='detail' id='detail'>
                <header>{title}</header>
                {
                    type.split(',').map(it=><Tag>{it}</Tag>)
                }
                <time>{create_time&&moment(create_time).format('YYYY-MM-DD HH:mm:ss')}</time>
                <div className='content'
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
