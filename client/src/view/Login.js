import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomeStyle from '../css/HomeStyle.module.css';
import LoginStyle from '../css/LoginStyle.module.css';
import { TOP, BOTTOM } from './Home';

class Login extends Component {
  state = {
    inputId: '',
    inputPs: '',
    loginCheck: []
}

  loginApprove = async () => {
      const options = {
          method: "post",
          body: JSON.stringify(this.state),
          headers: {
              'Content-Type': 'application/json'
          }
      }
      const { inputId, inputPs } = this.state;
      if (inputId === '') {
          alert("ID를 입력해주세요");
      }
      else if (inputPs === '') {
          alert("패스워드를 입력해주세요");
      }
      else if (inputId !== '' && inputPs !== '') {
          await fetch('/login', options)
              .then(response => response.json())
              .then(response => this.setState({ loginCheck: response }))
      }
      const { loginCheck } = this.state;
      if (loginCheck.success === 'true') {
          alert("로그인이 되었습니다.");
          document.location.href = '/';
      }
      else if (loginCheck.success === 'false') {
          alert("로그인 정보가 일치하지 않습니다");
      }
  }


  enterCheck = (event) => {
      if (event.keyCode === 13) {
          this.loginApprove();
      }
  }
  
  render() {
    return (
      <div className={HomeStyle.Home_wrap}>
         <TOP/>
        
        <div className={HomeStyle.oneline} />
        <div className={LoginStyle.login_wrap}>
          <div className={LoginStyle.login_box}>
            <form action="/user/login">
              <tr> <input type="text" placeholder="ID" onChange={e => this.setState({ inputId: e.target.value })}/> </tr>
              <tr> <input type="password" placeholder="PASSWORD" onKeyUp={this.enterCheck} onChange={e => this.setState({ inputPs: e.target.value })}/> </tr>
            </form>

            <button className={LoginStyle.login_btn} onClick={this.loginApprove} value="로그인">로그인</button>

            <div className={LoginStyle.gotextbox}>
              <Link className={LoginStyle.goRegister} to="/user/register">회원가입</Link>
              <Link className={LoginStyle.goUserinfoSearch} to="/infoSearch">아이디/비밀번호 찾기</Link>
            </div>
          </div>
        </div>
          
        <BOTTOM/>
      </div>
    );
  }
}

export default Login;
