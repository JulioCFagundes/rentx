FROM node


WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]

#rodar docker build -t <NomeQueQuerNaImagem> .   (incluir o ponto)
#rodar no cmd "docker ps" para ver as informações imagens
#docker ps -a motra também os containers parados :D
#rodar no cmd "docker run -p 3333:3333 desafio02" para rodar o servidor
#para remover um container utilizamos o comando docker rm <IdDaoContainer>
#para usar o remove, precisamos usar docker stop <IdDoContainer>
#para iniciar um container, docker start <IdDoContainer>
#para parar os serviços que é só usar docker stop
#docker-compose down remove o docker-compose :D (aí tem que buildar tudo de novo e vc perde as informações)
#docker-compose stop para os serviços que estão rodando
#docker exec -it rentx /bin/bash acessa o container pela máquina (?)
#docker logs rentx mostra os últimoslogs
#docker logs rentx -f vai mostrando os logs em tempo real

