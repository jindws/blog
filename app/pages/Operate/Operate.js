import React,{Component} from "react"
import {render} from 'react-dom'
import ReactQuill from 'react-quill'
import Header from '../../Component/Header'
import Footer from '../../Component/Footer'
import DB from '../../DB'
import { Select,message,Input,Spin,Modal,Button} from 'antd'

const {Option} = Select
const {confirm} = Modal;

import {observable,action} from 'mobx';
import { observer,inject,Provider} from "mobx-react/custom"

const _data = observable({
    content:'',
    children:[],
    type:[],
    loading:!!defaultid,
})

const _change = action((name,value)=>_data[name] = value)

const _onload = action((data)=>Object.assign(_data,data))

@observer
class Operate extends Component {

    modules = {                      // 富文本编辑器格式
        toolbar: {
            container:[
             [{ 'header': [1, 2,3,4,5, false] }],
             ['bold', 'italic', 'underline','strike', 'blockquote'],
             [{ 'size': ['small', false, 'large', 'huge'] }],
             [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
             ['link', 'image'],
             [{ 'align': [] }],
             [{ 'color': [] }, { 'background': [] }],
             ['clean']
            ],
            handlers: {
                'image': (e)=> {
                    let input = document.createElement('input')
                    input.type = 'file'

                    input.accept="image/*"

                    input.onchange = this.uploadCallback
                    input.click()
                }
            }
        }
    }

    uploadCallback = (e) =>{
        const t = this;
        const file = e.target.files[0]
        const fileName = file.name
        let body = new FormData()
        body.append('files',file)
        fetch('/api/uploadfile',{
            method: "POST",
            body,
        }).then(data=>data.json()).then(({data})=>{
            const link = data.src
            let editor = this.editor.getEditor()
            let sel = editor.getSelection()
            editor.clipboard.dangerouslyPasteHTML(sel.index, `<img src="${link}"/>` || '');
        })
    }

    constructor(props) {
        super(props)
        const children = [];

        for (let itm of typelist.split(',')) {
            children.push(<Option key={itm}>{itm}</Option>);
        }

        _change('children',children)
    }


    _operate(){
        const {title,content,type} = _data
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

    _remove(){
        confirm({
            title: '温馨提示',
            content: '确认删除?',
            okText:'删除',
            cancelText:'取消',
            onOk() {
                DB.Article.Remove({
                    id:defaultid,
                }).then(data=>{
                    message.success('操作成功');
                    setTimeout(()=>location.replace('/'),2000)
                },({errorMsg})=>{
                    message.error(errorMsg);
                })
            },
        });
    }

    componentDidMount(){
        if(defaultid){
            DB.Article.Detail({
                id:defaultid
            }).then(({type,...data})=>{
                if(type){
                    _change('type',type.split(','))
                }
                _onload(data)
                _change('loading',false)
            },({errorMsg})=>{
                message.error(errorMsg)
                setTimeout(()=>{
                    location.replace('/')
                },2000)
            })
        }
    }

    render() {
        const {title, content,children,type=[],loading} = _data
        return [
            <Provider store={{
                title:'文章编辑',
            }}>
                <Header key='header'/>
            </Provider>,
            <Spin spinning = {loading} key='spin'>
                <section id="operate" className='contain'>
                    <div className='title'>
                        <label>标题</label>
                            <Input
                                placeholder='请输入标题'
                                value={title}
                                onChange={({target}) => {
                                    _change('title',target.value)
                                }}
                            />
                    </div>
                    <ReactQuill
                        modules={this.modules}
                        value={content}
                        ref={editor=>this.editor = editor}
                        onChange={content=>{
                            _change('content',content)
                        }}/>
                    <Select
                        mode="tags"
                        style={{ width: '30%',marginRight:'10%' }}
                        placeholder="添加分类"
                        value={type}
                        onChange={type=>{
                            _change('type',type)
                        }}
                      >
                        {children}
                    </Select>
                    <Button
                        type="primary"
                        onClick={this._operate}>发布</Button>
                    <Button
                        type="danger"
                        style={{display:(defaultid?'':'none')}}
                        className='remove'
                        onClick={this._remove}>删除</Button>
                </section>
            </Spin>,
            <Footer/>
        ]
    }
}

render(<Operate/>, document.getElementById('root'))
