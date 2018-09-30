import React, {PureComponent} from "react"

export default class Header extends PureComponent{

    _back(){
        // history.go(-1)
        location.replace('/')
    }

    render(){
        return <header id='header'>
            <div
                onClick={this._back.bind(this)}
                className='left'
                >
                <embed
                    onClick={this._back.bind(this)}
                    src="../Svg/left-circle.svg"
                    type="image/svg+xml"
                    pluginspage="http://www.adobe.com/svg/viewer/install/" />
                    <a href="javascript:;" onClick={this._back.bind(this)}></a>
            </div>
        </header>
    }
}
