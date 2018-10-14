import React,{Component} from "react"
import {render} from 'react-dom'
import ReactQuill from 'react-quill'
import Header from '../../Component/Header'
import DB from '../../DB'
import { Button,Select,message,Input} from 'antd'

const {Option} = Select

import {observable,action} from 'mobx';
import { observer } from "mobx-react"

@observer class Operate extends Component {

    modules = {
      toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [ 'bold', 'italic', 'underline','strike', {color:[]},{background:[]}],
        [{align:[]},{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image','video',{script:'sub'},{script:'super'}],
        ['blockquote','clean']
      ],
    }

    @observable content = ''
    @observable title
    @observable children
    @observable type = []

    constructor(props) {
        super(props)
        const children = [];

        for (let itm of typelist.split(',')) {
            children.push(<Option key={itm}>{itm}</Option>);
        }

        this.children = children
    }


    _operate(){
        const {title,content,type} = this
        if(!title||!content){
            message.error('请输入标题或内容')
            return
        }
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
                this.type = type.split(',')
                Object.assign(this,data)
            })
        }
    }

    render() {
        const {title, content,modules,children,type} = this
        return [
            <Header key='header'/>,
            <section id="operate" key='operate'>
                <div className='title'>
                    <label>标题</label>
                        <Input
                            placeholder='请输入标题'
                            value={title}
                            onChange={({target}) => {
                                this.title = target.value
                            }}
                        />
                </div>
                <ReactQuill
                    modules={modules}
                    value={content} onChange={content=>this.content = content}/>
                <Select
                    mode="tags"
                    style={{ width: '30%',marginRight:'10%' }}
                    placeholder="添加分类"
                    value={type}
                    onChange={type=>{
                        this.type = type
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
