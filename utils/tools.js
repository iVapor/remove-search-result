const log = console.log.bind(console)

const selectAllElement = (sel) => {
    return document.querySelectorAll(sel)
}

const selectElement = (sel) => {
    return document.querySelector(sel)
}

const refreshPage = (time = 1500) => {
    setTimeout(() => {
        location.reload()
    }, time)
}
export { log, selectAllElement, selectElement, refreshPage }