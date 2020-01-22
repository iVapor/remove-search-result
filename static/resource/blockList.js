import _ from "lodash"
import { log } from "../../utils/tools"

const getBlockList = () => {
    let p = new Promise((resolve, reject) => {
        chrome.storage.local.get('blockList', function(items) {
            let notEmpty = Object.keys(items).length !== 0
            let list = []
            if (notEmpty) {
                list = JSON.parse(items.blockList)
            }

            resolve(list)
        });
    })
    return p
}
//
// [
//     {
//         id: '0',
//         type: 'url',
//         className: 'nor-src-wrap',
//         mark: url,
//     }
// ]
const setBlockList = (item, callback) => {
    let p = getBlockList()
    p.then((list) => {
        let id = list.length
        item.id = id
        list.push(item)
        let l = JSON.stringify(list)
        chrome.storage.local.set({blockList: l}, callback)
    })
}

const deleteBlockItem = (id, callback) => {
    let p = getBlockList()
    p.then((list) => {
        let index = _.findKey(list, { id: id })

        list.splice(index, 1)
        let l = JSON.stringify(list)
        chrome.storage.local.set({blockList: l}, callback)
    })
}

const modifyBlockItem = (item, callback) => {
    let p = getBlockList()
    p.then((list) => {
        let { id, mark } = item
        let index = _.findKey(list, { id: id })

        if (index === undefined) {
            return
        }
        let site = list[index]
        Object.assign(site, item)
        let l = JSON.stringify(list)
        chrome.storage.local.set({blockList: l}, callback)
    })
}


export { getBlockList, setBlockList, deleteBlockItem, modifyBlockItem }
