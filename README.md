```markdown
# Projeto React e Node.js com Docker e PostgreSQL

## Bem-vindo ao Projeto *Teste de programação*!

Este repositório contém um aplicativo web construído com React no frontend, Node.js no backend e utiliza Docker para gerenciar o ambiente de um banco de dados PostgreSQL.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina antes de começar:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (normalmente vem com o Node.js)

## Configuração do Ambiente

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/CristianoRibeiro/reactjs-nodejs-docker-postgresql.git
   cd reactjs-nodejs-docker-postgresql
   ```

2. **Instale as Dependências do Frontend:**
   ```bash
   cd react-client
   npm install
   ```

3. **Volte para o Diretório Raiz e Instale as Dependências do Backend:**
   ```bash
   cd ..
   cd nodejs-postgresql-crud
   npm install
   ```

4. **Inicie os Contêineres Docker:**
   ```bash
   docker-compose up -d
   ```

   Isso iniciará o ambiente Docker com o PostgreSQL.

## Executando o Projeto

1. **Inicie o Frontend:**
   ```bash
   cd react-client
   npm start
   ```

   O aplicativo React estará disponível em [http://localhost:3000](http://localhost:3000).

2. **Inicie o Backend:**
   ```bash
   cd ../nodejs-postgresql-crud
   npm start
   ```

   O servidor Node.js estará disponível em [http://localhost:3001](http://localhost:3001).

Agora você pode acessar e interagir com o aplicativo completo!

## Encerrando o Ambiente

Para encerrar o ambiente Docker, execute o seguinte comando no diretório backend raiz do projeto:

```bash
docker-compose down
```

Isso desligar os contêiner do Docker.

```