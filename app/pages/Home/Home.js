import React,{Component} from "react"
import List from '../../Component/List'

class Home extends Component {
    render() {
        return [
            <header key='header' className='header'>
                <div className='animated pulse'>
                    A brand new start.
                </div>
            </header>,
            <List/>
        ]
    }
}

export default Home
