export const state = () => ({
	count: 0
})

export const mutations = {
	INCREMENT(state){
		state.count += 1
	},

	DECREMENT(state){
		state.count = state.count > 0 ? state.count -= 1 : 0
	},

	COUNT_NUM(state){
		state.count
	}
}

export const actions = {
	CountIncrement({commit}){
		commit('INCREMENT')
	},
	CountDecrement({commit}){
		commit('DECREMENT')
	}
}

export const getters = {
	getCountingNum(state){
		return state.count
	}
}