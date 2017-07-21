export const HIDE_NODE = 'HIDE_NODE'
export const SHOW_NODE = 'SHOW_NODE'

export function hide(path) {
	return {
		type: HIDE_NODE,
		payload: path
	}
}

export function show(path) {
	return {
		type: SHOW_NODE,
		payload: path
	}
}