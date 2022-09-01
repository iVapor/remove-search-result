import {getBlockList} from "../resource/blockList";
import {selectAllElement, selectElement, log } from "../../utils/tools";
import _ from "lodash";

const removeUrl = (rowAnchor, callback) => {
    let p = getBlockList()
    let flag = false
    p.then((list) => {
        list.forEach((value, index, array) => {
            let type = value.type
            let canRemove = (type === 'url') && (value.status === 1)
            if (canRemove) {
                let text = rowAnchor.innerText
                flag = text.includes(value.mark)
                callback(flag)
            }
        })
    })
}

const removeSiteName = (rowFooter, callback) => {
    let p = getBlockList()
    let flag = false
    p.then((list) => {
        list.forEach((value, index, array) => {
            let type = value.type
            let canRemove = value.status === 1
            if (canRemove) {
                let identifyClass = '.nor-src-wrap'
                let targetElement = rowFooter.querySelector(identifyClass)
                let text = rowFooter.innerText
                log('text', text)
                flag = text.includes(value.mark)
                log('flag', flag)
                callback(flag)
            }
        })
    })
}

const isTargetElement = (element, callback) => {
    let footerSelector = '.f13'
    let resultFooter = element.querySelectorAll(footerSelector)
    // 论坛网站有两个 .f13 类。
    let lastChildFooter = resultFooter[resultFooter.length - 1]
    // 视频网站，论坛回复
    if (resultFooter.length === 0) {
        return
    }

    // 处理链接
    let identifyClass = '.c-showurl'
    let targetElement = lastChildFooter.querySelector(identifyClass)
    if (!targetElement) {
        return
    }
    log('targetElement', targetElement)
    let isUrl = targetElement.children.length === 0
    log('isUrl', isUrl)
    if (isUrl) {
        removeUrl(targetElement, callback)
    } else {
        removeSiteName(lastChildFooter, callback)
    }
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

export { removeBaiduElement }
