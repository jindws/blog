import React,{Component} from "react"
import Header from '../../Component/Header'
import List from '../../Component/List'

import { observer ,inject} from "mobx-react/custom"


@inject('store')
@observer class Search extends Component {

    constructor(props){
        super(props)
        this.props.store._change('title',`搜索:`+decodeURI(props.match.params.search))
    }

    render() {

        return [
            <Header/>,
            <List marginTop='8rem' search={this.props.match.params.search}/>,
        ]
    }
}

export default Search
