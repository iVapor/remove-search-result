import React, { Component } from 'react'
import logo from "../chrome/icons/icon.png"
import "./Header.css"
class Header extends Component {
    render() {
        return <header className="header-container">
            <img className="logo" src={logo} /><span className="title">屏蔽搜索结果</span>
        </header>
    }
}
export default Header