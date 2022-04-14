<template>
	<div>
		<h1>About Page</h1>
		<nuxt-link to="/">Back Home</nuxt-link>

		<fieldset style="margin-top: 5rem;">
			<legend>Counting Number Using Vuex</legend>

			<h2>
				{{count}}
			</h2>

			<button @click="Increment">
				+
			</button>

			<button @click="Decrement">
				-
			</button>

		</fieldset>
	</div>
</template>

<script>
	export default{
		name: 'AboutPage',
		layout: 'default',

		methods: {
			Increment(){
				this.$store.dispatch('count/CountIncrement')
			},

			Decrement(){
				this.$store.dispatch('count/CountDecrement')
			}
		},

		computed:{
			count(){
				return this.$store.getters['count/getCountingNum']
			}
		}
	}
</script>