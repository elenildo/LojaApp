<template>
    <div>
        <form @submit.prevent="submit()" class="form-layout">
            <h2>Criar novo Usuário</h2>
            <div class="form-component">
                <label for="nome">Nome</label>
                <input type="text" id="nome" v-model="user.nome">
            </div>
            <div class="form-component">
                <label for="sobrenome">Sobrenome</label>
                <input type="text" id="sobrenome" v-model="user.sobrenome">
            </div>
            <div class="form-component">
                <label for="login">Email</label>
                <input type="email" id="login" v-model="user.login">
            </div>
            <div class="form-component">
                <label for="password">Senha</label>
                <input type="password" id="password" v-model="user.password">
            </div>
            <div class="form-component">
                <button class="butn">Registrar</button>
            </div>
        </form>
    </div>
</template>

<script>
import http from '@/service/http'

export default {
    name: 'RegisterForm',
    data(){
        return{
            user: {
                nome: "Paulo",
                sobrenome: "Souza",
                login: "admin@teste.com",
                password: "123123"
            }
        }
    },
    methods:{
        async submit(){
            try {
                const data = await http.post("auth/register", this.user)
                this.limparForm()
                this.$router.push({name: 'login'})

            } catch (error) {
                alert(error.response.data.message)
                this.limparForm()
            }
        },
        limparForm(){
            this.user.login = ""
            this.user.nome = ""
            this.user.sobrenome = ""
            this.user.password = ""
        }
    }
}
</script>

<style lang="scss" scoped>
</style>