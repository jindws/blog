import React, {Component} from "react"

import { inject,observer } from "mobx-react/custom"

@inject("store")
export default @observer class Header extends Component{

    _back(){
        location.replace('/')
    }

    render(){
        const {title} = this.props.store
        return <header id='header'>
            <div
                onClick={this._back.bind(this)}
                className='left'
                >
                <embed
                    onClick={this._back.bind(this)}
                    src="/app/Component/Svg/left-circle.svg"
                    type="image/svg+xml"
                    pluginspage="http://www.adobe.com/svg/viewer/install/" />
                    <a href="javascript:;" onClick={this._back.bind(this)}></a>
            </div>
            <span>{title}</span>
        </header>
    }
}
