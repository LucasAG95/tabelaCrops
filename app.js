// 1 hora = 3 600 000 - 1 minuto = 60 000 - 1 segundo = 1000
function msParaTempo(ms, mostrarNoHtml) { //ms é de milissegundos
    const horas = Math.floor(ms / 3_600_000); // esse sinal _ serve para separar apenas casa decimais, é visual!
    const minutos = Math.floor((ms % 3_600_000) / 60_000); // % serve para dividir e pegar o resto da divisão!
    const segundos = Math.floor((ms % 60_000) / 1_000); // Math.floor arredonda o numero pra baixo
    const milissegundos = ms % 1_000;

    //para adicionar 0 a frente da hora!
    const hh = horas < 10 ? '0' + horas : horas;
    const mm = minutos < 10 ? '0' + minutos : minutos;
    const ss = segundos < 10 ? '0' + segundos : segundos;

    //vai mostrar o resultado dentro das outras funções que puxar ela
    mostrarNoHtml.innerHTML += (`Tempo: ${hh}:${mm}:${ss}\n`);
};

//Status da farm
let plots = parseInt(69);

//Lista de Crops Existentes no game - seus status principais- o tempo de crescimento esta em milissegundos
const listaDeCrops = [
    {name: 'Sunflower',   tempoDeCrescimento: 60_000,      custoDaSemente: 0.01, vendaDaCrop: 0.02, estoqueDeSementes: 800, quantidade: 1, tipoDeCrop: 'Basic'},
    {name: 'Potato',      tempoDeCrescimento: 300_000,     custoDaSemente: 0.1,  vendaDaCrop: 0.14, estoqueDeSementes: 400, quantidade: 1, tipoDeCrop: 'Basic'},
    {name: 'Rhubarb',     tempoDeCrescimento: 600_000,     custoDaSemente: 0.15, vendaDaCrop: 0.24, estoqueDeSementes: 400, quantidade: 1, tipoDeCrop: 'Basic'},
    {name: 'Pumpkin',     tempoDeCrescimento: 1_800_000,   custoDaSemente: 0.2,  vendaDaCrop: 0.4,  estoqueDeSementes: 300, quantidade: 1, tipoDeCrop: 'Basic'},
    {name: 'Zucchini',    tempoDeCrescimento: 1_800_000,   custoDaSemente: 0.2,  vendaDaCrop: 0.4,  estoqueDeSementes: 400, quantidade: 1, tipoDeCrop: 'Basic'},
    {name: 'Carrot',      tempoDeCrescimento: 3_600_000,   custoDaSemente: 0.5,  vendaDaCrop: 0.8,  estoqueDeSementes: 200, quantidade: 1, tipoDeCrop: 'Medium'},
    {name: 'Yam',         tempoDeCrescimento: 3_600_000,   custoDaSemente: 0.5,  vendaDaCrop: 0.8,  estoqueDeSementes: 180, quantidade: 1, tipoDeCrop: 'Medium'},
    {name: 'Cabbage',     tempoDeCrescimento: 7_200_000,   custoDaSemente: 1,    vendaDaCrop: 1.5,  estoqueDeSementes: 180, quantidade: 1, tipoDeCrop: 'Medium'},
    {name: 'Broccoli',    tempoDeCrescimento: 7_200_000,   custoDaSemente: 1,    vendaDaCrop: 1.5,  estoqueDeSementes: 180, quantidade: 1, tipoDeCrop: 'Medium'},
    {name: 'Soybean',     tempoDeCrescimento: 10_800_000,  custoDaSemente: 1.5,  vendaDaCrop: 2.3,  estoqueDeSementes: 180, quantidade: 1, tipoDeCrop: 'Medium'},
    {name: 'Pepper',      tempoDeCrescimento: 14_400_000,  custoDaSemente: 2,    vendaDaCrop: 3,    estoqueDeSementes: 160, quantidade: 1, tipoDeCrop: 'Medium'},
    {name: 'Beetroot',    tempoDeCrescimento: 14_400_000,  custoDaSemente: 2,    vendaDaCrop: 2.8,  estoqueDeSementes: 160, quantidade: 1, tipoDeCrop: 'Medium'},
    {name: 'Cauliflower', tempoDeCrescimento: 28_800_000,  custoDaSemente: 3,    vendaDaCrop: 4.25, estoqueDeSementes: 160, quantidade: 1, tipoDeCrop: 'Medium'},
    {name: 'Parsnip',     tempoDeCrescimento: 43_200_000,  custoDaSemente: 5,    vendaDaCrop: 6.5,  estoqueDeSementes: 120, quantidade: 1, tipoDeCrop: 'Medium'},
    {name: 'Eggplant',    tempoDeCrescimento: 57_600_000,  custoDaSemente: 6,    vendaDaCrop: 8,    estoqueDeSementes: 100, quantidade: 1, tipoDeCrop: 'Advanced'},
    {name: 'Corn',        tempoDeCrescimento: 72_000_000,  custoDaSemente: 7,    vendaDaCrop: 9,    estoqueDeSementes: 100, quantidade: 1, tipoDeCrop: 'Advanced'},
    {name: 'Onion',       tempoDeCrescimento: 72_000_000,  custoDaSemente: 7,    vendaDaCrop: 10,   estoqueDeSementes: 100, quantidade: 1, tipoDeCrop: 'Advanced'},
    {name: 'Turnip',      tempoDeCrescimento: 86_400_000,  custoDaSemente: 5,    vendaDaCrop: 8,    estoqueDeSementes: 80,  quantidade: 1, tipoDeCrop: 'Advanced'},
    {name: 'Radish',      tempoDeCrescimento: 86_400_000,  custoDaSemente: 7,    vendaDaCrop: 9.5,  estoqueDeSementes: 80,  quantidade: 1, tipoDeCrop: 'Advanced'},
    {name: 'Wheat',       tempoDeCrescimento: 86_400_000,  custoDaSemente: 5,    vendaDaCrop: 7,    estoqueDeSementes: 80,  quantidade: 1, tipoDeCrop: 'Advanced'},
    {name: 'Kale',        tempoDeCrescimento: 129_600_000, custoDaSemente: 7,    vendaDaCrop: 10,   estoqueDeSementes: 60,  quantidade: 1, tipoDeCrop: 'Advanced'},
    {name: 'Artichoke',   tempoDeCrescimento: 129_600_000, custoDaSemente: 7,    vendaDaCrop: 12,   estoqueDeSementes: 60,  quantidade: 1, tipoDeCrop: 'Advanced'},
    {name: 'Barley',      tempoDeCrescimento: 172_800_000, custoDaSemente: 10,   vendaDaCrop: 12,   estoqueDeSementes: 60,  quantidade: 1, tipoDeCrop: 'Advanced'}
];

