export const isEmpty = (obj: any) => {
    let isEmpty = false
    if (obj === undefined || obj === null || obj === '') {
        isEmpty = true
    } else if (Array.isArray(obj) && obj.length === 0) {
        isEmpty = true
    } else if (obj.constructor === Object && Object.keys(obj).length === 0) {
        isEmpty = true
    }
    return isEmpty
}