<template>
  <div>
    <header-store :user="user" :cartItens="cartItens" @logout="logoff" />
    <router-view @login="loadUser" @cartModified="loadCart" />
  </div>
</template>

<script>
import HeaderStore from './components/HeaderStore.vue'

export default {
  name: 'App',
  components: { HeaderStore },
  data() {
    return {
      user: null,
      cartItens: 0
    }
  },
  methods: {
    loadUser() {
      this.user = JSON.parse(localStorage.getItem("loja_user"))
      console.log(this.user)
    },
    loadCart() {
      var cart = JSON.parse(localStorage.getItem("loja_cart"))
      if (cart == null) {
        this.cartItens = 0
      } else {
        this.cartItens = cart.itens.reduce((acc, value) => acc + parseInt(value.quantidade), 0)
      }
    },
    logoff() {
      this.user = null
      localStorage.removeItem("loja_user")
      localStorage.removeItem("loja_token")
      localStorage.removeItem("loja_cart")
      if(this.$route.name != 'home') this.$router.push({name: 'home'})
    }
  }
}


</script>

<style lang="scss">
.float-right {
  float: right;
}

body {
  background-color: #f1f1f1 !important;
  color: #333;
  margin: 0;
}

a {
  text-decoration: none;
}

input[type="number"] {
  width: 100px;
}

select {
  padding: 0.2em;
  background-color: #fff;
  border: 1px solid #999;
}

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  text-align: justify;
  background-color: #fff;
  margin-top: 1em;

  td,
  th {
    border: 1px solid #ccc;
    padding: 0.3em;
  }
}

.container {
  width: 90%;
  margin: 0 auto;
}

.container-adm {
  width: 80%;
  margin: 0 auto;
}

.adm-main {
  display: flex;

  .adm-content {
    padding: 1em;
    background-color: #fff;
    width: 100%;

    table {
      width: 100%;
      text-align: justify;
    }
  }
}

.butn {
  padding: 0.5em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  background-color: #33b328;
  border: 1px solid #333;
  color: white;
  cursor: pointer;
  font-size: 1em;
  min-width: 100px;
}

.butn-inverse {
  color: #333;
  background-color: #fff;

}

.warning {
  background-color: #e66464;
}

.form-layout {
  width: 400px;
  margin: 0 auto;
  border: 1px solid #ccc;
  box-shadow: 0.5em 0.5em #ccc;
  background-color: #fff;
  padding: 2em;
  margin-top: 1em;

  .form-row {
    display: flex;
  }

  .form-component {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;

    label {
      font-weight: bold;
      margin-bottom: 0.5em;
    }

    input {
      padding: 0.2em;
    }

    a {
      border: 1px solid #ccc;
      text-decoration: none;
      padding: 5px;
      text-align: center;
    }
  }
}

.form-adm {
  @extend .form-layout;
  width: 100%;
  box-shadow: none;
  border: none;
}</style>
