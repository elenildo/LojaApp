<template>
    <div class="container">
        <store-navbar />
        <h2>Perfil</h2>
        <p>Nome: {{ user.nome }} {{ user.sobrenome }}</p>
        <p>Email: {{ user.email }}</p>
        <div v-if="user.endereco">
            <h3>Endereço</h3>
            <ul>
            <li>Rua: {{ user.endereco.rua }}</li>
            <li>Bairro: {{ user.endereco.bairro }}</li>
            <li>Cidade: {{ user.endereco.cidade }}</li>
            <li>Estado: {{ user.endereco.estado }}</li>
            <li>CEP: {{ user.endereco.cep }}</li>
        </ul>
        </div>
        <p v-else>Endereço não cadastrado</p>
    </div>
    
</template>

<script>
import http from '@/service/http'
import StoreNavbar from '@/components/StoreNavbar.vue'

export default {
  components: { StoreNavbar },
    name: 'ProfileView',
    data(){
        return {
            user: {
                nome: "",
                sobrenome: "",
                email: "",
                endereco: {}
            }
        }
    },
    mounted(){
        this.getPerfil()
    },
    methods: {
        async getPerfil(){
            try {
                const resp = await http.get('perfil',{
                    headers: {
                        "Authorization": "Bearer "+ localStorage.getItem("loja_token")
                    }
                })
                this.user.nome = resp.data.nome
                this.user.sobrenome = resp.data.sobrenome
                this.user.email = resp.data.email
                this.user.endereco = resp.data.endereco//JSON.parse(resp.data.endereco)

                console.log(resp)
            } catch (error) {
                console.log(error)
                localStorage.removeItem("loja_token")
                localStorage.removeItem("loja_user")
                this.$router.push({name: 'login'})
            }
        },
        pegarPerfil(){
            this.user = JSON.parse(localStorage.getItem("loja_user"))
            console.log(this.user)
        }
    }
}
</script>