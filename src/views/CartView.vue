<template>
    <div class="container">
        <StoreNavbar />
        <h2>Meu Carrinho</h2>
        <div v-if="this.pedido.itens != undefined">
            <div class="cart">
                <table>
                    <thead>
                        <!-- <th>Imagem</th> -->
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
                        <td>
                            <button @click.prevent="alteraQuantidade(-1, produto.produtoId)">-</button>
                            <span class="cart-qtd">{{ produto.quantidade }}</span>
                            <button @click.prevent="alteraQuantidade(1, produto.produtoId)">+</button>
                        </td>
                        <td>{{ produto.subtotal }}</td>
                    </tr>
                </table>
                <div class="cart-detail">
                    <div class="pay-box">
                        <p>Forma de Pagamento</p>
                        <label for="pix" class="pay-option">
                            <input v-model="pedido.formaPagamento" type="radio" name="payOptions" id="pix" value="PIX" @change="submitPedido()">
                            Pix (10% de desconto)
                        </label>
                        <label for="debito" class="pay-option">
                            <input v-model="pedido.formaPagamento" type="radio" name="payOptions" id="debito" value="DEBITO" @change="submitPedido()">
                            Cartão Débito (5% de desconto)
                        </label>
                        <label for="mercadoPago" class="pay-option">
                            <input v-model="pedido.formaPagamento" type="radio" name="payOptions" id="mercadoPago" value="MERCADO_PAGO" @change="submitPedido()">
                            Mercado Pago (3% de desconto)
                        </label>
                        <label for="credito" class="pay-option">
                            <input v-model="pedido.formaPagamento" type="radio" name="payOptions" id="credito" value="CREDITO" @change="submitPedido()">
                            Crédito (Até 10x no cartão)
                        </label>
                    </div>
                    <div class="pay-box">
                        <p>Subtotal: R$ {{ pedido.subtotal }}</p>
                        <p>Frete: R$ {{ pedido.frete }}</p>
                        <p>Descontos: - R$ {{ pedido.descontos }}</p>
                        <p>Total: R$ {{ pedido.total }}</p>
                        <button @click="conferirPedido()" class="butn">Fechar Pedido</button>
                        <button @click="redirect()" class="butn butn-inverse">Continuar comprando</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>O carrinho está vazio</h2>
        </div>
    </div>
</template>

<script>

import http from '@/service/http'
import StoreNavbar from '@/components/StoreNavbar.vue'

export default{
  components: { StoreNavbar },
    name: 'CartView',
    data(){
        return {
            pedido:{}
        }
    },
    methods: {
        gerarCarrinho(){
            let cart = JSON.parse(localStorage.getItem('loja_cart'))
            if(cart == null) return
            this.pedido = cart
        },
        conferirPedido(){
            let user = JSON.parse(localStorage.getItem('loja_user'))
            if(user)
                this.$router.push({name: 'pedido'})
            else
            this.$router.push({name: 'login'})
        },
        async submitPedido(){
            try {
                const resp = await http.post("carrinho", this.pedido)
                localStorage.setItem('loja_cart', JSON.stringify(resp.data))
                this.gerarCarrinho()
                this.$emit('cartModified')
            } catch (error) {
                switch(error.response.data.status){
                    case 500:this.$router.push({name: 'login'}); break
                    case 400: alert(error.response.data.message); this.$router.push({name: 'endereco'}); break
                    default: alert('Erro '+error.response.data.status); break
                }
            }
        },
        alteraQuantidade(valor, produto){
            this.pedido.itens.map(item=>{
                if(item.produtoId == produto){
                    item.quantidade = parseInt(item.quantidade) + valor
                }
            })
            this.submitPedido()
        },
        redirect(){
            this.$router.push({name: 'home'})
        }
    },
    mounted(){
        this.gerarCarrinho()
    }
}

</script>

<style lang="scss" scoped>

.cart{
    display: flex;

    .cart-qtd{
        padding: 0.5em;
    }

    .cart-detail{
        display: flex;
        border: 1px solid #ccc;
        margin-left: auto;
        
        .pay-box{
            display: flex;
            flex-direction: column;
            padding: 1em;
            background-color: #fff;
        }

        .pay-option{
            border: 1px solid #ccc;
            padding: 0.5em;
            background-color: #fff;
        }
    }
}

</style>