//Skills Crops
let skillsDeCrops = [
    {id: 'greenThumb',        name: 'Green Thumb',         possui: false, buff: 1.05,              pontosDeHabilidadesNecessarios: 'Legacy', tipoDeBoost: 'lojaCoins',         descricao: '+5% de coins ao vender colheitas (Loja de Sementes)'},
    {id: 'seedSpecialist',    name: 'Seed Specialist',     possui: false, buff: 0.9,               pontosDeHabilidadesNecessarios: 'Legacy', tipoDeBoost: 'tempo',             descricao: '-10% no tempo das Crops'},
    {id: 'coder',             name: 'Coder',               possui: false, buff: 1.2,               pontosDeHabilidadesNecessarios: 'Legacy', tipoDeBoost: 'porcentagem',       descricao: '+20% na colheita de Crops'},
    {id: 'greenThumb2',       name: 'Green Thumb',         possui: false, buff: 0.95,              pontosDeHabilidadesNecessarios: 1,        tipoDeBoost: 'tempo',             descricao: '-5% no tempo das Crops'},
    {id: 'youngFarmer',       name: 'Young Farmer',        possui: false, buff: 0.1,               pontosDeHabilidadesNecessarios: 1,        tipoDeBoost: 'adição',            descricao: '+0.1 Basic Crop Yield'},
    {id: 'experiencedFarmer', name: 'Experienced Farmer',  possui: false, buff: 0.1,               pontosDeHabilidadesNecessarios: 1,        tipoDeBoost: 'adição',            descricao: '+0.1 Medium Crop Yield'},
    {id: 'bettysFriend',      name: 'Betty\'s Friend',     possui: false, buff: 1.3,               pontosDeHabilidadesNecessarios: 1,        tipoDeBoost: 'delivery',          descricao: 'Delivery da \'Betty\' Coin aumentou 30%'},
    {id: 'oldFarmer',         name: 'Old Farmer',          possui: false, buff: 0.1,               pontosDeHabilidadesNecessarios: 1,        tipoDeBoost: 'adição',            descricao: '+0.1 Advanced Crop Yield'},
    {id: 'chonkyScarecrow',   name: 'Chonky Scarecrow',    possui: false, buff: 7*7,               pontosDeHabilidadesNecessarios: 1,        tipoDeBoost: 'area/adição',       descricao: 'Basic Scarecrow AOE aumenta o tamanho para 7x7'},
    {id: 'strongRoots',       name: 'Strong Roots',        possui: false, buff: 0.9,               pontosDeHabilidadesNecessarios: 2,        tipoDeBoost: 'tempo',             descricao: '10% de redução no tempo das Advanced Crops'},
    {id: 'coinSwindler',      name: 'Coin Swindler',       possui: false, buff: 1.1,               pontosDeHabilidadesNecessarios: 2,        tipoDeBoost: 'lojaCoins',         descricao: '+10% de coins ao vender colheitas (Loja de Sementes)'},
    {id: 'goldenSunflower',   name: 'Golden Sunflower',    possui: false, buff: 1/700,             pontosDeHabilidadesNecessarios: 2,        tipoDeBoost: 'RNG',               descricao: '1/700 de obter +0,35 gold ao colher sunflowers manualmente'},
    {id: 'horrorMike',        name: 'Horror Mike',         possui: false, buff: 7*7,               pontosDeHabilidadesNecessarios: 2,        tipoDeBoost: 'area/adição',       descricao: 'Scary Mike AOE aumenta o tamanho para 7x7 (Crops Médias)'},
    {id: 'lauriesGains',      name: 'Laurie\'s Gains',     possui: false, buff: 7*7,               pontosDeHabilidadesNecessarios: 2,        tipoDeBoost: 'area/adição',       descricao: 'Laurie Crow AOE aumenta o tamanho para 7x7 (Crops Avançadas)'},
    {id: 'acreFarm',          name: 'Acre Farm',           possui: false, buff: 1,    deBuff: 0.5, pontosDeHabilidadesNecessarios: 3,        tipoDeBoost: 'adição/substração', descricao: '+1 Advanced crop yeild, -0.5 Basic and Medium crop yield'},
    {id: 'hectareFarm',       name: 'Hectare Farm',        possui: false, buff: 1,    deBuff: 0.5, pontosDeHabilidadesNecessarios: 3,        tipoDeBoost: 'adição/substração', descricao: '+1 Basic and Medium crop yield, -0.5 Advanced crop yield'},
    {id: 'instantGrowth',     name: 'Instant Growth',      possui: false, buff: '',                pontosDeHabilidadesNecessarios: 3,        tipoDeBoost: 'reset',             descricao: 'Capacidade de deixar todas Crops prontas para serem colhidas (1/72h)'}
];

