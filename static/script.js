import _ from 'lodash'
import { log, selectAllElement, selectElement } from "../utils/tools"
import { getBlockList } from "./resource/blockList";
// content.ts
import 'mv3-hot-reload/content'

// your code...
import { removeBaiduElement } from "./removeBaidu/removeBaidu"

const testHotReload = () => {
}

const test = () => {
    testHotReload()
}

const judeEnv = () => {
    let root = document.querySelector('#root')
    if (root) {
        return
    }
}

const __main = () => {
    judeEnv()
    console.log('chrome', chrome.storage.local)
    removeBaiduElement()
    test()
}


__main()
