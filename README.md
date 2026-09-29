# 🍔 DevBurger API

Esse é o back-end do DevBurger, um sistema de pedidos de uma hamburgueria. Fiz durante a minha formação de programador pra treinar Node.js na prática: login com token, banco relacional, banco de documentos, upload de imagem e tudo mais que uma API de verdade precisa ter.

Estou migrando de carreira (vim da área de comércio exterior e logística) e esse é um dos projetos que estou construindo pra entrar como desenvolvedor front-end. O front-end em React vem na sequência, num repositório separado.

## O que a API faz

- Cadastro de usuários e login com JWT
- Dois tipos de usuário: cliente e admin
- Cadastro e edição de categorias e produtos, com upload de imagem (só admin)
- Criação de pedidos pelo cliente logado
- Atualização do status do pedido (só admin)

## Tecnologias

- **Node.js** com **Express**
- **PostgreSQL** + **Sequelize** (usuários, categorias e produtos)
- **MongoDB** + **Mongoose** (pedidos)
- **JWT** (`jsonwebtoken`) e **bcryptjs** pra autenticação e senha criptografada
- **Yup** pra validar o que chega do cliente
- **Multer** pra upload de imagens
- **Biome** pra formatação

Usei dois bancos de propósito: os dados que se relacionam (categoria → produto) ficam no Postgres, e o pedido fica no Mongo como um documento único, com uma cópia do nome e do preço dos produtos no momento da compra.

## Como rodar na sua máquina

Você vai precisar de Node 20.12 ou mais novo, pnpm, PostgreSQL e MongoDB rodando.

```bash
# 1. clonar o projeto
git clone https://github.com/Cpinheiiro/Projeto-Dev-Burger.git
cd Projeto-Dev-Burger

# 2. instalar as dependências
pnpm install

# 3. criar o arquivo .env (copie o exemplo e preencha)
cp .env.example .env      # Linux/Mac
copy .env.example .env    # Windows (cmd)
```

Abra o `.env` e coloque a sua senha do Postgres e uma chave qualquer pro JWT.

Depois, no Postgres, cria o banco `dev-burger-db` e um usuário chamado `admin` com a mesma senha que você colocou no `DB_PASSWORD`. Se você preferir usar outro usuário, banco ou porta, é só ajustar em `src/config/database.js` e em `src/config/database.cjs`. Com isso pronto, roda as migrations:

```bash
npx sequelize db:migrate
```

A conexão do MongoDB (`mongodb://localhost:27017/...`) está em `src/database/index.js`. Cria também a pasta `uploads` na raiz do projeto, que é onde as imagens são salvas. Por fim:

```bash
pnpm dev
```

O servidor sobe na porta **3001**.

### Variáveis de ambiente

| Variável | Pra que serve |
|---|---|
| `JWT_SECRET` | Chave usada pra assinar os tokens de login |
| `DB_PASSWORD` | Senha do PostgreSQL |

## Rotas

Tudo que está abaixo de "login necessário" precisa do token no header `Authorization: Bearer SEU_TOKEN`.

| Método | Rota | Acesso | O que faz |
|---|---|---|---|
| POST | `/users` | público | Cadastra um usuário |
| POST | `/session` | público | Faz login e devolve o token |
| POST | `/products` | admin | Cria um produto (com imagem) |
| PUT | `/products/:id` | admin | Edita um produto |
| GET | `/products` | admin | Lista os produtos |
| POST | `/categories` | admin | Cria uma categoria (com imagem) |
| PUT | `/categories/:id` | admin | Edita uma categoria |
| GET | `/categories` | admin | Lista as categorias |
| POST | `/orders` | login necessário | Cria um pedido |
| GET | `/orders` | login necessário | Lista os pedidos |
| PUT | `/orders/:id` | admin | Atualiza o status do pedido |

### Exemplo: criando um pedido

O cliente manda só o `id` do produto e a quantidade. O nome, o preço e a categoria eu busco no banco, e o usuário vem do token. Assim ninguém consegue mandar um preço inventado.

```json
{
  "products": [
    { "id": 1, "quantity": 2 },
    { "id": 5, "quantity": 1 }
  ]
}
```

## Testando o fluxo completo

Uso o Insomnia pra testar, mas dá pra usar Postman ou qualquer outro cliente. A porta é a 3001, então as rotas ficam em `http://localhost:3001`. Essa é a ordem pra testar do zero:

**1. Criar um usuário admin** (`POST /users`)

```json
{
  "name": "Ana Souza",
  "email": "ana@email.com",
  "password": "123456",
  "admin": true
}
```

**2. Fazer login** (`POST /session`)

```json
{
  "email": "ana@email.com",
  "password": "123456"
}
```

A resposta traz o token. Nas próximas rotas, coloque ele no header `Authorization` como `Bearer SEU_TOKEN`.

**3. Criar uma categoria** (`POST /categories`)

Esse envio é do tipo **Multipart Form**, com os campos `name` (texto) e `file` (a imagem).

**4. Criar um produto** (`POST /products`)

Também Multipart Form, com os campos `name`, `price`, `category_id` (o id da categoria que você criou), `offer` (opcional, `true` ou `false`) e `file` (a imagem).

**5. Fazer um pedido** (`POST /orders`)

Use o corpo do exemplo acima, com o `id` do produto que você criou.

**6. Atualizar o status do pedido** (`PUT /orders/:id`, só admin)

```json
{
  "status": "Em preparo"
}
```

O `:id` é o `_id` do pedido, que vem na resposta da criação.

## O que quero melhorar

Sei que ainda tem coisa pra evoluir, e essa é a lista do que vou melhorar:

- [ ] Cliente ver só os pedidos dele (hoje a listagem traz todos)
- [ ] Liberar a listagem de produtos e categorias pra qualquer usuário logado, porque o cardápio vai precisar disso no front
- [ ] Responder 404 quando o pedido não existir na hora de atualizar o status, e limitar os status permitidos
- [ ] Checar se todos os produtos do pedido existem
- [ ] Impedir que qualquer pessoa se cadastre como admin
- [ ] Regras de transição de status (um pedido entregue não volta pra "em preparo")

## Autor

Feito por **Cauê Pinheiro**, de Blumenau - SC.

- GitHub: [@Cpinheiiro](https://github.com/Cpinheiiro)
- LinkedIn: [Cauê Pinheiro](https://www.linkedin.com/in/cau%C3%AApinheiro/)