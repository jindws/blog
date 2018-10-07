import React from "react"
import {Link} from 'react-router-dom'
import DB from '../../DB'
import moment from 'moment'
import Header from '../../Component/Header'

class Detail extends React.PureComponent {

    constructor(props){
        super(props)
        const {id} = props.match.params
        this.state = {
            id,
            title:'',
            content:'',
            create_time:null,
        }
    }

    componentDidMount(){
        const {id} = this.state
        DB.Article.Detail({
            id,
        }).then(({title,content,create_time})=>{
            this.setState({
                title,
                content,
                create_time,
            })
        },({errorMsg})=>{
            console.log(errorMsg)
        })
    }

    render() {
        const {title,content,create_time,id} = this.state
        return [
            <Header key='header'/>,
            <section key='detail' id='detail'>
                    <header>{title}</header>
                    <time>{create_time&&moment(create_time).format('YYYY-MM-DD HH:mm:ss')}</time>
                    <div className='content'
                        dangerouslySetInnerHTML = {{ __html: content}}
                    />
                    <a href={`/operate/${id}`}>编辑</a>
            </section>,

        ]
    }
}

export default Detail
