<template>
  <div class="container">
    <store-navbar />
    <product-card v-for="produto in produtos" :key="produto.id" :produto="produto" />
  </div>
</template>

<script>
import http from '@/service/http'
import ProductCard from '@/components/ProductCard.vue'
import StoreNavbar from '@/components/StoreNavbar.vue'

export default {
  components: { ProductCard, StoreNavbar },
  name: 'HomeStore',
  data() {
    return {
      produtos: []
    }
  },
  mounted() {
    this.getProdutos()
    this.$emit('login')
    this.$emit('cartModified')
  },
  methods: {
    getProdutos() {
        http.get("home").then(resp=>{
          this.produtos = resp.data.content
        }).catch(error=>{
          alert(error)
        })
    }
  }
}
</script>
