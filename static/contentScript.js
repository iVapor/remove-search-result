import _ from 'lodash'
import { log, selectAllElement, selectElement } from "../utils/tools"
import { getBlockList } from "./resource/blockList";

const testHotReload = () => {
}

const test = () => {
    testHotReload()
}


const isTargetElement = (element, callback) => {
    let footerSelector = '.f13'
    let resultFooter = element.querySelector(footerSelector)
    // 视频网站
    if (!resultFooter) {
        return
    }

    let identifyClass = '.nor-src-wrap'
    let targetElement = resultFooter.querySelector(identifyClass)

    // 普通网站不做处理
    if (!targetElement) {
        return
    }

    let flag = false
    let p = getBlockList()
    p.then((list) => {
        list.forEach((value, index, array) => {
            let type = value.type
            if (type === 'name') {
                let text = targetElement.innerText
                flag = text.includes(value.mark)
                callback(flag)
            }
        })
    })
}

const operateResult = (ele) => {
    isTargetElement(ele, (isTarget) => {
        if (isTarget) {
            ele.innerHTML = ''
        }
    })

}
const getResultList = () => {
    let rowSelector = '.result'
    let resultRow = selectAllElement(rowSelector)

    resultRow.forEach((value, index, array) => {
        operateResult(value)
    })
}

/**
 * 监听获取到的信息，发生改变时调用回调
 * @param getDataFunc 获取的信息函数
 * @param method setInterval 何时终止：'same' 数据相同时终止 ； 'diff' 数据不同时终止
 * @param callback 要运行的回调
 */
const monitorDomChange = function (getDataFunc, method='same', callback) {
    let old = getDataFunc()
    let load = setInterval(function () {
        let newValue = getDataFunc()
        let equal = _.isEqual(old, newValue)

        let isInterval = (method === 'same') ? equal : !equal
        if (isInterval) {
            clearInterval(load)
            callback()
        }
    }, 500)
}

// 搜索网站会在分页的时候，改变 url
const getSpecialData = () => {
    let url = location.href
    return url
}

const paginationAction = () => {
    let pageContainer = selectElement('#page')
    if (!pageContainer) {
        return
    }
    let pages = pageContainer.querySelectorAll('.pc')

    let handler = () => {
        monitorDomChange(getSpecialData, 'diff', function () {
            getResultList()
            paginationAction()
        })
    }

    pages.forEach((value, index) => {

        value.removeEventListener('click', handler)
        value.addEventListener('click', handler)
    })
}

const removeBaiduElement = () => {
    getResultList()
    paginationAction()
}

const __main = () => {
    removeBaiduElement()
    test()
}

__main()