// Вспомогательные модули блокировки прокрутки и скочка
export let bodyLockStatus = true
export let bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains('lock')) {
        bodyUnlock(delay)
    } else {
        bodyLock(delay)
    }
}
export let bodyUnlock = (delay = 500) => {
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
export let bodyLock = (delay = 500) => {
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
export function dataMediaQueries(array, dataSetValue) {
    // Получение объектов с медиа запросами
    const media = Array.from(array).filter(function (item, index, self) {
        if (item.dataset[dataSetValue]) {
            return item.dataset[dataSetValue].split(',')[0]
        }
    })
    // Инициализация объектов с медиа запросами
    if (media.length) {
        const breakpointsArray = []
        media.forEach((item) => {
            const params = item.dataset[dataSetValue]
            const breakpoint = {}
            const paramsArray = params.split(',')
            breakpoint.value = paramsArray[0]
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
            breakpoint.item = item
            breakpointsArray.push(breakpoint)
        })
        // Получаем уникальные брейкпоинты
        let mdQueries = breakpointsArray.map(function (item) {
            return (
                '(' +
                item.type +
                '-width: ' +
                item.value +
                'px),' +
                item.value +
                ',' +
                item.type
            )
        })
        mdQueries = uniqArray(mdQueries)
        const mdQueriesArray = []

        if (mdQueries.length) {
            // Работаем с каждым брейкпоинтом
            mdQueries.forEach((breakpoint) => {
                const paramsArray = breakpoint.split(',')
                const mediaBreakpoint = paramsArray[1]
                const mediaType = paramsArray[2]
                const matchMedia = window.matchMedia(paramsArray[0])
                // Объекты с нужными условиями
                const itemsArray = breakpointsArray.filter(function (item) {
                    if (
                        item.value === mediaBreakpoint &&
                        item.type === mediaType
                    ) {
                        return true
                    }
                })
                mdQueriesArray.push({
                    itemsArray,
                    matchMedia,
                })
            })
            return mdQueriesArray
        }
    }
}
export function currentYear() {
    document.querySelector('#currentYear').innerHTML = new Date().getFullYear()
}
export function addLoadedClass() {
    bodyLock()
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.documentElement.classList.add('loaded')
            bodyUnlock()
        }, 1500)
    })
}

export function getHash() {
    if (location.hash) {
        return location.hash.replace('#', '')
    }
}
export function uniqArray(array) {
    return array.filter(function (item, index, self) {
        return self.indexOf(item) === index
    })
}
export function menuInit() {
    if (document.querySelector('.icon-menu')) {
        document.addEventListener('click', function (e) {
            if (bodyLockStatus && e.target.closest('.icon-menu')) {
                bodyLockToggle()
                document.documentElement.classList.toggle('menu-open')
            }
        })
    }
}

export function menuOpen() {
    bodyLock()
    document.documentElement.classList.add('menu-open')
}
export function menuClose() {
    bodyUnlock()
    document.documentElement.classList.remove('menu-open')
}