//PARTE PARA PROGRAMAR DE MARCA AS CHECKBOX SE POSSUO OU NÃO AS SKILLS - essa parte vou ter q prender bem ainda!
skillsDeCrops.forEach(skill => { //forEach é um método do JavaScript que serve para percorrer cada item de um array e executar uma função para cada um deles. É como um "loop" mais simples.
    
    let checkbox = document.getElementById(skill.id); // => é um abreviamento de function, entao usar '() =>' é a msm coisa de 'function()', foi oque entendi
    
    if (checkbox) { //Essa linha está checando se a variável checkbox existe, ou seja, se o elemento com aquele id foi encontrado no HTML.
        skill.possui = checkbox.checked; // Atualiza inicialmente (opcional)

        checkbox.addEventListener('change', function() { //addEventListener faz: Ele escuta um evento e executa uma função quando o evento acontece. neste caso, ao clicar na checkbox ele roda novamente trazendo resultado
            skill.possui = checkbox.checked; //toda vez que clicar na checkbox trara resultados diferentes como verdadeiro ou falso, pra funcionar assim, tem que estar dentro da função com addEventListener
            atualizarStatusDasCrops();// ao marca ou desamarcar as checkbox, chamara a função! Não precisaria dela, oque esta dentro da função, podia estar aq pra chamar!
        });
    }
});

