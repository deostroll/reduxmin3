import camelCase from "lodash/camelCase"
import upperFirst from "lodash/upperFirst"



// PascalCase, aka UpperCamelCase
export function pascalCase(str) {
  return upperFirst(camelCase(str))
}

// Remove the ext of a filename, and pascalCase it
export function pascalCaseFilename(filename) {
  return pascalCase(filename.replace(/\.[^./]*$/, ""))
}

export const objReduce = (obj, fn) => {
	return Object.keys(obj).reduce((newObj, key) => {
		let res = fn(obj[key], key)
		if (res && typeof res === "object") {
			Object.assign(newObj, res)
		}

		return newObj
	}, {})
}

export const objMap = (obj, fn) => {
	return Object.keys(obj).reduce((newObj, key) => {
		newObj[key] = fn(obj[key], key)
		return newObj
	}, {})
}