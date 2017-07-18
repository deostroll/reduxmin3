export const UPDATE = 'UPDATE'
export const RESET = 'RESET'

export function update({ path, value }) {
	return {
		type: UPDATE,
		payload: { path, value }
	}
}

export function set(data) {
	return {
		type: RESET
		payload: data
	}
}