export const isUndefined = (value: any): boolean => value === undefined

export const isEqual = (value1: any, value2): boolean => JSON.stringify(value1) === JSON.stringify(value2)
