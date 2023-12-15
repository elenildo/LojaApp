# LojaApp
App para consumir a Loja Api

Projeto de App de Loja virtual escrito em VueJS para consumir a LojaApi

Implementações

    Vitrine de produtos
    Produtos cadastrados são listados na página inicial, com seus preços e imagens. Ao clicar num produto, será aberta uma nova página com detalhes do produto em questão. Um produto só estará disponível para a venda se houver quantidade suficiente em estoque.

    Formulários de login e registro de usuários
    No formulário de login, existe o botão de cadastro de novos usuários. A princípio, todos os novos usuários terão o perfil USER e só poderão ser promovidos a ADMIN por um usuário Administrador já existente. O usuário Administrador padrão pode acessar a área administrativa atraveś do login 'admin@teste.com' e senha '123123'

    Carrinho de compras
    Ao clicar no botão Comprar na página de detalhe do produto, é criado o carrinho do usuário e salvo no Armazenamento Local. Para acessar os itens do carrinho é necessário clicar na imagem do carrinho na barra superior da página. Para finalizar a compra, o usuário será redirecionado para a página de login, caso já não esteja logado.

    Área administrativa
    Para usuários com perfil Administrador, fica disponível a área administrativa na barra superior no link 'Dash'. Nesta área é possível cadastrar categorias de produtos, produtos, lançar produtos em estoque e alterar perfis de usuários.

O app consome a Api Loja-Api-Spring-Boot, disponível nos repositórios.
Faltam recursos como envio de emails, sistema de pagamento, pesquisas avançadas e melhorias no leiaute (FrontEnd não é meu forte ;)).
O projeto é somente para fins de estudo e prática de programação, não deve ser usado em produção.
