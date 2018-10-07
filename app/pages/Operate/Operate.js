import React from "react"
import {render} from 'react-dom'
import ReactQuill from 'react-quill'
import Header from '../../Component/Header'
import DB from '../../DB'

class Operate extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            title: '',
            modules: {
              toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [ 'bold', 'italic', 'underline','strike', {color:[]},{background:[]}],
                [{align:[]},{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image','video',{script:'sub'},{script:'super'}],
                ['blockquote','clean']
              ],
            },
        }
    }

    handleChange(content) {
        this.setState({content})
    }

    _operate(){
        const {title,content} = this.state
        if(defaultid){
            DB.Article.Update({
                id:defaultid,
                title,
                content,
            }).then(data=>{

            },({errorMsg})=>{
                console.log(errorMsg)
            })
            return
        }

        DB.Article.Create({
            title,
            content,
        }).then(data=>{
            // location.replace('/operate/'+)
            location.replace('/')
        },({errorMsg})=>{
            console.log(errorMsg)
        })
    }

    componentDidMount(){
        if(defaultid){
            DB.Article.Detail({
                id:defaultid
            }).then(data=>{
                console.log(data)
                this.setState(data)
            })
        }
    }

    render() {
        const {title, content,modules} = this.state

        console.log(content)

        // console.log('&lt;p&gt;&lt;strong&gt;123123123&lt;/strong&gt;&lt;/p&gt;')

        return [
            <Header key='header'/>,
            <section id="operate" key='operate'>
                <div className='title'>
                    <label>标题</label>
                    <input type="text" onChange={({target}) => {
                            this.setState({title: target.value})
                        }} placeholder='请输入标题' value={title}/>
                </div>
                <ReactQuill
                    modules={modules}
                    value={content} onChange={this.handleChange.bind(this)}/>
                <a className='publish' href='javascript:;' onClick={this._operate.bind(this)}>发布</a>
            </section>
        ]
    }
}

render(<Operate/>, document.getElementById('root'))
