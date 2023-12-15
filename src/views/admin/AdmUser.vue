<template>
    <div class="adm-main">
        <menu-left></menu-left>
        <div class="adm-content">
            <div class="container-adm">
                <h2>Usuários</h2>
                <div class="search-bar">
                    <input type="text" placeholder="Digite o email" v-model="busca" v-on:keyup="buscar()">
                    <label for="rows">Registros por página:</label>
                    <select v-model="rowsPerPage" @change="getUsuarios(page)" id="rows">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Papel</th>
                        </tr>
                    </thead>
                    <tr v-for="usuario in usuarios.content" :key="usuario.usuarioEmail">
                        <td>{{ usuario.usuarioEmail }}</td>
                        <td>
                            <select v-model="usuario.papel" @change="submit(usuario.usuarioEmail, usuario.papel)">
                                <option value="USER">Usuário</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <paginator-store :source="usuarios" @navigate="navigate" />
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
    components: {
        MenuLeft,
        MainContent,
        PaginatorStore
    },
    data() {
        return {
            usuarios: [],
            usuario: {
                usuarioEmail: null,
                papel: null
            },
            busca: "",
            rowsPerPage: 5
        }
    },
    methods: {
        getUsuarios(page) {
            http.get(`admin/usuarios?page=${page}&size=${this.rowsPerPage}`).then(resp=>{
                this.usuarios = resp.data
            }).catch (error=>{
                this.$router.push({ name: 'erro', query: { message: error.response.data.error } })
            })
        },
        navigate(page) {
            this.getUsuarios(page - 1)
        },
        submit(email, papel) {
            if (!confirm("Deseja alterar o papel deste usuários?")) {
                return
            }
            this.usuario.papel = papel
            this.usuario.usuarioEmail = email
            http.post("admin/usuarios/roles", this.usuario).then(resp=>{
                alert("Usuário alterado com sucesso!")
            }).catch(error=>{
                alert("Erro ao atualizar papel: " + error.response.data.error)
            })
        },
        buscar() {
            http.post(`admin/usuarios/busca?email=${this.busca}&size=${this.rowsPerPage}`).then(resp=>{
                this.usuarios = resp.data
            }).catch(error=>{
                alert("Erro ao buscar usuário: " + error)
            })
        },
    },
    created() {
        this.getUsuarios()
    }
}
</script>

<style lang="scss"></style>