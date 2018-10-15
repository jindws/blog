import React,{Component} from "react"
import { StaticRouter,Router, Route, Link,Switch } from "react-router-dom"
import { BackTop } from 'antd'

import Home from './Home'
import Detail from './Detail'
import Login from './Login'
import Drawer from '../Component/Drawer'

class App extends Component{
    constructor(props){
        super(props)
        let path = props.path
        if(typeof location === 'object'){
            path = location.pathname
        }
        this.path = path
    }

    render(){
        const {path} = this

        const context = {}

        return [
            <StaticRouter location={path}
            key='router'
            context={context}>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/detail/:id" component={Detail} />
                    </Switch>
                    </div>
             </StaticRouter>,
             <BackTop/>,
             <Drawer/>
        ]
    }
}

export default App
