import React from "react"
import {render} from 'react-dom'
import ReactQuill from 'react-quill'
import Header from '../../Component/Header'
import DB from '../../DB'
var hljs = require('highlight.js');
// var MarkdownIt = require('markdown-it'),
//     md = new MarkdownIt();

// var md = require('markdown-it')({
//   html: true,
//   linkify: true,
//   typographer: true,
//   highlight: function (str, lang) {
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         return '<pre class="hljs"><code>' +
//                hljs.highlight(lang, str, true).value +
//                '</code></pre>';
//       } catch (__) {}
//     }
//
//     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
// });

// var md = require('markdown-it')({
//   highlight: function (str, lang) {
//       console.log(1)
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         return '<pre class="hljs"><code>' +
//                hljs.highlight(lang, str, true).value +
//                '</code></pre>';
//       } catch (__) {}
//     }
//
//     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
//   }
// });

const md = require('markdown-it')()
 // .use(require('markdown-it-highlightjs'), {})

// var md = require('markdown-it')({
//   highlight: function (str, lang) {
//       a
//     // 添加这两行才能正确显示 <>
//     str = str.replace(/&lt;/g, "<");
//     str = str.replace(/&gt;/g, ">");
//
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         return '<pre class="hljs"><code>' +
//                hljs.highlight(lang, str, true).value +
//                '</code></pre>';
//       } catch (__) {}
//     }
//
//     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
//   }
// });

console.log(md)

var result = md.render('`111`markdown-it rulezz!');

console.log(result)

class Operate extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            content: defaultcontent,
            title: defaulttitle,
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

    render() {
        const {title, content} = this.state

        return [
            <Header key='header'/>,
            <section id="operate" key='operate'>
                <div className='title'>
                    <label>标题</label>
                    <input type="text" onChange={({target}) => {
                            this.setState({title: target.value})
                        }} placeholder='请输入标题' value={title}/>
                </div>
                <div dangerouslySetInnerHTML={{__html:result}}/>
                <ReactQuill value={content} onChange={this.handleChange.bind(this)}/>
                <a className='publish' href='javascript:;' onClick={this._operate.bind(this)}>发布</a>
            </section>
        ]
    }
}

render(<Operate/>, document.getElementById('root'))
