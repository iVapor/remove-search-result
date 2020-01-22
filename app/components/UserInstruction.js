import React, { Component } from 'react'
import "./UserInstruction.css"
import siteName from "../../chrome/img/siteName.png"

class UserInstruction extends Component {
    render() {
        return <div className="user-instruction">
            <h2>说明</h2>
            <article className={"description"}>
                <p>
                    <div>填写图中红圈位置的网站名或链接。</div>
                    <img src={ siteName } alt={"网站名"}/>
                </p>
                <p>每次更新后，需要关闭弹窗，刷新页面</p>
                <p>网站名不宜过长，注意截取关键字。例如我想移除 『CSDN技术社区』，那么在网站名的位置，应该填
                    CSDN技术社区，而不是填写官网名称 『CSDN-专业IT技术社区』。</p>
                <p>网址的填写网站主页的 hostname，例如我想移除关于知乎的搜索结果，网址就填 zhihu，不应该填写
                    https://www.zhihu.com/question/366538777 之类。</p>
            </article>
        </div>
    }
}
export default UserInstruction
