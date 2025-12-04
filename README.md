## Navy.

Este é o projeto **Navy.**, uma aplicação minimalista para registrar e organizar pensamentos, cartas, poesias e anotações. Originalmente construído com Vanilla JavaScript e JSON Server, ele foi migrado para uma arquitetura moderna utilizando **React (Vite)** no Frontend e **Node.js/Express com SQLite** no Backend.

-----

## Tecnologias Utilizadas

| Camada | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Frontend** | **React** | Biblioteca JavaScript para construção da interface do usuário. |
| | **Vite** | Ferramenta de *bundling* rápido para desenvolvimento. |
| | **React Router DOM** | Gerenciamento de navegação e rotas (Home, Categoria, Post). |
| | **`react-feather`** | Componentes de ícones para a interface. |
| **Backend** | **Node.js / Express** | Framework web para criação da API REST. |
| | **SQLite** | Banco de dados leve e sem servidor para persistência dos posts. |
| | **`sqlite3`** | Driver Node.js para interagir com o banco SQLite. |
| **Estilo** | **CSS Puro** | Estilização minimalista e temática (cartas, post-its, etc.). |

-----

## Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1\. Pré-requisitos

  * Node.js (versão 18+ ou superior)
  * npm (gerenciador de pacotes do Node.js)

### 2\. Estrutura de Pastas

```
navy-app/
├── navy-backend/  <-- Servidor API (Node.js/Express)
│   ├── navy.db
│   ├── node_modules/
│   ├── package.json
│   └── server.js
└── navy-frontend/ <-- Interface do Usuário (React/Vite)
    ├── node_modules/
    ├── src/
    ├── package.json
    └── ...
```

### 3\. Configuração do Backend (`navy-backend`)

Navegue até a pasta `navy-backend`, instale as dependências e inicie o servidor.

```bash
cd navy-app/navy-backend

# Instala dependências (Express, sqlite3, cors)
npm install

# Inicia o servidor Node.js na porta 3000
npm start 
# Output esperado: Servidor rodando em http://localhost:3000
```

O servidor irá criar o arquivo `navy.db` e a tabela `posts` automaticamente na primeira execução.

### 4\. Configuração do Frontend (`navy-frontend`)

Abra um novo terminal, navegue até a pasta `navy-frontend`, instale as dependências e inicie a aplicação React.

```bash
cd navy-app/navy-frontend

# Instala dependências (React Router DOM, react-feather, etc.)
npm install

# Inicia o frontend em modo de desenvolvimento (porta 5173 por padrão)
npm run dev
# Output esperado: Local: http://localhost:5173/
```

Abra o endereço **`http://localhost:5173/`** no seu navegador para acessar a aplicação.

-----

## Visão Geral da API (Backend)

O servidor Express expõe endpoints básicos para gerenciar os posts, utilizando o SQLite como armazenamento.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/posts` | Retorna todos os posts, ordenados por data de criação decrescente. |
| **POST** | `/posts` | Cria um novo post. Requer `titulo`, `conteudo`, `categoria` e `dataCriacao` (opcionalmente gerado no backend). |
| **DELETE** | `/posts/:id` | Deleta um post específico pelo `id`. |

**Observação:** A URL base da API (`http://localhost:3000/posts`) está definida na constante `API_URL` do Frontend.

-----

## Estrutura do Frontend

O frontend é dividido em componentes e páginas, centralizando a lógica de estado no `App.jsx`.

| Arquivo/Pasta | Função |
| :--- | :--- |
| `src/App.jsx` | Componente raiz. Gerencia o estado dos posts, a comunicação com a API (fetch, save, delete) e contém a lógica de roteamento (`<Routes>`). |
| `src/components/Header.jsx` | Componente de cabeçalho com logo e botões de navegação. |
| `src/pages/Home.jsx` | Exibe o grid de categorias. |
| `src/pages/Category.jsx` | Exibe a lista de posts filtrados por categoria (incluindo o layout especial para Post-its). |
| `src/pages/Post.jsx` | Exibe um único post com o tema de estilo correspondente à categoria. |
| `src/pages/Create.jsx` | Formulário para criação de novos posts com editor de rich text. |
| `src/utils/constants.js` | Armazena a `API_URL` e a definição das `CATEGORIES`. |
| `src/index.css` | Contém todo o CSS do projeto, incluindo as fontes e temas customizados. |