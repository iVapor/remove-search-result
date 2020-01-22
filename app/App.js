import React, { Component } from 'react'
import Header from "./Header";
import BlockSite from "./components/BlockSite"
import BlockList from "./components/BlockList";
import UserInstruction from "./components/UserInstruction"
import "./App.css"

class App extends Component {
    render() {
        return <div className="block-result">
            <Header/>
            <main className="main-container">
                <BlockSite />
                <BlockList />
                <UserInstruction />
            </main>
        </div>
    }
}
export default App
