import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import HomeStyle from '../css/HomeStyle.module.css';
import ContentsStyle from '../css/ContentsStyle.module.css';
import { TOP, BOTTOM } from './Home';

class Search extends Component {
  state = {
    keyword: '',
    result: [],
  };
  componentDidMount() {
    this.searchResult();
  }
  searchResult = () => {
    var query = this.getQueryString();
    console.log(query);
    fetch(`/search?name=${query}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => this.setState({ result: res }))
      .catch(err => console.log(err));
  };
  btnSearch = () => {
    var { keyword } = this.state;
    fetch(`/search?name=${keyword}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => this.setState({ result: res }))
      .catch(err => console.log(err));
  };

  getQueryString = () => {
    const result = queryString.parse(this.props.location.search);
    const rst = result.name;

    return rst;
  };

  comma = price => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    price = price + '';

    return price.toString().replace(regexp, ',') + '원';
  };

  render() {
    const { result } = this.state;
    return (
      <div className={HomeStyle.Home_wrap}>
        <TOP/>

        <div className={ContentsStyle.content_wrap}>
          <ul className={ContentsStyle.goods_trap}>
            <div className={ContentsStyle.content_btn} />

            {result.map(item => {
              return (
                <li>
                  <div className={ContentsStyle.goods}>
                    <img className={ContentsStyle.goods_img} src={item.imgsource} alt="goods" />
                    <div className={ContentsStyle.goods_info}> <p className={ContentsStyle.goods_info_text}> {item.pdt_name} </p> </div>
                    <div className={ContentsStyle.space}>
                      <div className={ContentsStyle.space1}> <img className={ContentsStyle.free_post_img}/> </div>
                      <div className={ContentsStyle.space2}> <p className={ContentsStyle.price_text}> {item.pdt_price} </p> </div>
                    </div>
                  </div>
                </li>
              );
            })}
            <div className={ContentsStyle.content_btn} />
          </ul>
        </div>

        <BOTTOM/>
      </div>
    );
  }
}

export default Search;
