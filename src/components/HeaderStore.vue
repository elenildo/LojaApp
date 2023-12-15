<template>
    <header>
        <div class="header-body">
            <router-link to="/">
                <img src="../assets/logo.png" alt="Logotipo">
            </router-link>
            <form @submit.prevent="enviarPesquisa()">   
                <input type="text" v-model="busca" placeholder="Digite algo aqui">
                <button class="butn">Pesquisar</button>
            </form>
            <ul>
                <li>
                    <router-link :to="{name: 'carrinho'}">
                    <span v-if="cartItens > 0" class="itens-total">{{ cartItens }}</span>
                    <img src="../assets/Cart-icon.png" alt="Carrinho Vazio">
                    </router-link>
                </li>
                <li v-if="user"><router-link :to="{name: 'perfil'}"><span>Olá, {{ user.nome }}</span></router-link></li>
                <li v-if="user && user.role == 'ADMIN'"><router-link :to="{name: 'admin'}"><span>Dash</span></router-link></li>
                
                <li v-if="!user"><router-link :to="{name: 'login'}">Login</router-link></li>
                <li v-if="user" ><span @click="logout()">Logout</span></li>
            </ul>
        </div>
    </header>
</template>

<script>
export default{
    name: 'Header',
    props:['user','cartItens'],
    data(){
        return {
            busca: ""
        }
    },
    methods:{
        enviarPesquisa(){
            console.log(this.busca)
        },
        logout(){
            this.$emit('logout')
        },
    }

}
</script>

<style lang="scss" scoped>
header{
    background-color: #5d7dae;
}
form{
    input{
        width: 400px;
        height: 30px;
        font-size: 1em;
        padding-left: 10px;
    }
}
.header-body{
    width: 90%;
    margin: 0 auto;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
    width: 70px;
    }

    .itens-total{
        border-radius: 50%;
        background-color: #e66464;
        width: 30px;
        height: 30px;
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        top: 54px;
        color: #fff;
    }
}

ul{
   list-style-type: none;
   display: contents;

   li{
    padding:0 0.5em;
   }

   li a{
    text-decoration: none;
    color: #fff;
   }

   li span{
    color: #f4c843;
    cursor: pointer;
   }
}

</style>
