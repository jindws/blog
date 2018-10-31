import React,{Component} from "react"
import { StaticRouter,Router, Route, Link,Switch } from "react-router-dom"
import { BackTop } from 'antd'

import Home from './Home'
import Detail from './Detail'
import Login from './Login'
import Type from './Type'
import My from './My'
import Search from './Search'

import Drawer from '../Component/Drawer'
import Footer from '../Component/Footer'

import {observable,action} from 'mobx';
import {observer, Provider} from "mobx-react/custom"

class Store{
    @observable title
    @observable error

    @action _change = (name,value)=>{
        this[name] = value
    }
}

const nstore = new Store()

@observer
class App extends Component{
    constructor(props){
        super(props)
        let path = props.path
        if(typeof location === 'object'){
            path = location.pathname
        }
        this.path = path
    }

    componentDidCatch(err, info) {
        console.log(err,info)
        nstore._change('error',err)
    }

    render(){
        if(nstore.error){
            return `this or its children has error`;
        }

        const {path} = this

        const context = {}

        return <Provider store={nstore}>
            <object>
                <StaticRouter location={path}
                key='router'
                context={context}>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/detail/:id" component={Detail} />
                            <Route exact path="/type/:type" component={Type} />
                            <Route exact path="/my" component={My} />
                            <Route exact path="/search/:search" component={Search} />
                        </Switch>
                        </div>
                 </StaticRouter>
                 <BackTop/>
                 <Drawer/>
                 <Footer/>
            </object>
        </Provider>
    }
}

export default App
