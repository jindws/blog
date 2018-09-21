import React from "react";
import { Router, Route, Link,Switch } from "react-router-dom";
import { createMemoryHistory } from 'history';

import Home from './Home'
import Operate from './Operate'

class App extends React.PureComponent{
    render(){
        return [
            <Router history={createMemoryHistory()} key='router'>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/operate" component={Operate} />
                        <Route exact path="/operate/:id" component={Operate} />
                    </Switch>
                    </div>
             </Router>
        ]
    }
}

export default App
