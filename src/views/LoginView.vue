<template>
    <div class="container">
        <store-navbar />

        <form @submit.prevent="submit()" class="form-layout">
            <h2>Login</h2>
            <div class="form-component">
                <label for="login">Email</label>
                <input type="email" id="login" v-model="user.login">
            </div>
            <div class="form-component">
                <label for="password">Senha</label>
                <input type="password" id="password" v-model="user.password">
            </div>
            <div class="form-component">
                <button class="butn">Entrar</button>
            </div>
            <div class="form-component">
                <router-link :to="{name: 'register'}">Criar Novo Usuário</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import http from '@/service/http'
import StoreNavbar from '@/components/StoreNavbar.vue';

export default {
    name: "LoginView",
    components: { StoreNavbar },
    data(){
        return{
            user: {
                login: "elenildoms@gmail.com",
                password: "123123"
            },
        }
    },
    methods:{
        async submit(){
            try {
                const resp = await http.post("auth/login", this.user)
                let loggedUser = resp.data.user

                localStorage.setItem('loja_token', "Bearer "+ resp.data.token)
                localStorage.setItem('loja_user', JSON.stringify(loggedUser))

                this.$emit('login')
                
                if(loggedUser.endereco == null){
                    this.$router.push({name: 'endereco'})
                } else if(localStorage.getItem('loja_cart')){
                    this.$router.push({name: 'carrinho'})
                } else
                    this.$router.push({name: 'home'})
                
            } catch (error) {
                console.log(resp)
                this.limparForm()
            }
        },
        limparForm(){
            this.user.login = ""
            this.user.password = ""
        }
    }
}
</script>

<style lang="scss" scoped>

</style>