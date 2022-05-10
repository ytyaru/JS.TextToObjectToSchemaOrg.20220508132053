function parseDuration(duration) {
    const durationRegExp = /^P(?:(\d+(?:[\.,]\d+)?)Y)?(?:(\d+(?:[\.,]\d+)?)M)?(?:(\d+(?:[\.,]\d+)?)D)?(?:T(?:(\d+(?:[\.,]\d+)?)H)?(?:(\d+(?:[\.,]\d+)?)M)?(?:(\d+(?:[\.,]\d+)?)S)?)?$/
    const indexes = {
        1: 'year',
        2: 'month',
        3: 'day',
        4: 'hour',
        5: 'minute',
        6: 'second',
    }
    const matchResult = duration.match(durationRegExp)
    if (matchResult === null) { return null; }
    const durationResult = {}
    for (let i = 1; i <= Math.min(matchResult.length, 6); i++) {
        if (matchResult[i] !== undefined) {
            const value = Number(matchResult[i].replace(',', '.'))
            if (Number.isNaN(value)) { return; }
            durationResult[indexes[i]] = value
        }
    }
    if (Object.keys(durationResult) === 0) { return null; }
    return durationResult
}

