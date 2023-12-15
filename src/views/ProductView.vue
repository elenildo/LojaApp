<template>
  <div class="container">
    <store-navbar />
      <table>
          <tr>
              <td>
                  <div class="product-col">
                      <div class="product-images-carrousel">
                          <div class="carrousel-header">
                              <img v-for="(imagem, index) in produto.imagens" :key="index" 
                              :src="'data:image/jpeg;base64,'+imagem.imagem" @click="mudaImagem(index)"/>
                          </div>
                          <div class="product-image">
                              <img v-if="primeiraImagem" :src="'data:image/jpeg;base64,'+primeiraImagem.imagem" :alt="produto.nome">
                              <img v-else src="../assets/noimage.jpg" alt="Sem imagem">
                          </div>
                      </div>
                  </div>
              </td>
              <td>
                  <div class="product-col">
                      <h2 v-text="produto.nome"></h2>
                      <span>R$</span>
                      <p v-text="produto.precoVenda" class="spn-preco-venda"></p>
                      <div v-if="produto.disponivel">
                        <button @click="adicionarAoCarrinho()" class="butn">Comprar</button>
                      </div>
                      <div v-else>
                        <span>Produto indisponível</span>
                      </div>
                      
                      <div v-if="!this.temCep" class="cep">
                        <h5>Calcule o frete</h5>
                        <input type="text" id="cep" v-model="cep" placeholder="Digite seu CEP">
                        <input type="button" value="Enviar" >
                      </div>
                  </div>
              </td>
          </tr>
          <tr>
            <td colspan="2">
              <h2>Detalhes do produto</h2>
              <div v-html="produto.descricao"></div>
            </td>
          </tr>
        </table>
  </div>

</template>

<script>
import StoreNavbar from '@/components/StoreNavbar.vue'
import http from '@/service/http'

export default {
  name: 'ProductStore',
  components: { StoreNavbar },
  data(){
    return {
        produto: {},
        primeiraImagem: {},
        cep: "",
        temCep: false
    }
  },
  mounted(){
    this.exibirDetalhe()
    this.$emit('login')
    this.$emit('cartModified')
  },
  methods: {
    exibirDetalhe(){
      http.get(this.$route.params.id)
      .then(response=>{
          this.produto = response.data
          this.primeiraImagem = this.produto.imagens[0]

          var carrinho = JSON.parse(localStorage.getItem('loja_cart'))
          var user = JSON.parse(localStorage.getItem('loja_user'))

          if(user && user.endereco != null){
            this.cep = user.endereco.cep
            this.temCep = true
          }

          if(carrinho && carrinho.cep != ''){
            this.cep = carrinho.cep
            this.temCep = true
          }

      }).catch(error=>{
        alert(error)
      })

    },
    mudaImagem(index){
        this.primeiraImagem = this.produto.imagens[index]
    },
    adicionarAoCarrinho(){
      let cart = {
        formaPagamento: 'PIX',
        cep: '',
        itens: []
      }
      
      if(! localStorage.getItem('loja_cart')){
        localStorage.setItem('loja_cart', JSON.stringify(cart))
      } else {
        cart = JSON.parse(localStorage.getItem('loja_cart'))
      }
      
      cart.cep = this.cep
      cart.itens.push({produtoId: this.produto.id, quantidade: 1})

      let user = JSON.parse(localStorage.getItem('loja_user'))
      if(user && user.endereco){
        cart.cep = user.endereco.cep
      }

      const resp = http.post("carrinho", cart).then(resp=>{
        localStorage.setItem('loja_cart', JSON.stringify(resp.data))
        alert("Produto adicionado ao carrinho")

        this.$emit('cartModified')

      }).catch(error=>{
        alert(error.response.data.message)
      })

      // this.$router.push({name: 'carrinho'})
      
    }
  }
}
</script>

<style lang="scss" scoped>

table{
  width: 100%;
  background-color: #fff;
  td{
      width: 50%;
  }
}
.product-images-carrousel{
  text-align: center;
}
.product-col{
  padding: 1em;
  // border: 1px solid #ccc ;
  height: 400px;
  p{
    font-size: 2em;
    margin-top: 0;
  }
}
.carrousel-header{
  margin-bottom: 1.5em;
  span{
    float: left;
    border: 1px solid #ccc;
    padding: 1em;
    cursor: pointer;
  }
  img{
    width: 50px;
    border: 1px solid #ccc;
    margin: 2px;
    cursor: pointer;
  }
    img:hover{
    border: 1px solid #f00;
  }
}
</style>
