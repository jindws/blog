import React from 'react';
import { hydrate } from 'react-dom'
import App from './pages'

// import { useStaticRendering } from "mobx-react"
// useStaticRendering(true)

hydrate(<App/>, document.getElementById('root'));
