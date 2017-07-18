export const objReduce = (obj, fn) => {
	Object.keys(obj).reduce((newObj, key) => {
		let res = fn(obj[key], key)
		if (res && typeof res === "object") {
			Object.assign(newObj, res)
		}

		return newObj
	}, {})
}