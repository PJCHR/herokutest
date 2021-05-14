import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomeStyle from '../css/HomeStyle.module.css';
import InfoSearchStyle from '../css/InfoSearchStyle.module.css';

import { TOP, BOTTOM } from './Home';

class InfoSearch extends Component {
    state = {
      id:"",
      pw: "",
      result:[],
    };
    
    handlChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
    
    onClickSave = async ()=> {
      const data = {
        id: this.state.id,
        pw: this.state.pw,
      };
       await fetch('/login', {
        
        method: 'post', //통신방법
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((res) => res.json())
      .then(res => this.setState({ result: res }))
      .catch(err => console.log(err));
    
    }
    
    render() {
      return (
        <div className={HomeStyle.Home_wrap}>
           <TOP/>
  
          <div className={InfoSearchStyle.InfoSearch_wrap}>
            
          </div>
            
          <BOTTOM/>
        </div>
      );
    }
  }
  
  export default InfoSearch;