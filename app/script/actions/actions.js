/*
 * action 类型
 */

import { message } from '../lib/getMessage'
import axios from 'axios'
import fetch from 'isomorphic-fetch'
//var axios = require('axios');

export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action 创建函数
 */

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
export function getNavigator(){
  return (dispatch, getState) => {
    let messages = message.getMessage()
    axios.post('http://localhost:3600/app', messages).then(function (response) {
      console.log(response);
    })
    /*let headers = new Headers()
    headers.append('Accept', 'application/json, text/plain, *!/!*')
    fetch('http://localhost:3600/app', {
      method: 'post',
      body: JSON.stringify(message),
      credentials: 'include',
      headers: headers
    }).then(function(resp){
      return resp.json()
    }).then(function(data){
      console.log(data);
    })*/
    dispatch(addTodo(messages))

  }
}