import $ from 'jquery';
import Popper from 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';

const divRoot = document.querySelector('#root');

ReactDOM.render(
  <App/>,
  divRoot
);