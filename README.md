# [GAMA ACADEMY] Sistema de Locação de Veículos de Passeio
Desafio Gama Academy - Back-end .NET

- Grupo Back-end: [Érica Viana](https://github.com/vianaerica "Érica Viana") e [Patrik Oliveira](https://github.com/patrikoliveira "Patrik Oliveira")

- Grupo Front-end: [Erick Santos](https://github.com/erickhs321 "Erick Santos") e [Icaro Lettieri](https://github.com/icarolettieri "Icaro Lettieri")

- Live: [Vercel](https://desafio-localiza-react-zeta.vercel.app/ "Vercel")

- Github Back-end: [Back-end](https://github.com/vianaerica/locacao-veiculos "Back-end")

------------


### Tecnologias e Frameworks
- ReactJS
- NextJS

------------


#### Futuras Melhorias
- Segmento do desginer do [Figma](https://github.com/IcaroLettieri/desafio-localiza-react/blob/main/Figma-Localiza.pdf "Figma")
- Aplicação de Single Responsibility Principle na index.


------------

## Estrura do Projeto
Seguimos a ideia de single page, com as principais interações do usuário na index ('/'):
  - Listagem de veiculos disponiveis
  - Agendamento
  - Login
  - Cadastro
Pagina agendamentos ('/agendamento'):
  - Lista de agendamentos realizada pelo cliente com autenticação


#### Autenticação
- Token *(utilizando Jwt Bearer)*


#### Serviços
- getVeiculos *(retorna os veiculos disponiveis)*
- postAgendamento *(realiza o post de criação de agendamento)*
- isAuthentication *(valida se o usuário está logado)*
- postLogin *(realiza o post de login com retorno do token)*
- postRegister *(realiza post de criação de usuário)*

------------


