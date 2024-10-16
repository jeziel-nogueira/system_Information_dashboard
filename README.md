
<h1 align="center">Monitor de Desempenho do Servidor</h1>

<p align="center">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js">
  <img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="NPM">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript">
</p>


Este é um aplicativo Node.js que monitora métricas de desempenho do servidor, incluindo uso de CPU, RAM e disco, e fornece um dashboard visual em tempo real. Ele expõe as métricas através de uma API e inclui uma interface front-end construída com HTML, CSS e JavaScript. O projeto também utiliza o modelo de polling (requisições periódicas) para atualização das métricas em intervalos regulares.

![Sem título](https://github.com/user-attachments/assets/42bb7b46-daa1-44ce-856c-b79ce46a0778)

## Funcionalidades
 + ***Dashboard***: Interface web que mostra métricas de desempenho do servidor em tempo real, como uso de CPU, memória e disco.
 + ***API de Métricas***: Exposição de dados de desempenho através de uma API.
 + ***Modelo Polling***: Atualização das métricas periodicamente no dashboard utilizando requisições periódicas (polling).
 + ***Monitoramento de CPU***: Exibe modelo da CPU, velocidade, total de núcleos e porcentagem de uso.
 + ***Monitoramento de Memória***: Mostra informações sobre a RAM total e disponível.
 + ***Monitoramento de Disco***: Exibe o tamanho e o espaço disponível no disco principal.

## Tecnologias Utilizadas
 + ***Node.js***: Runtime para JavaScript no lado do servidor.
 + ***Express***: Framework web para Node.js.
 + ***os-utils***: Módulo para monitoramento de sistema e SO.
 + ***node-disk-info***: Módulo para obtenção de informações sobre discos.
 + ***HTML/CSS/JavaScript***: Para o dashboard no front-end.

## Modelo de Polling
O projeto utiliza o modelo de polling, onde o front-end realiza requisições periódicas ao servidor em intervalos definidos para obter novas informações de desempenho. Isso permite que os dados exibidos no dashboard sejam constantemente atualizados sem que o usuário precise recarregar a página manualmente.

### Vantagens do Polling
 + ***Facilidade de Implementação***: É simples de implementar, pois basta realizar requisições repetidas em intervalos definidos.
 + ***Compatibilidade***: Funciona em qualquer navegador sem a necessidade de tecnologias mais avançadas como WebSockets.
 + ***Controle de Atualizações***: O servidor pode ser solicitado a qualquer momento, permitindo um controle granular sobre quando as informações são atualizadas.

### Desvantagens do Polling
 + ***Sobrecarga de Requisições***: O polling gera uma carga adicional no servidor devido ao número frequente de requisições, mesmo quando não há mudanças significativas nos dados.
 + ***Latência***: A atualização dos dados só acontece após a próxima requisição, o que pode resultar em um atraso perceptível.
 + ***Uso Ineficiente de Recursos***: Se os dados não mudam com frequência, o polling pode desperdiçar recursos realizando requisições desnecessárias.

## Como Executar a Aplicação
### Pré-requisitos
Antes de executar a aplicação, certifique-se de ter os seguintes programas instalados:
 + Node.js (v14 ou superior)
 + npm (Node package manager)
   
Verifique a instalação executando os comandos:
>    ```bash
>    node -v

>    ```bash
>    npm -v
Caso não tenha o Node.js instalado, siga as instruções [aqui](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) para instalar o Node.js e o npm.

### Instalação
 1. Clone o repositório:
>    ```bash
>    https://github.com/jeziel-nogueira/system_Information_dashboard.git
 2. Navegue até a pasta do projeto:
>    ```bash
>    cd system_Information_dashboard
 3. Instale as dependências necessárias:
>    ```bash
>    npm install
### Executando a Aplicação
  1. Inicie o servidor:
  Para iniciar o servidor e acessar o dashboard, execute:
>    ```bash
>    npm start
  A aplicação vai escutar na porta 3001 por padrão.
  
  2. Acesse o dashboard:
  Abra seu navegador e acesse:
>    ```bash
>    http://localhost:3001
  Você verá um dashboard que exibe métricas de desempenho como CPU, memória e uso do disco em tempo real.
  
  3. Acesse a API de métricas:
  Para acessar as métricas diretamente via API, visite:
>    ```bash
>    http://localhost:3001/metrics
  O retorno será um JSON com informações como:
  + ```cpu_cores```: Total de núcleos da CPU.
  + ```cpu_model```: Modelo da CPU.
  + ```cpu_speed```: Velocidade máxima da CPU.
  + ```cpu_usage```: Percentual de uso da CPU.
  + ```total_memory```: Memória RAM total em GB.
  + ```free_memory```: Memória RAM livre em GB.
  + ```main_disk_size```: Tamanho do disco principal em GB.
  
### Exemplo de Saída
```
{
    "cpu_cores": 8,
    "cpu_model": "Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz",
    "cpu_speed": 2600,
    "cpu_usage": "18.45",
    "total_memory": 16,
    "free_memory": 8,
    "main_disk_size": "500.23"
}
```

## Estrutura de Arquivos
```
.
├── public
│   ├── css                 # Arquivos de estilo do dashboard
│   ├── js                  # JavaScript do front-end para atualizações dinâmicas
│   ├── index.html          # Página principal do dashboard
│   └── services.js         # Serviços de monitoramento (CPU, memória, disco)
├── dashboard_server.js     # Arquivo principal do servidor (aplicação Express)
├── package.json            # Dependências e scripts do projeto
└── README.md               # Documentação do projeto
```

## Melhorias Futuras
 + ***Métricas Adicionais***: Adicionar monitoramento de rede (uso de largura de banda, latência).
 + ***Dados Históricos***: Armazenar dados de desempenho ao longo do tempo para análise.
 + ***Alertas***: Configurar notificações caso as métricas excedam certos limites.
 + ***UI Melhorada***: Adicionar gráficos ou melhorias visuais ao dashboard.

## Licença
Este projeto é licenciado sob a Licença MIT - veja o arquivo [LICENSE](https://opensource.org/licenses/MIT) para mais detalhes.
