 
# Projeto Inicial 3T Projeto da primeira semana 3º de Desenvolvimento de Sistemas 

<div align=center> 
Sistema de gerenciamento de patrimônio de uma escola
</div> 

<br>

<div align=center> 
![Aplicação de um sistema de gerenciamento de patrimonio]([https://imgur.com/6AHjsi7](https://imgur.com/6AHjsi7 "https://imgur.com/6AHjsi7"))  
</div> 

## Funções  
**Criar um cadastro da empresa com os seguintes campos:** 
- Andar; 
- Nome; 
- Metragem da sala 

 *Todos os campos são de preenchimento obrigatório.* 

## Cadastro de Equipamento  
Criar um cadastro de equipamentos com os seguintes campos: 
- Marca; 
-  Tip equipamento(mobiliário, informática, eletroeletrônico, ...); 
- Numero de Serie;
-  Descricao; 
- Número do patrimônio; 
-  Ativo/Inativo 
- 
 *Todos os campos são de preenchimento obrigatório.*  

## Funcionalidades  
- Sala: CRUD; 
- Equipamento: CRUD;
 - Controle de entrada e saída de equipamento *(interno, externo).*
 

## Como iniciar a aplicação
**1º De git clone :** *( ou baixe direto em sua maquina )*

    https://github.com/Okuma-wq/Projeto_Inicial-3T.git 


**2º de um git checkout react_equipamentos** 
 
<div align=center> 
![Orientação do git checkout](https://imgur.com/pKX2dhX)
</div> 

**3º Abra o seu SQL Server Management Studio  e copie o seu nome do servidor, Vá  na pasta BD execute os scripts.**
<div align=center> 
![copie seu nome de servidor](https://imgur.com/pKX2dhX)
</div> 

**4º Vá na Pasta  
BACK-END\API\senai.Projeto_Inicial.webApi\senai.Projeto_Inicial.webApi
e abra a pasta context, depois abra o arquivo: ProjetoInicialContext.cs**

**5ºCom o seu nome do servidor copiado,  substituído que nem no exemplo:**
<div align=center> 
![nome do seu servidor](https://imgur.com/mNikwn6)
</div> 

**6ºNa própria pasta da API Projeto_Inicial-3T\BACK-END\API\senai.Projeto_Inicial.webApi\senai.Projeto_Inicial.webApi abra o cmd e execute o seguinte comando:**

    dotnet run

 
#
**7º Abra no vs code a pasta src do react e execute no terminal os comandos:**

    npm install
e depois execute a aplicação com um no termial

    npm start

e então no navegador na porta http://localhost:3000/ sua aplicação estará em execução


