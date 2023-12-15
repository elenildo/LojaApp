<template>
     <nav>
        <router-link :to="{name:'home'}">Home</router-link>
        <!-- <router-link to="/about">About</router-link> -->
    </nav>
</template>

<script>
export default {
    name: 'StoreNavbar'
}
</script>

<style lang="scss" scoped>
nav {
    padding: 10px;
    background-color: #fff;
    
    a {
        font-weight: bold;
        color: #2c3e50;
        text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>