const mostrarNoHtml = document.getElementById('saida');
//Função que retornara os status das crops
function statusCrops(numeroDaCrop = 0) { //o parametro não precisa ser puxado exatamente de fora, ele pode ser um parametro que quiser dentro dele sem puxar infos de fora

    if (numeroDaCrop >= listaDeCrops.length) return;//Essa sintaxe funciona assim por causa de uma regra do JavaScript: Se uma estrutura de controle (if, else, for, etc.) tiver apenas uma instrução logo após ela, as chaves são opcionais.

    let crop = listaDeCrops[numeroDaCrop];
    
    let colheita = crop.quantidade //quantidade base
        * parseFloat(skillsDeCrops[2].possui  == true ? skillsDeCrops[2].buff : 1) //Coder
        + parseFloat(skillsDeCrops[4].possui  == true && crop.tipoDeCrop == 'Basic' ? skillsDeCrops[4].buff : 0) //Young Farmer
        + parseFloat(skillsDeCrops[5].possui  == true && crop.tipoDeCrop == 'Medium' ? skillsDeCrops[5].buff : 0) //Experienced Farmer
        + parseFloat(skillsDeCrops[7].possui  == true && crop.tipoDeCrop == 'Advanced' ? skillsDeCrops[7].buff : 0) //Old Farmer
        + parseFloat(skillsDeCrops[14].possui == true && crop.tipoDeCrop == 'Advanced' ? skillsDeCrops[14].buff : 0) //Acre Farm
        - parseFloat(skillsDeCrops[14].possui == true && crop.tipoDeCrop == 'Basic' ? skillsDeCrops[14].deBuff : 0) //Acre Farm debuff basic
        - parseFloat(skillsDeCrops[14].possui == true && crop.tipoDeCrop == 'Medium' ? skillsDeCrops[14].deBuff : 0) //Acre Farm debuff medium
        + parseFloat(skillsDeCrops[15].possui == true && crop.tipoDeCrop == 'Basic' ? skillsDeCrops[15].buff : 0)  //Hectare Farm basic
        + parseFloat(skillsDeCrops[15].possui == true && crop.tipoDeCrop == 'Medium' ? skillsDeCrops[15].buff : 0) //Hectare Farm medium
        - parseFloat(skillsDeCrops[15].possui == true && crop.tipoDeCrop == 'Advanced' ? skillsDeCrops[15].deBuff : 0); //Hectare Farm debuff

       

    let lucro = colheita * crop.vendaDaCrop - crop.custoDaSemente;
    let tempo = crop.tempoDeCrescimento;
    let colheitaTotal = colheita * plots;

    mostrarNoHtml.innerHTML += (`Crop: ${crop.name}\n`); //+= como só tem uma 'variavel' saida no html, o sinal += salva as informações, senao ele sempre cobre com a ultima informação;
    msParaTempo(tempo, mostrarNoHtml);
    mostrarNoHtml.innerHTML += (`Estoque: ${crop.estoqueDeSementes}\n`);
    mostrarNoHtml.innerHTML += (`Colheita por Plot: ${colheita.toFixed(2)}\n`);
    mostrarNoHtml.innerHTML += (`Colheita Total: ${colheitaTotal.toFixed(2)}\n`);
    mostrarNoHtml.innerHTML += (`Lucro: ${lucro.toFixed(3)} coins\n`);
    mostrarNoHtml.innerHTML += ('\n');

    statusCrops(numeroDaCrop + 1); //Ela está chamando a própria função statusCrops de novo, mas agora com o próximo índice (cont + 1).
}
statusCrops();

function atualizarStatusDasCrops() { //limpara as crops ao ser chamada e reiniciara para que seja feita as contas ativando/desativando as skills
    mostrarNoHtml.innerHTML = '';
    statusCrops();
}