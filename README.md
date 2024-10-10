# Quadro Societário

Desenvolvi um frontend para auxiliar no teste da aplicação

## Estrutura do Projeto

- **Raiz do projeto/**: Contém o código do backend desenvolvido com Symfony.
- **frontend/**: Contém o código do frontend desenvolvido com Angular.

## Instalação

Login para fins de teste:

login: admin@example.com

senha: password

- Inicie a aplicação rodando os comandos a seguir na raíz do projeto:

(Acesse o arquivo .env e adeque as variáveis de acesso ao banco de dados)
php bin/console doctrine:database:create

php bin/console doctrine:migrations:migrate

php bin/console doctrine:fixtures:load (Para inserir dados de teste no banco de dados, ou se preferir pode adicionar manualmente acessando os endpoints)

php -S localhost:8000 -t public

- Acesse o diretório frontend:

Execute o comando ng serve para inicializar o angular.

# Importante 
Estou utilizando o token JWT para realizar a autenticação do usuário no sistema, pode ser que seja necessário você adequar os valores referentes ao seu openSSL e sua pass_phrase no seu arquivo lexik_jwt_authentication
