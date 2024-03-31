export function caseInsensitive(target, arr) {
    const newArr = arr.filter(item => {
        if (typeof item === "string") {
            return item.toLowerCase().includes(target.toLowerCase())
        }
        return false;
    })
    return newArr
}

export function caseInsensitiveAlphabetical(target, arr) {
    const newArr = arr.filter(item => {
        if (typeof item === "string") {
            return item.toLowerCase().includes(target.toLowerCase())
        }
        return false
    })
    newArr.sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    return newArr
}