<div align="center">

# 🎬 Netflix Clone

**Interface inspirada na Netflix com filmes e séries em tempo real**

[![Deploy](https://img.shields.io/badge/🔗_Deploy-GitHub_Pages-blue?style=flat-square)](https://RodrigoRuan2.github.io/netflix-dashboard/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?style=flat-square)](https://www.themoviedb.org/)

</div>

---

## 🖼️ Preview

<table>
  <tr>
    <td align="center"><b>🏠 Tela Principal</b></td>
    <td align="center"><b>🔍 Explorar</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/RodrigoRuan2/netflix-dashboard/raw/main/tela_principal.png" alt="Tela principal do Netflix Clone" width="100%"/></td>
    <td><img src="https://github.com/RodrigoRuan2/netflix-dashboard/raw/main/explorar.png" alt="Página de explorar filmes e séries" width="100%"/></td>
  </tr>
</table>

---

## 📋 Sobre o projeto

O **Netflix Clone** é uma aplicação web que replica a interface da Netflix consumindo a [API do TMDB](https://www.themoviedb.org/documentation/api) para exibir filmes e séries reais organizados por categoria. O projeto inclui autenticação de usuários via Firebase e navegação entre páginas com React Router.

Desenvolvido como projeto de portfólio para praticar integração com APIs externas, gerenciamento de estado com React Hooks, autenticação e deploy de SPAs.

---

## ✨ Funcionalidades

- 🎥 **Listagem por categoria** — filmes e séries separados por gênero e popularidade
- 🔄 **Dados em tempo real** — conteúdo atualizado direto da API do TMDB
- 🔐 **Autenticação** — login e cadastro de usuários via Firebase Auth
- 📱 **Interface responsiva** — layout adaptado para desktop e mobile
- 🗺️ **Navegação por rotas** — múltiplas páginas com React Router DOM

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| [React](https://react.dev/) + [Vite](https://vitejs.dev/) | Base da aplicação |
| [React Router DOM](https://reactrouter.com/) | Navegação entre páginas |
| [TMDB API](https://www.themoviedb.org/documentation/api) | Dados de filmes e séries |
| [Firebase Auth](https://firebase.google.com/docs/auth) | Autenticação de usuários |
| CSS3 | Estilização |
| [GitHub Pages](https://pages.github.com/) | Deploy estático |

---

## 📁 Estrutura do projeto

```
netflix-dashboard/
├── src/
│   ├── components/     # Componentes reutilizáveis (Navbar, MovieCard, Banner...)
│   ├── pages/          # Páginas da aplicação (Home, Login, MovieDetail...)
│   ├── services/       # Chamadas à API do TMDB
│   ├── styles/         # Arquivos CSS separados por componente
│   └── App.jsx
├── .env                # Variáveis de ambiente (não sobe pro GitHub)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Conta no [TMDB](https://www.themoviedb.org/) para gerar uma API Key
- Projeto configurado no [Firebase](https://firebase.google.com/) com Authentication ativo

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/RodrigoRuan2/netflix-dashboard.git
cd netflix-dashboard

# Instale as dependências
npm install

# Crie o arquivo .env na raiz com suas credenciais:
```

```env
VITE_API_KEY=sua_chave_tmdb_aqui
VITE_FIREBASE_API_KEY=sua_chave_firebase
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_APP_ID=seu_app_id
```

```bash
# Rode o projeto
npm run dev
```

### Deploy para GitHub Pages

```bash
npm run build
npm run deploy
```

---

## 🔑 Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_API_KEY` | Chave da API do TMDB |
| `VITE_FIREBASE_API_KEY` | Chave do projeto Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Domínio de autenticação do Firebase |
| `VITE_FIREBASE_PROJECT_ID` | ID do projeto Firebase |
| `VITE_FIREBASE_APP_ID` | ID do app Firebase |

> ⚠️ Nunca suba o arquivo `.env` para o repositório. Ele já está no `.gitignore`.

---

## 👨‍💻 Autor

Desenvolvido por **Rodrigo Ruan** — estudante de Análise e Desenvolvimento de Sistemas, desenvolvedor front-end em formação.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-rodrigo--ruan-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/rodrigo-ruan-141499258/)
[![GitHub](https://img.shields.io/badge/GitHub-RodrigoRuan2-181717?style=flat-square&logo=github)](https://github.com/RodrigoRuan2)
[![Portfólio](https://img.shields.io/badge/Portfólio-rodrigoruan2.github.io-FF6B6B?style=flat-square)](https://rodrigoruan2.github.io/Portifolio/)

---

<div align="center">
  <sub>Projeto desenvolvido para fins de aprendizado e portfólio 🚀</sub>
</div>
