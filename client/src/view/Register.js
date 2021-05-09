import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomeStyle from '../css/HomeStyle.module.css';
import RegisterStyle from '../css/RegisterStyle.module.css';
import { TOP, BOTTOM } from './Home';

class Register extends Component {
  state = {
    id: "",
    idcheck: "",
    email: "",
    name: "",
    pw: "",
    re_pw: "",
    hp: "",
    registerActive:"",
  };

  idCheck = async () => {
    const { id } = this.state;
    await fetch(`/idcheck?id=${id}`)
        .then(response => response.json())
        .then(response => this.setState({ idcheck: response }))
    const { idcheck } = this.state;
    if (id === '') {
        alert('ID를 입력하세요.');
       
    }
    else if (idcheck.length === 0) {
        alert('해당 ID는 사용가능합니다.');
    this.setState({registerActive:"active"});
    }
    else if (idcheck.length === 1) {
        alert('해당 ID는 이미 존재합니다.');

    }
  }

sendData = async () => {
    const options = {
        method: 'post',
        body: JSON.stringify(this.state),
        headers: {
            'Content-Type': 'application/json'
        }
    }
  await this.idCheck; 
    const {id, pw, re_pw, email, name, hp,registerActive } = this.state;
    console.log(registerActive);
    if (id !== '' & pw === re_pw & pw !== '' & re_pw !== '' & email !== '' & name !== '' & hp !== '' &registerActive==='active' ) {
      if(pw === re_pw){
        return fetch("/register", options)
          .then(() => alert('가입되었습니다.'))
          .then(() => document.location.href = '/')
      }
    }
    else {
        if(id ===''){
            alert('ID 입력 바랍니다.');
        }
        else if(registerActive===''){
          alert("중복확인 버튼 눌러주세요.")
        }
        else if (pw === '') {
            alert('패스워드 입력 바랍니다.');
        }
        else if (re_pw === '') {
          alert('패스워드 확인란 입력 바랍니다.');
        }
        else if (pw !== re_pw) {
          alert('패스워드가 같지않습니다.'); // 화면 상에서 표시되어야함
        }
        else if (email === '') {
          alert('이메일 입력 바랍니다.');
        }
        else if (name === '') {
            alert('이름 입력 바랍니다.');
        }
        else if (hp === '') {
          alert('전화 번호를 입력 바랍니다.');
      }
    }

  }
  lowerCase = () =>{
      var id=document.getElementById("id_field");
      id.value=id.value.toLowerCase();
  }

  render() {
    return (
      <div className={HomeStyle.Home_wrap}>
        <TOP/>
        
        <div className={RegisterStyle.signup_wrap}>
          <div className={RegisterStyle.signupBox}>
            <ul>
              <li>
                <p>ID </p>
                <input type="text" id="id_field" onKeyUp={this.lowerCase} onChange={e => this.setState({ id: e.target.value })} />
                <button className={RegisterStyle.idCheck} onClick={this.idCheck} type="button" value="idCheck">중복확인</button>
              </li>

              <li>
                <p> PASSWORD </p>
                <input type="password" onChange={e => this.setState({ pw: e.target.value })}/>
              </li>

              <li>
                <p>PASSWORD Check </p>
                <input type="password" onChange={e => this.setState({ re_pw: e.target.value })}/>
              </li>
            
              <li>
                <p>EMAIL </p>
                <input type="text" onChange={e => this.setState({ email: e.target.value })}/>
              </li>
            
              <li>
                <p>NAME </p>
                <input type="text" onChange={e => this.setState({ name: e.target.value })}/>
              </li>
            
              <li>
                <p>PHONENUMBER </p>
                <input type="text" onChange={e => this.setState({ hp: e.target.value })}/>
              </li>

              <li>
                <button onClick={this.sendData} value="가입" >가입</button>
                <button onClick={() => document.location.href = '/'} value="취소">취소</button>
              </li>

            </ul>
          </div>
        </div>

        <BOTTOM/>
      </div>
    );
  }
}

export default Register;
