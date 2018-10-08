import React from "react"
import {render} from 'react-dom'
import ReactQuill from 'react-quill'
import Header from '../../Component/Header'
import DB from '../../DB'
import { Button,Select,message} from 'antd'

const {Option} = Select

class Operate extends React.PureComponent {
    constructor(props) {
        super(props)
        const children = [];

        for (let itm of typelist.split(',')) {
            children.push(<Option key={itm}>{itm}</Option>);
        }

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
            type:[],
            children,
        }
    }

    handleChange(content) {
        this.setState({content})
    }

    _operate(){
        const {title,content,type} = this.state
        if(defaultid){
            DB.Article.Update({
                id:defaultid,
                title,
                content,
                type,
            }).then(data=>{
                message.success('修改成功');
            },({errorMsg})=>{
                message.error(errorMsg);
            })
            return
        }

        DB.Article.Create({
            title,
            content,
            type,
        }).then(data=>{
            message.success('操作成功');
            location.replace('/')
        },({errorMsg})=>{
            message.error(errorMsg);
        })
    }

    componentDidMount(){
        if(defaultid){
            DB.Article.Detail({
                id:defaultid
            }).then(({type,...data})=>{
                this.setState({
                    ...data,
                    type:type.split(','),
                })
            })
        }
    }

    render() {
        const {title, content,modules,children,type} = this.state
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
                {/* <a className='publish' href='javascript:;' >发布</a> */}
                <Select
                    mode="tags"
                    style={{ width: '30%',marginRight:'10%' }}
                    placeholder="添加分类"
                    value={type}
                    onChange={type=>{
                        this.setState({
                            type
                        })
                    }}
                  >
                    {children}
              </Select>
                <Button
                    type="primary"
                    onClick={this._operate.bind(this)}>发布</Button>
            </section>
        ]
    }
}

render(<Operate/>, document.getElementById('root'))
