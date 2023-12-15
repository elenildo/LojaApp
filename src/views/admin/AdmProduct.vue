<template>
    <div class="adm-main">
        <menu-left></menu-left>
        <div class="adm-content">
            <div class="container-adm">
                <div v-if="!this.showForm && !this.showImage">
                    <h2>Produtos</h2>
                    <div class="search-bar">
                        <input type="text" placeholder="Digite o nome do Produto" v-model="busca" v-on:keyup="buscar()">
                        <label for="rows">Registros por página:</label>
                        <select v-model="rowsPerPage" @change="getProdutos(page)" id="rows">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                        <button v-if="this.produto.id == null" @click="novo()" class="butn float-right">Adicionar</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Valor de compra</th>
                                <th>Valor de venda</th>
                                <th>Estoque Mínimo</th>
                                <th>Estoque atual</th>
                                <th>Status</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tr v-for="produto in produtos.content" :key="produto.id">
                            <td>{{ produto.id }}</td>
                            <td>{{ produto.nome }}</td>
                            <td>{{ produto.categoria.nome }}</td>
                            <td>{{ produto.precoCompra }}</td>
                            <td>{{ produto.precoVenda }}</td>
                            <td>{{ produto.estoqueMinimo }}</td>
                            <td>{{ produto.estoqueAtual }}</td>
                            <td>{{ produto.ativo?'Ativo':'Inativo' }}</td>
                            <td>
                                <a href="" @click.prevent="editar(produto)">Editar</a>
                            </td>
                        </tr>
                    </table>
                    <paginator-store :source="produtos" @navigate="navigate"/>
                </div>

                <form v-if="this.showForm && !this.showImage" @submit.prevent="submit()" class="form-adm">
                    <h2>Produto</h2>
                    <div class="form-row">
                        <div class="form-component">
                            <label for="categoria">Categoria</label>
                            <select id="categoria" v-model="produto.categoria.id">
                                <option disabled>Selecione a categoria</option>
                                <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                                {{ categoria.nome }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-component">
                        <label for="nome">Título</label>
                        <input type="text" id="nome" v-model="produto.nome">
                    </div>

                    <div class="form-row">
                        <div class="form-component">
                            <label for="precoCompra">Valor de compra</label>
                            <input type="number" id="precoCompra" v-model="produto.precoCompra" step=".01">
                        </div>
                        <div class="form-component">
                            <label for="precoVenda">Valor de venda</label>
                            <input type="number" id="precoVenda" v-model="produto.precoVenda" step=".01">
                        </div>
                        <div class="form-component">
                            <label for="estoqueMin">Estoque mínimo</label>
                            <input type="number" id="estoqueMin" v-model="produto.estoqueMinimo" step=".01">
                        </div>
                        <div class="form-component">
                            <label for="estoqueMin">Estoque Atual</label>
                            <input type="number" id="estoqueMin" v-model="produto.estoqueAtual" disabled>
                        </div>
                    </div>
                    <div class="form-component">
                        <label for="descricao">Descrição (Conteúdo em formato HTML)</label>
                        <textarea id="descricao" cols="100" rows="10" v-model="this.produto.descricao"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-component">
                            <a href="#" v-if="this.produto.id != null" @click.prevent="showImages()"><span>Imagens do produto</span></a>
                        </div>
                    </div>
                    <div class="form-row">
                        <button class="butn">Salvar Alterações</button>
                        <input type="button" value="Voltar" @click.prevent="fecharForm()" class="butn butn-inverse">
                    </div>
                </form>

                <form v-if="this.showImage" @submit.prevent="uploadImagens" enctype="multipart/form-data" accept="image/*" class="form-adm">
                    <h2>Imagens de {{ this.produto.nome }}</h2>
                    <div class="image-panel">
                        <div v-for="imagem in produto.imagens" :key="imagem.caminho">
                            <label :for="key">
                            <img :src="`data:image/jpeg;base64,${imagem.imagem}`" :alt="produto.nome"/>
                            <input type="checkbox" v-model="imagem.delete" :id="key">
                            </label>
                        </div>
                        <label for="imagens">
                            <img src="@/assets/plus.png" title="Adicionar">
                            <input type="file" @change.prevent="subirImagens" multiple="multiple" name="files" id="imagens">
                        </label>
                    </div>
                    <div class="form-row">
                        <button v-if="this.files != null" class="butn">Enviar</button>
                        <a href="#" @click.prevent="sendToDelete" class="butn warning">Remover</a>
                        <a href="#" @click.prevent="showImages" class="butn butn-inverse">Voltar</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/service/http_auth'
import MenuLeft from '@/components/admin/MenuLeft.vue'
import MainContent from '@/components/admin/MainContent.vue'
import PaginatorStore from '@/components/PaginatorStore.vue'

export default {
   name: 'AdmHome',
   components:{
    MenuLeft,
    MainContent,
    PaginatorStore
},
   data(){
    return{
        produtos: [],
        categorias: [],
        files: null,
        produto: {
            id: null,
            nome: null,
            categoria: {
                id: null
            },
            produto: null,
            precoCompra: null,
            precoVenda: null,
            estoqueMinimo: null,
            estoqueAtual: null,
            descricao: null,
            ativo: true,
            imagens: []
        },
        busca: "",
        showForm: false,
        showImage: false,
        rowsPerPage: 10
    }
   },
   methods:{
      getProdutos(page){
          http.get(`admin/produtos?page=${page}&size=${this.rowsPerPage}`).then(resp=>{
            this.produtos = resp.data
            this.limparForm()
          }).catch(error=>{
            this.$router.push({name: 'erro', query:{message: error.response.data.error }})
          })
      },
      navigate(page){
        this.getProdutos(page-1)
      },
      submit(){
        if(this.produto.id){
            this.alterar()
        } else {
            this.salvar()
        }
      },
      salvar(){
        http.post('admin/produtos', this.produto).then(resp=>{
            this.produto = resp.data
            alert('Produto Salvo com sucesso')
        }).catch(error=>{
            alert(error)
        })

      },
      novo(){
        this.limparForm()
        this.showForm = true
      },
      alterar(){
        if(! confirm('Deseja alterar esse produto?')){
            this.limparForm()
            return
        }
        http.patch(`admin/produtos/${this.produto.id}`, this.produto).then(resp=>{
            this.getProdutos()

        }).catch(error=>{
            alert(error)
        })
      },
      getCategorias(){
        http.get('admin/categorias').then(resp=>{
            this.categorias = resp.data.content

          }).catch(error=>{
            alert('Não foi possível carregar as categorias')
          })
      },
      editar(produto){
        this.produto.id = produto.id
        this.produto.nome = produto.nome
        this.produto.categoria = produto.categoria
        this.produto.precoCompra = produto.precoCompra
        this.produto.precoVenda= produto.precoVenda
        this.produto.estoqueMinimo = produto.estoqueMinimo
        this.produto.estoqueAtual = produto.estoqueAtual
        this.produto.ativo = produto.ativo
        this.produto.descricao = produto.descricao
        this.produto.imagens = produto.imagens
        this.showForm = true
      },
      limparForm(){
        this.produto = {
            categoria: {},
            imagens: []
        }
        this.showForm = false
      },
      buscar(){
          http.post(`admin/produtos/busca?nome=${this.busca}&size=${this.rowsPerPage}`).then(resp=>{
            this.produtos = resp.data

          }).catch(error=>{
            alert("Erro ao buscar produto: "+error)
          })
      },
      fecharForm(){
        this.limparForm()
      },
      showImages(){
        this.showImage = !this.showImage
        if(!this.showImage) this.files = null
      },
      subirImagens(e){
        this.files = e.target.form
      },
      uploadImagens(e){
        http.post(`admin/produtos/${this.produto.id}/imagens`,this.files, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then(resp=>{
            alert("Imagens adicionadas com sucesso")
            this.produto = resp.data
            this.showImage = false
            this.showForm = true
            this.files = null
        })
      },
      sendToDelete(){
        const listaRemovidos = []
        this.produto.imagens.forEach(item=>{
            if(item.delete){
                listaRemovidos.push({
                    "caminho": item.caminho
                })
            }
        })
        if(listaRemovidos.length>0){
            if(! confirm('Deseja excluir as fotos selecionadas?')) return
            
            http.delete(`admin/produtos/${this.produto.id}/imagens`, { data: listaRemovidos}).then(resp=>{
                this.produto = resp.data
                this.$forceUpdate()
            })
        }
        }
    },
    mounted(){
        this.getProdutos(0)
        this.getCategorias()
    }
}
</script>

<style lang="scss" scoped>

.image-panel{
    display: flex;
    margin-bottom: 1em;

    div{
        border: 1px solid #ccc;
        margin-right: 0.2em;
    }
    img{
        width: 100px;
        cursor: pointer;
    }
    input[type='file']{
        display: none;
    }

}


</style>