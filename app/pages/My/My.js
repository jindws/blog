import React,{Component} from "react"
import Header from '../../Component/Header'
import List from '../../Component/List'

import { observer ,inject} from "mobx-react/custom"


@inject('store')
@observer class My extends Component {
    constructor(props){
        super(props)
        this.props.store._change('title','我的文章')
    }

    render() {

        return [
            <Header/>,
            <List marginTop='8rem' my={true}/>,
        ]
    }
}

export default My
