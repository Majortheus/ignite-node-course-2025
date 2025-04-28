# Find a Friend

Uma aplicação para adoção de animais

## Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

## Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### DDD

## Entidades

- **Pet**
  - Nome
  - Sobre
  - Idade
  - Porte
  - Nivel de Energia
  - Nivel de independência
  - Ambiente
  - Fotos
  - Requisitos para adoção
  - Organização
- **Organização**
  - Nome
  - Nome do responsável
  - Email
  - CEP
  - Endereço
  - Numero
  - Complemento
  - Bairro
  - Cidade
  - Estado
  - WhatsApp
  - Senha
- **Fotos**
  - Pet
  - URL
- **Requisitos para adoção**
  - Pet
  - Requisito
