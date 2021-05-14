import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HeaderStyle from '../css/HeaderStyle.module.css';
import MenuStyle from '../css/MenuStyle.module.css';
import HomeStyle from '../css/HomeStyle.module.css';
import ContentsStyle from '../css/ContentsStyle.module.css';

class Home extends Component {
  state = {
    keyword: '',
    products: [],
  };

  componentDidMount() {
    this.onCall();
  }
  
  onCall = () => {
    fetch('/home', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => this.setState({ products: res }))
      .catch(err => console.log(err));
  };

  render() {
    const { products } = this.state;
    console.log({products});
    return (
      <>
        <div className={HomeStyle.Home_wrap}>
          <TOP/>
          
          <div className={ContentsStyle.content_wrap}>
            <ul className={ContentsStyle.goods_trap}>
              {products.map(item => {
                return (
                  <li>
                    <div className={ContentsStyle.goods}>
                      <img className={ContentsStyle.goods_img} src={item.imgsource} alt="goods" />               
                      <div className={ContentsStyle.goods_info}> <p className={ContentsStyle.goods_info_text}> {item.pdt_name} </p> </div>
                      <div className={ContentsStyle.space}>
                        <div className={ContentsStyle.space1}> <h1 className={ContentsStyle.free_post_img}/> </div>
                        <div className={ContentsStyle.space2}> <p className={ContentsStyle.price_text}> {item.pdt_price+'원'} </p> </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <BOTTOM/>
        </div>
      </>
    );
  }
}

export class TOP extends Component {

  state = {
    keyword: '',
    authority:'',
  };

  comma = (price) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    price = price + ""

    return price.toString().replace(regexp, ',') + "원";
  }
  enterCheck = (event) => {
    if (event.keyCode === 13) {
       document.location.href="/item/search?name="+this.state.keyword;
    }
  }
  componentDidMount() {
    this.checkAuthority();
  }
  
  logoutApi = () =>{
    fetch('/logout',{
        method:'delete'
    });
    window.location.replace("/");
  }

  checkAuthority = () => {
    fetch('/authority')
        .then(response=>response.json())
        .then(response=>this.setState({authority:response}))
  }

  render() {
    const { authority } = this.state;
    return (
      <>
        
        <a href="javascript:window.scrollTo(0,0);"><h3 className={HomeStyle.right_top}></h3></a>
        

        <div className={HeaderStyle.header} id="header">
          <div className={HeaderStyle.inner}>
          {/* <div className={HeaderStyle.c_gnb_button_category}><button type="button" aria-haspopup="dialog" aria-controls="gnbCategory" data-log-actionid-area="header_menu" data-log-actionid-label="sidemenu">카테고리 전체보기</button></div> */}
            <input type="checkbox" id="sidebar" />
            <div className={HeaderStyle.side_btn_wrap}>
              {/* <button type="button" className={HeaderStyle.lside_btn} label="sidebar"> */}
                <label for="sidebar" className={HeaderStyle.lside_btn}></label>
              {/* </button> */}
            </div>
            {/* <div className={HeaderStyle.category_btn}>
              <h3></h3>
              <h1>메뉴</h1>
              <div className={HeaderStyle.category_layer}>

              </div>
            </div> */}

            
            
            <h1 className={HeaderStyle.logo}>  <Link to='/'>home</Link> </h1>

            <span className={HeaderStyle.search}>
              <input className={HeaderStyle.input_text} id="keyword" type="text" onKeyUp={this.enterCheck} onChange={e => this.setState({ keyword: e.target.value })} autocomplete="off"/>
              <Link className={HeaderStyle.sch_smit} id="link" to={'/item/search?name=' + this.state.keyword} />
            </span>
            
            <div className={HeaderStyle.img_menu}>
              <ul className={HeaderStyle.menu}>
                <li className={HeaderStyle.my}> {authority.status==="login"?<Link to="/infoSearch" className={HeaderStyle.mymenu}/>:<Link to="/user/login" className={HeaderStyle.mymenu}/>}
                  <ul className={HeaderStyle.menu_sub}>
                    <li> <Link >주문/배송조회</Link> </li>
                    <li> <Link >취소/반품/교환</Link> </li>
                    <li> <Link to="/infoSearch">회원정보</Link> </li>
                  </ul>
                </li>
              
                <li className={HeaderStyle.cart}><Link to="/" className={HeaderStyle.mycart}></Link></li>
              </ul>
            </div>

            <div className={HeaderStyle.sidebar} id="gnbCategory" role="dialog" aria-modal="true" aria-hidden="false" aria-labelledby="gnbCategoryTitle">
              <div>
                {/* inner */}
                <div className={HeaderStyle.menulayer}>
                  <h2 id="gnbCategoryTitle" className={HeaderStyle.skip}>사용자정보/카테고리/주요서비스</h2>
                  <div className={HeaderStyle.categoryUser_info}>
                    <div className={HeaderStyle.user}>
                      {authority.status==="login"?<Link className={HeaderStyle.login} to="/infoSearch">【 {authority.name} 님】</Link> :<Link className={HeaderStyle.login} to="/user/login">로그인</Link>}
                    </div>
                  </div>
                  <div className={HeaderStyle.category_group}>
                    <div className={HeaderStyle.category_title}>
                      <h3 className={HeaderStyle.title}>카테고리</h3>
                    </div>
                    <nav className={HeaderStyle.category_list}>
                      <ul>
                        <li>
                          <a>생선류</a>
                          <nav className={HeaderStyle.category_sub_list}>
                            <ul> 
                              <li>
                                {/* div 하나씩 만들어서 서브 메뉴 추가해서 만들어야함. 각 li 안에 div가 있으며 서브 메뉴로 사용.*/}
                                <a href="javascript:void(0)" data-log-actionid-area="sidemenu" data-log-actionid-label="meta_category" data-log-body="{&quot;content_type&quot;:&quot;CATEGORY&quot;,&quot;content_no&quot;:165397}">1</a>
                              </li>
                              <li>
                                <a href="javascript:void(0)" data-log-actionid-area="sidemenu" data-log-actionid-label="meta_category" data-log-body="{&quot;content_type&quot;:&quot;CATEGORY&quot;,&quot;content_no&quot;:165397}">2</a>
                              </li>
                              <li>
                                <a href="javascript:void(0)" data-log-actionid-area="sidemenu" data-log-actionid-label="meta_category" data-log-body="{&quot;content_type&quot;:&quot;CATEGORY&quot;,&quot;content_no&quot;:165397}">3</a>
                              </li>
                              <li>
                                <a href="javascript:void(0)" data-log-actionid-area="sidemenu" data-log-actionid-label="meta_category" data-log-body="{&quot;content_type&quot;:&quot;CATEGORY&quot;,&quot;content_no&quot;:165397}">4</a>
                              </li>
                            </ul>
                          </nav>
                        </li>
                        <li>
                          <a>갑각류</a>
                        </li>
                        <li>
                          <a>조개류</a>
                        </li>
                        <li>
                          <a>극피류</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className={HeaderStyle.c_category_banner}>
                  <span className={HeaderStyle.skip}>광고배너</span>
                  <a href="https://www.11st.co.kr/plan/front/exhibitions/2040394/detail" data-log-actionid-area="sidemenu" data-log-actionid-label="banner" data-log-body="{&quot;content_type&quot;:&quot;BANNER&quot;,&quot;content_no&quot;:11039491}" data-is-send-log="true">
                    {/* <img class="" src="//cdn.011st.com/11dims/resize/300x94/quality/75/11src/browsing/banner/2020/09/24/17770/2020092417512426755_11039491_1.jpg" alt="SKpay머니"> */}
                  </a>
                </div>

                {/* <button type="button" className={HeaderStyle.side_close} data-log-actionid-area="sidemenu" data-log-actionid-label="close">카테고리 메뉴닫기 */}
                <label for="sidebar" className={HeaderStyle.side_close}></label>  
                {/* </button> */}

              </div>
              
            </div>
            <label for="sidebar" className={HeaderStyle.sidebar_backgorund}></label>
          </div>
        
      
          <div className={MenuStyle.menu_wrap}>
            <div className={MenuStyle.inner}>

              {/* <ul className={MenuStyle.menu}>
                <li>
                  <a href="/">메뉴1</a>
                  <ul className={MenuStyle.menu_sub}>
                    <li> <a href="/">메뉴 1_1</a> </li>
                    <li> <a href="/">메뉴 1_1</a> </li>
                    <li> <a href="/">메뉴 1_1</a> </li>
                  </ul>
                </li>
                <li> <a href="/">메뉴2</a>
                  <ul className={MenuStyle.menu_sub}>
                    <li> <a href="/">메뉴 2_1</a> </li>
                    <li> <a href="/">메뉴 2_1</a> </li>
                    <li> <a href="/">메뉴 2_1</a> </li>
                  </ul>
                </li>
                <li> <a href="/">메뉴3</a>
                  <ul className={MenuStyle.menu_sub}>
                    <li> <a href="/">메뉴 3_1</a> </li>
                    <li> <a href="/">메뉴 3_1</a> </li>
                    <li> <a href="/">메뉴 3_1</a> </li>
                  </ul>
                </li>
                <li> <a href="/">메뉴4</a>
                  <ul className={MenuStyle.menu_sub}>
                    <li> <a href="/">메뉴 4_1</a> </li>
                    <li> <a href="/">메뉴 4_1</a> </li>
                    <li> <a href="/">메뉴 4_1</a> </li>
                  </ul>
                </li>
              </ul> */}

              <div className={MenuStyle.top_menu}>
                {authority.status==="login"?<span className={MenuStyle.profile_display}> <Link to="/infoSearch">【 {authority.name} 】</Link> 님 환영합니다.   </span>:''}
                {authority.status==="login"?<Link onClick={this.logoutApi}>로그아웃</Link>:<Link to="/user/login">로그인</Link>}
                <Link to='/user/register'> 회원가입 </Link>
                <Link > 고객센터 </Link>
              </div>

            </div>
          </div>
        </div>
    </>
    );
  }
}

export class BOTTOM extends Component {
    render() {
        return (
            <div>
                <div className={HomeStyle.liner}>
                  <p>name</p>
                  <p>adress</p>
                  <p>phonenumber</p>
                </div>
                <div className={HomeStyle.remark}>
                  <p>강화수산마켓</p>
                  <p>GANGHWAFISHMARKET.COM</p>
                </div>
            </div>
        );
    }
}

export default Home;
