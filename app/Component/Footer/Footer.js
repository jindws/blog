import React, {Component} from "react"
import { Drawer,Button,Popconfirm,message} from 'antd'

class Footer extends Component{

    render(){
        return <footer>
            <span>浙ICP备18035476号</span>
            <label>github: <a href="https://github.com/moiamoia/blog" target='_blank'>https://github.com/moiamoia/blog</a></label>
        </footer>
    }
}

export default Footer
