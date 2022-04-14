<template>
	<div>
		<nuxt-link to="/">back home</nuxt-link>

		<h1>
			{{content.title}}
		</h1>

		<article v-html="content.content"></article>

	</div>
</template>

<script>
	import {Articles} from '@/database'

	export default {
		name: 'blog-slug',
		layout: 'default',
		data(){
			return {
				title: this.$route.params.title
			}
		},
		async asyncData({params}){
			const title = params.title
			const articles = await  Articles.map(d => d)
			const content = articles.find(d => d.title === title)
			
			return {
				content
			}
		}
	}
</script>