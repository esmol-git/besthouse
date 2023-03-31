let bodyLockStatus = true
let bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains('lock')) {
        bodyUnlock(delay)
    } else {
        bodyLock(delay)
    }
}
let bodyUnlock = (delay = 500) => {
    let body = document.querySelector('body')
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll('[data-lp]')
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index]
                el.style.paddingRight = '0px'
            }
            body.style.paddingRight = '0px'
            document.documentElement.classList.remove('lock')
        }, delay)
        bodyLockStatus = false
        setTimeout(function () {
            bodyLockStatus = true
        }, delay)
    }
}
let bodyLock = (delay = 500) => {
    let body = document.querySelector('body')
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll('[data-lp]')
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index]
            el.style.paddingRight =
                window.innerWidth -
                document.querySelector('.wrapper').offsetWidth +
                'px'
        }
        body.style.paddingRight =
            window.innerWidth -
            document.querySelector('.wrapper').offsetWidth +
            'px'
        document.documentElement.classList.add('lock')

        bodyLockStatus = false
        setTimeout(function () {
            bodyLockStatus = true
        }, delay)
    }
}
function addLoadedClass() {
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.documentElement.classList.add('loaded')
        }, 0)
    })
}
function headerScroll() {
    addWindowScrollEvent = true
    const header = document.querySelector('header.header')
    console.log(header)
    const headerShow = header.hasAttribute('data-scroll-show')
    const headerShowTimer = header.dataset.scrollShow
        ? header.dataset.scrollShow
        : 500
    const startPoint = header.dataset.scroll ? header.dataset.scroll : 1
    console.log(startPoint)
    let scrollDirection = 0
    let timer
    document.addEventListener('windowScroll', function (e) {
        const scrollTop = window.scrollY
        console.log(scrollTop, scrollDirection, 'kkkk')
        clearTimeout(timer)
        if (scrollTop >= startPoint) {
            !header.classList.contains('_header-scroll')
                ? header.classList.add('_header-scroll')
                : null
            if (headerShow) {
                if (scrollTop > scrollDirection) {
                    // downscroll code
                    header.classList.contains('_header-show')
                        ? header.classList.remove('_header-show')
                        : null
                } else {
                    // upscroll code
                    !header.classList.contains('_header-show')
                        ? header.classList.add('_header-show')
                        : null
                }
                timer = setTimeout(() => {
                    !header.classList.contains('_header-show')
                        ? header.classList.add('_header-show')
                        : null
                }, headerShowTimer)
            }
        } else {
            header.classList.contains('_header-scroll')
                ? header.classList.remove('_header-scroll')
                : null
            if (headerShow) {
                header.classList.contains('_header-show')
                    ? header.classList.remove('_header-show')
                    : null
            }
        }
        scrollDirection = scrollTop <= 0 ? 0 : scrollTop
    })
}
function menuInit() {
    if (document.querySelector('.icon-menu')) {
        document.addEventListener('click', function (e) {
            if (bodyLockStatus && e.target.closest('.icon-menu')) {
                bodyLockToggle()
                document.documentElement.classList.toggle('menu-open')
            }
        })
    }
}

function menuOpen() {
    bodyLock()
    document.documentElement.classList.add('menu-open')
}
function menuClose() {
    bodyUnlock()
    document.documentElement.classList.remove('menu-open')
}
setTimeout(() => {
    if (addWindowScrollEvent) {
        let windowScroll = new Event('windowScroll')
        window.addEventListener('scroll', function (e) {
            document.dispatchEvent(windowScroll)
        })
    }
}, 0)
addLoadedClass()
headerScroll()
menuInit()
