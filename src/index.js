'use strict';

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import ll from './img/LL2.jpg'
import {sayAA} from '../common';

class SayHiDemo extends Component {
  render() {
    // a =22
    return (
    <div>
      <h2>hello babel</h2>
      <p>this is pppaacc</p>
      <img src={ll} style={{width:'300px'}}></img>
    </div>
    )

  }
}
ReactDOM.render(
  <SayHiDemo/>,
  document.querySelector('#app')
)


