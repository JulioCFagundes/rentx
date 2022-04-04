** RF ** => Requisitos Funcionais

** RNF ** => Requisitos Não Funcionais

** RN ** => Regra de Negócio


# Cadastro de Carro

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.


**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, disponível para alugar.
* O usuário responsável pelo cadastro deve ser admin. (resposabilidade do authenticate)

# Listagem de Carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de especificações do carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RN** 
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um admin.


# Cadastro de Imagens do Carro

**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carros

**RNF**
Utilizar o multer para o updload do arquivo

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um admin.


# Aluguel de Carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O usuário deverá estar logado na aplicação.
Ao realizar um aluguel, o status do carro deverá ser atualizado para indisponível.


# Devolução de Carro

**RF**

Deve ser possível realizar a devolução de um carro

**RN**

Se o carro for devolvido com menos de 24h, deverá ser cobrado o valor da diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horario provisto, deverá ser cobrada uma multa proporcional ao tempo de atraso.
caso haja multa, deverá ser somado ao total de aluguel.
o usuário deve estar logado na aplicação.