

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import './index.less'
// import './index.css'

import ll from './img/LL2.jpg'
import {sayAA} from '../common';
import numberAddd from '@mingo_789/number-add'
class SayHiDemo extends Component {
  constructor(){
    super(...arguments)
    this.state={
      Text:null
    }
  }
  loadComponent(){
    import('./text').then(Text=>{
      console.log(Text);
      this.setState({
        Text:Text.default
      })
    })
  }
  render() {
    // a =22
    const {Text} = this.state
    const addResult = numberAddd('999', '1');
    return (
    <div>
      <h2>hello babel xx</h2>
      <p>this is pppaacc</p>
      <img src={ll} onClick={this.loadComponent.bind(this)} style={{width:'300px'}} />
      {
        Text? <Text/> :null
      }
      <h3>这里显示使用的npm包{addResult}</h3>
    </div>
    )

  }
}
ReactDOM.render(
  <SayHiDemo/>,
  document.querySelector('#app')
)


