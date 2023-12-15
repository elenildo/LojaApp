<template>
    <div class="container">
        <StoreNavbar />
        <h2>Resumo do Pedido</h2>
        <table>
            <tr>
                <td>
                    <h4>Cliente</h4>
                    <p>{{ this.usuario.nome }} {{ this.usuario.sobrenome }}</p>
                    <h4>Endereço de Entrega</h4>
                    <p>{{ this.usuario.endereco.rua }}, número {{ this.usuario.endereco.numero }}</p>
                    <p>{{ this.usuario.endereco.bairro }}, {{ this.usuario.endereco.cidade }}/{{ this.usuario.endereco.estado }}</p>
                </td>
                <td>
                    <div class="cart">
                        <table class="order-itens">
                        <thead>
                            <th>Cod</th>
                            <th>Produto</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Subtotal</th>
                        </thead>
                        <tr v-for="produto in this.pedido.itens" :key="produto.id">
                            <!-- <td><img :src="'data:image/jpeg;base64,'+produto.foto" :alt="produto.nome" /></td> -->
                            <td>{{ produto.produtoId }}</td>
                            <td>{{ produto.produto }}</td>
                            <td>{{ produto.precoUnitario }}</td>
                            <td>{{ produto.quantidade }}</td>
                            <td>{{ produto.subtotal }}</td>
                        </tr>
                    </table>
                    <div class="cart-detail">
                        <div class="pay-box">
                            <h4>Forma de Pagamento: {{ this.pedido.formaPagamento }}</h4>
                        </div>
                        <div class="pay-box">
                            <p><strong>Subtotal: </strong>R$ {{ pedido.subtotal }}</p>
                            <p><strong>Frete: </strong>R$ {{ pedido.frete }}</p>
                            <p><strong>Descontos: </strong>R$ - {{ pedido.descontos }}</p>
                            <p><strong>Total: </strong>R$ {{ pedido.total }}</p>
                        </div>
                    </div>
                        
                    </div>
                </td>
            </tr>
        </table>
       
        <div class="float-right mt-2">
            <img v-if="busy" src="../assets/loading.gif" alt="loading" class="loading">
            <div v-else>
                <button  @click="submitPedido()" class="butn"> Fechar Pedido</button>
                <button @click="redirect()" class="butn butn-inverse"> Continuar comprando</button>
            </div>
        </div>
        
    </div>
</template>

<script>

import http from '@/service/http'
import StoreNavbar from '@/components/StoreNavbar.vue'

export default{
  components: { StoreNavbar },
    name: 'OrderSummary',
    data(){
        return {
            pedido: {},
            usuario: null,
            busy: false
        }
    },
    methods: {
        setCarrinho(){
            let cart = JSON.parse(localStorage.getItem('loja_cart'))
            if(cart == null) return

            this.usuario = JSON.parse(localStorage.getItem('loja_user'))
            this.pedido = cart
            
        },
        async submitPedido(){
            this.busy = true
            try {
                const resp = await http.post("carrinho", this.pedido, {
                    headers: {
                        "Authorization": "Bearer "+ localStorage.getItem("loja_token")
                    }
                })
                alert(`Pedido nº ${resp.data.numero} gerado com sucesso. Verifique seu email.`)
                localStorage.removeItem('loja_cart')
                this.$router.push({name: 'home'})

            } catch (error) {
                switch(error.response.data.status){
                    case 500: this.$router.push({name: 'login'}); break
                    case 424: alert('Erro.\nNão foi possível enviar o e-mail de confirmação.\nCód. '+error.response.data.status); this.$router.push({name: 'home'}); break
                    case 400: alert(error.response.data.message); this.$router.push({name: 'endereco'}); break
                    default: alert('Erro.\nCód. '+error.response.data.status); break
                }
                
            } finally{
                this.busy = false
            }
        },
        redirect(){
            this.$router.push({name: 'home'})
        }
    },
    mounted(){
        this.$emit('login')
        this.$emit('cartModified')
    },
    created(){
        this.setCarrinho()
    }
}

</script>

<style lang="scss" scoped>
table{
    width: 100%;
}

.order-itens{
    width: 100%;
    border-collapse: collapse;

    td, th {
    // border-collapse: collapse;
    border: 1px solid;
    }
}
.cart-detail{
    float: right;
    text-align: right;
}
.loading{
    width: 40px;
    margin: 0 2em;
}

</style>