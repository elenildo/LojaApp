<template>
    <div>
        <form @submit.prevent="submit()" class="form-layout">
            <h2>Registrar endereço</h2>
            <div class="form-component">
                <label for="cep">CEP</label>
                <input @focusout="buscarEnderecoViacep" type="text" id="cep" v-model="endereco.cep" v-mask="'##.###-###'">
            </div>
            <div class="form-component">
                <label for="rua">Logradouro/rua/avenida</label>
                <input type="text" id="rua" v-model="endereco.rua">
            </div>
            <div class="form-component">
                <label for="bairro">Bairro</label>
                <input type="text" id="bairro" v-model="endereco.bairro">
            </div>
            <div class="form-component">
                <label for="numero">Número</label>
                <input type="text" id="numero" v-model="endereco.numero">
            </div>
            <div class="form-component">
                <label for="cidade">Cidade</label>
                <input type="text" id="cidade" v-model="endereco.cidade">
            </div>
            <div class="form-component">
                <label for="estado">Estado</label>
                <select id="estado" v-model="endereco.estado">
                    <option selected value="" disabled>Selecione o Estado</option>
                    <option value="SP">São Paulo</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="ES">Espírito Santo</option>
                    
                </select>
            </div>
            <div class="form-component">
                <label for="principal">Endereço principal</label>
                <input type="checkbox" id="principal" v-model="endereco.principal">
            </div>
            
            <div class="form-component">
                <button @click.prevent="submit()" class="butn">Registrar</button>
            </div>
        </form>
    </div>
</template>

<script>
import http from '@/service/http'
import {TheMask} from 'vue-the-mask'

export default {
    name: 'RegisterForm',
    components:{
        TheMask
    },
    data(){
        return{
            user: null,
            endereco:{
                id: null,
                cep: "",
                rua: "",
                numero: "",
                bairro: "",
                cidade: "",
                estado: "",
                principal: true
            }
        }
    },
    methods:{
        submit(){
            if(this.id == null){
                this.novoEndereco()
            } else {
                this.alterarEndereco()
            }  
        },
        async buscarEnderecoViacep(){
            let cep = this.endereco.cep.replace(/[^0-9,]*/g, '').replace(',', '.')
            if(cep.length != 8) return alert("Formato de CEP inválido")

            try {
                const response = await http.get(`https://viacep.com.br/ws/${cep}/json/`)
                
                if(response.data.erro) 
                    alert("CEP não localizado")

                this.endereco.rua = response.data.logradouro
                this.endereco.bairro = response.data.bairro
                this.endereco.cidade = response.data.localidade
                this.endereco.estado = response.data.uf
                
            } catch (error) {
                alert(error)
            }
        
        },
        novoEndereco(){
            http.post(`perfil/endereco`, this.endereco, {
                headers: {
                    "Authorization": "Bearer "+ localStorage.getItem("loja_token")
                }
            }).then(response=>{
                var user = JSON.parse(localStorage.getItem('loja_user'))
                user.endereco = response.data
                localStorage.setItem('loja_user', JSON.stringify(user))

                this.$router.push({name: 'home'})

            }).catch(error=>{
                console.log(error)
            })
        },
        alterarEndereco(){
            http.patch(`perfil/endereco/${this.endereco.id}`, this.endereco, {
                headers: {
                    "Authorization": "Bearer "+ localStorage.getItem("loja_token")
                }
            }).then(response=>{
                var user = JSON.parse(localStorage.getItem('loja_user'))
                user.endereco = response
                localStorage.setItem('loja_user', JSON.stringify(user))
                this.$router.push({name: 'home'})
                
            }).catch(error=>{
                console.log(error)
            })

        },
        limparForm(){
          
        },

        carregaEndereco(){
            this.user = JSON.parse(localStorage.getItem('loja_user'))
            console.log(this.user.endereco)
            if(this.user.endereco) this.endereco = this.user.endereco
        },
    },
    mounted(){
        this.carregaEndereco()
    }
}
</script>

<style lang="scss" scoped>
.form-layout{
    width: 400px;
    margin: 0 auto;
    border: 1px solid #ccc;
    box-shadow: 0.5em 0.5em #ccc;
    background-color: #fff;
    padding: 2em;

    .form-component{
        display: flex;
        flex-direction: column;
        margin-bottom: 1em;

        label{
            font-weight: bold;
            margin-bottom: 0.5em;
        }

        input{
            padding: 0.5em;
        }
    }
}
</style>