import _ from 'lodash'
import { log, selectAllElement, selectElement } from "../utils/tools"
import { getBlockList } from "./resource/blockList";
import { removeBaiduElement } from "./removeBaidu/removeBaidu"

const testHotReload = () => {
}

const test = () => {
    testHotReload()
}



const __main = () => {
    removeBaiduElement()
    test()
}

__main()
