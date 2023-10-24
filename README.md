# Atenção ao criar uma nova api (apagar essa seção)

Esse repositório não contem nenhuma configuração de workflows, secrets do github, métricas ou sonar (se basear na configuração atual dos existentes para criar do novo).

Substitua as seguintes váriáveis através da busca avançada:

* Porta da aplicação: 300x
* Porta do banco de dados: 500x
* Porta DEGUB: 700x
* Prefixo das rotas: /template
* Prefixo dos containers: -template

Verifique a questão das rotas protegidas criando um GUARD e uma conexão TCP com a api usuário, se baseando também nas outras APIs. Existe um decorator ```@PublicRoute()``` para definir rotas públicas, mas ele só funciona junto ao modelo de GUARD que está nas outras APIs.

Além disso, para produção, é necessário criar um novo repositório no Docker Hub para armazenar as imagens docker e também expor as portas da nova API na instância EC2 da AWS

# gerocuidado-template-api

## Configuração

Definir valores iguais para os arquivos .env e docker-compose

Arquivo .env.development e .env.test:

    #POSTGRES
    DB_TYPE=
    DB_HOST=
    DB_USERNAME=
    DB_PASS=
    DB_DATABASE=
    DB_PORT=

Arquivo .docker-compose, na seção **_environment_**:

    ...
    environment:
      - POSTGRES_DB=
      - POSTGRES_USER=
      - POSTGRES_PASSWORD=
    ...

Da mesma forma, alterar os valores das portas terminadas em **_x_** (i.e 300x para 300x) para a porta desejada nos arquivos de compose, bem como no arquivo launch.json da pasta .vscode.

## Execução

  Para subir a aplicação, basta rodar o comando:

  ```bash
  docker compose up
  ```

## Testes

  Para testar a aplicação, suba o container de testes:

  ```bash
    TEST=dev docker compose -f docker-compose.test.yml up
  ```

 E rode os comandos para os testes unitários e E2E respectivamente (:cov gera o arquivo de coverage na raiz do projeto):
  ```bash
    npm run test:cov
    npm run test:e2e:cov
  ```

 ## Migrations

  Sempre que houver qualquer alteração em alguma entidade na aplicação (adicionar uma entidade, remover ou edita-la), deve ser gerada uma migration para sincronizar o banco de dados.

  1. Entrar no container da api:

  ```bash
    docker exec -it gerocuidado-template-api bash
  ```

  2. Rodar o comando de criar uma migration (tente dar um nome descritivo, ex.: CreateTableExemplo)

  ```bash
    npm run typeorm:migrate src/migration/NOME_DA_MIGRATION
  ```

# Dicionário variáveis de ambiente

| ENV         | Descrição              | Valor Padrão            |
| ----------- | ---------------------- | ----------------------- |
| DB_TYPE     | tipo do banco          | postgres                |
| DB_HOST     | host do PostgreSQL     | localhost               |
| DB_USERNAME | usuário do PostgreSQL  | postgres                |
| DB_PASS     | senha do PostgreSQL    | postgres                |
| DB_DATABASE | database do PostgreSQL | gerocuidado-template-db |
| DB_PORT     | porta do PostgreSQL    | 500x                    |
