import React from "react";
import { StaticRouter,Router, Route, Link,Switch } from "react-router-dom";
// import { createMemoryHistory } from 'history';
import { BackTop } from 'antd'

import Home from './Home'
import Detail from './Detail'

class App extends React.PureComponent{
    constructor(props){
        super(props)
        let path = props.path
        if(typeof location === 'object'){
            path = location.pathname
        }
        this.state = {
            path
        }
    }
    render(){
        const {path} = this.state
        const context = {}

        return [
            <StaticRouter location={path}
            key='router'
            context={context}>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/detail/:id" component={Detail} />
                    </Switch>
                    </div>
             </StaticRouter>,
             <BackTop/>
        ]
    }
}

export default App
