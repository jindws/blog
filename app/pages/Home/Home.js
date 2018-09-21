import React from "react"
import {Link} from 'react-router-dom'

class Home extends React.PureComponent {
    render() {
        return [
            <header key='header'>
                <div className='animated fadeIn'>
                    A brand new start.
                </div>
            </header>,
            <section key='section' className='section'>
                <dl>
                    <dt>
                        <Link to='/operate'>aaa</Link>
                    </dt>
                    <dd>main</dd>
                    <dd className='time'>main</dd>
                </dl>
            </section>
        ]
    }
}

export default Home
