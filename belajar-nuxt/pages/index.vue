<template>
  <div>    
    <nuxt-link to="/about">About Page</nuxt-link>
    <!-- import homepage component -->
    <HomepageHeaderHomepage/>

   <!--  <ul>
      <div v-for="(item, index) in products">
        <li>{{item.name}}</li>
        <li> {{item.description}} </li>
        <li> <strong>Price : {{item.price}} </strong> </li>
      </div>
    </ul> -->

    <div class="blog__lists">
      <div v-for="blog in articles" class="content__here">

        <h2> {{blog.title}} </h2>

        <article v-html="blog.content"></article>

        <nuxt-link :to="{
          name: 'blog-slug',
          params: {
            slug: $slug(blog.title),
            title: blog.title
          }
        }">Baca Selengkapnya</nuxt-link>

      </div>
    </div>

  </div>
</template>

<script>
  import {Products, Articles} from '@/database'

  export default {
    name: 'IndexPage',
    layout: 'default',

    data(){
      return {
        title: 'Welcome in my NuxtJS App',
        products: Products
      }
    },

    async asyncData(){
      const articles = await Articles

      return {
        articles
      }
    },

    methods: {
      Increment(){
        this.$store.dispatch('count/CountIncrement')
      },
      Decrement(){
        this.$store.dispatch('count/CountDecrement')
      }
    },

    computed: {
      count(){
        return this.$store.getters['count/getCountingNum']
      }
    }
  }
</script>

<style scoped>
  h3{
    color: coral;
  }
  ul li {
    list-style: none;
    margin-bottom: 1rem;
  }
</style>
