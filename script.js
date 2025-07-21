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
let plots = parseInt(70);

//Lista de Crops Existentes no game - seus status principais- o tempo de crescimento esta em milissegundos
const listaDeCrops = [
    {name: 'Sunflower',   tempoDeCrescimento: 60_000,      custoDaSemente: 0.01, vendaDaCrop: 0.02, estoqueDeSementes: 800, quantidade: 1, tier: 'basic'},
    {name: 'Potato',      tempoDeCrescimento: 300_000,     custoDaSemente: 0.1,  vendaDaCrop: 0.14, estoqueDeSementes: 400, quantidade: 1, tier: 'basic'},
    {name: 'Rhubarb',     tempoDeCrescimento: 600_000,     custoDaSemente: 0.15, vendaDaCrop: 0.24, estoqueDeSementes: 400, quantidade: 1, tier: 'basic'},
    {name: 'Pumpkin',     tempoDeCrescimento: 1_800_000,   custoDaSemente: 0.2,  vendaDaCrop: 0.4,  estoqueDeSementes: 300, quantidade: 1, tier: 'basic'},
    {name: 'Zucchini',    tempoDeCrescimento: 1_800_000,   custoDaSemente: 0.2,  vendaDaCrop: 0.4,  estoqueDeSementes: 400, quantidade: 1, tier: 'basic'},
    {name: 'Carrot',      tempoDeCrescimento: 3_600_000,   custoDaSemente: 0.5,  vendaDaCrop: 0.8,  estoqueDeSementes: 200, quantidade: 1, tier: 'medium'},
    {name: 'Yam',         tempoDeCrescimento: 3_600_000,   custoDaSemente: 0.5,  vendaDaCrop: 0.8,  estoqueDeSementes: 180, quantidade: 1, tier: 'medium'},
    {name: 'Cabbage',     tempoDeCrescimento: 7_200_000,   custoDaSemente: 1,    vendaDaCrop: 1.5,  estoqueDeSementes: 180, quantidade: 1, tier: 'medium'},
    {name: 'Broccoli',    tempoDeCrescimento: 7_200_000,   custoDaSemente: 1,    vendaDaCrop: 1.5,  estoqueDeSementes: 180, quantidade: 1, tier: 'medium'},
    {name: 'Soybean',     tempoDeCrescimento: 10_800_000,  custoDaSemente: 1.5,  vendaDaCrop: 2.3,  estoqueDeSementes: 180, quantidade: 1, tier: 'medium'},
    {name: 'Pepper',      tempoDeCrescimento: 14_400_000,  custoDaSemente: 2,    vendaDaCrop: 3,    estoqueDeSementes: 160, quantidade: 1, tier: 'medium'},
    {name: 'Beetroot',    tempoDeCrescimento: 14_400_000,  custoDaSemente: 2,    vendaDaCrop: 2.8,  estoqueDeSementes: 160, quantidade: 1, tier: 'medium'},
    {name: 'Cauliflower', tempoDeCrescimento: 28_800_000,  custoDaSemente: 3,    vendaDaCrop: 4.25, estoqueDeSementes: 160, quantidade: 1, tier: 'medium'},
    {name: 'Parsnip',     tempoDeCrescimento: 43_200_000,  custoDaSemente: 5,    vendaDaCrop: 6.5,  estoqueDeSementes: 120, quantidade: 1, tier: 'medium'},
    {name: 'Eggplant',    tempoDeCrescimento: 57_600_000,  custoDaSemente: 6,    vendaDaCrop: 8,    estoqueDeSementes: 100, quantidade: 1, tier: 'advanced'},
    {name: 'Corn',        tempoDeCrescimento: 72_000_000,  custoDaSemente: 7,    vendaDaCrop: 9,    estoqueDeSementes: 100, quantidade: 1, tier: 'advanced'},
    {name: 'Onion',       tempoDeCrescimento: 72_000_000,  custoDaSemente: 7,    vendaDaCrop: 10,   estoqueDeSementes: 100, quantidade: 1, tier: 'advanced'},
    {name: 'Turnip',      tempoDeCrescimento: 86_400_000,  custoDaSemente: 5,    vendaDaCrop: 8,    estoqueDeSementes: 80,  quantidade: 1, tier: 'advanced'},
    {name: 'Radish',      tempoDeCrescimento: 86_400_000,  custoDaSemente: 7,    vendaDaCrop: 9.5,  estoqueDeSementes: 80,  quantidade: 1, tier: 'advanced'},
    {name: 'Wheat',       tempoDeCrescimento: 86_400_000,  custoDaSemente: 5,    vendaDaCrop: 7,    estoqueDeSementes: 80,  quantidade: 1, tier: 'advanced'},
    {name: 'Kale',        tempoDeCrescimento: 129_600_000, custoDaSemente: 7,    vendaDaCrop: 10,   estoqueDeSementes: 60,  quantidade: 1, tier: 'advanced'},
    {name: 'Artichoke',   tempoDeCrescimento: 129_600_000, custoDaSemente: 7,    vendaDaCrop: 12,   estoqueDeSementes: 60,  quantidade: 1, tier: 'advanced'},
    {name: 'Barley',      tempoDeCrescimento: 172_800_000, custoDaSemente: 10,   vendaDaCrop: 12,   estoqueDeSementes: 60,  quantidade: 1, tier: 'advanced'}
];



let nftCrops = [
    //NFTs feitos no ferreiro
    {
        id: 'warehouse',
        name: 'Warehouse',
        descricao: '+20% de Sementes no stock',
        cropAfetada: 'todas',
        afeta: 'estoque',
        sinal: 'x',
        buff: 1.2,
        possui: false
    },
    {
        id: 'basicScarecrow',
        name: 'Basic Scarecrow',
        descricao: '-20% no tempo de Crops Basicas - Efeito em 9 Plots',
        cropAfetada: 'basic',
        afeta: 'area / tempo',
        sinal: 'x',
        buff: 0.8,
        possui: false
    },
    {
        id: 'scaryMike',
        name: 'Scary Mike',
        descricao: '+0.2 Medium Crops - Efeito em 9 Plots',
        cropAfetada: 'medium',
        afeta: 'quantidade',
        sinal: '+',
        buff: (0.2 * 9) / plots,
        possui: false
    },
    {
        id: 'laurieTheChuckleCrow',
        name: 'Laurie the Chuckle Crow',
        descricao: '+0.2 Advanced Crops - Efeito em 9 Plots',
        cropAfetada: 'advanced',
        afeta: 'quantidade',
        sinal: '+',
        buff: (0.2 * 9) / plots,
        possui: false
    },
    //NFTs de Crops
    {
        id: 'nancy',
        name: 'Nancy',
        descricao: '-15% no tempo das Crops',
        cropAfetada: 'todas',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.85,
        possui: false
    },
    {
        id: 'scarecrow',
        name: 'Scarecrow',
        descricao: '-15% no tempo das Crops, +20% Crops',
        cropAfetada: 'todas',
        afeta: 'quantidade / tempo',
        sinal: 'x',
        buff: 1.2,
        possui: false
    },
    {
        id: 'kuebiko',
        name: 'Kuebiko',
        descricao: '-15% no tempo das Crops, +20% Crops e Sementes Grátis',
        cropAfetada: 'todas',
        afeta: 'quantidade / tempo / coins',
        sinal: 'x',
        buff: 0,
        possui: false
    },
    {
        id: 'lunarCalendar',
        name: 'Lunar Calendar',
        descricao: '10% no tempo das Crops',
        cropAfetada: 'todas',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.9,
        possui: false
    },
    {
        id: 'gnome',
        name: 'Gnome',
        descricao: '+10 Medium ou Advanced Crops - Efeito em 1 Plot',
        cropAfetada: 'medium / advanced',
        afeta: 'area / quantidade',
        sinal: '+',
        buff: 10 / plots,
        possui: false
    },
    {
        id: 'sirGoldensnout',
        name: 'Sir Goldensnout',
        descricao: '+0.5 Crops - Efeito em 12 Plots',
        cropAfetada: 'todas',
        afeta: 'area / quantidade',
        sinal: '+',
        buff: (0.5 * 12) / plots,
        possui: false
    },
    {
        id: 'stellarSunflower',
        name: 'Stellar Sunflower',
        descricao: '3% de chance em obter +10 Sunflowers',
        cropAfetada: 'Sunflower',
        afeta: 'quantidade',
        sinal: '+',
        buff: 3/100*10,
        possui: false
    },
    {
        id: 'peeledPotato',
        name: 'Peeled Potato',
        descricao: '20% de chance em obter +1 Potato',
        cropAfetada: 'Potato',
        afeta: 'quantidade',
        sinal: '+',
        buff: 20/100,
        possui: false
    },
    {
        id: 'potentPotato',
        name: 'Potent Potato',
        descricao: '3% de chance em obter +10 Potatos',
        cropAfetada: 'Potato',
        afeta: 'quantidade',
        sinal: '+',
        buff: 3/100*10,
        possui: false
    },
    {
        id: 'victoriaSisters',
        name: 'Victoria Sisters',
        descricao: '+20% Pumpkins',
        cropAfetada: 'Pumpkin',
        afeta: 'quantidade',
        sinal: 'x',
        buff: 1.2,
        possui: false
    },
    {
        id: 'labGrownPumpkin',
        name: 'Lab Grown Pumpkin',
        descricao: '+0,3 Pumpkins',
        cropAfetada: 'Pumpkin',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.3,
        possui: false
    },
    {
        id: 'freyaFox',
        name: 'Freya Fox',
        descricao: '+0.5 Pumpkins',
        cropAfetada: 'Pumpkin',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.5,
        possui: false
    },
    {
        id: 'easterBunny',
        name: 'Easter Bunny',
        descricao: '+20% Carrots',
        cropAfetada: 'Carrot',
        afeta: 'quantidade',
        sinal: 'x',
        buff: 1.2,
        possui: false
    },
    {
        id: 'pabloTheBunny',
        name: 'Pablo The Bunny',
        descricao: '+0.1 Carrot',
        cropAfetada: 'Carrot',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.1,
        possui: false
    },
    {
        id: 'labGrownCarrot',
        name: 'Lab Grown Carrot',
        descricao: '+0,2 Carrots',
        cropAfetada: 'Carrot',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.2,
        possui: false
    },
    {
        id: 'karkinos',
        name: 'Karkinos',
        descricao: '+0.1 Cabbage (Não funciona com Cabbage Boy)',
        cropAfetada: 'Cabbage',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.1, //verificar como calcular buff dps
        possui: false
    },
    {
        id: 'cabbageBoy',
        name: 'Cabbage Boy',
        descricao: '+0.25 Cabbage ou +0.5 Cabbage possuindo Cabbage Girl',
        cropAfetada: 'Cabbage',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.25, //verificar como calcular buff dps
        possui: false
    },
    {
        id: 'cabbageGirl',
        name: 'Cabbage Girl',
        descricao: '-50% no tempo das Cabbages',
        cropAfetada: 'Cabbage',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.5,
        possui: false
    },

];


let skillCrops = [
    //Skills - Legacy
    {
        id: 'greenThumb',
        nome: 'Green Thumb',
        descricao: '+5% de coins ao vender colheitas (Loja de Sementes)',
        cropAfetada: 'todas',
        afeta: 'coins',
        sinal: 'x',
        custo: 'Legacy',
        buff: 1.05,
        possui: false
    },
    {
        id: 'seedSpecialist',
        nome: 'Seed Specialist',
        descricao: '-10% no tempo das Crops',
        cropAfetada: 'todas',
        afeta: 'tempo',
        sinal: 'x',
        custo: 'Legacy',
        buff: 0.9,
        possui: false
    },
    {
        id: 'coder',
        nome: 'Coder',
        descricao: '+20% na colheita de Crops',
        cropAfetada: 'todas',
        afeta: 'quantidade',
        sinal: 'x',
        custo: 'Legacy',
        buff: 1.2,
        possui: false
    },
    //Skills - Tier 1
    {
        id: 'greenThumb2',
        nome: 'Green Thumb',
        descricao: '-5% no tempo das Crops',
        cropAfetada: 'todas',
        afeta: 'tempo',
        sinal: 'x',
        custo: 1,
        buff: 0.95,
        possui: false
    },
    {
        id: 'youngFarmer',
        nome: 'Young Farmer',
        descricao: '+0.1 Basic Crop Yield',
        cropAfetada: 'basic',
        afeta: 'quantidade',
        sinal: '+',
        custo: 1,
        buff: 0.1,
        possui: false
    },
    {
        id: 'experiencedFarmer',
        nome: 'Experienced Farmer',
        descricao: '+0.1 Medium Crop Yield',
        cropAfetada: 'medium',
        afeta: 'quantidade',
        sinal: '+',
        custo: 1,
        buff: 0.1,
        possui: false
    },
    {
        id: 'oldFarmer',
        nome: 'Old Farmer',
        descricao: '+0.1 Advanced Crop Yield',
        cropAfetada: 'advanced',
        afeta: 'quantidade',
        sinal: '+',
        custo: 1,
        buff: 0.1,
        possui: false
    },
    {
        id: 'bettysFriend',
        nome: 'Betty\'s Friend',
        descricao: 'Delivery da \'Betty\' Coin aumentou 30%',
        cropAfetada: 'todas',
        afeta: 'delivery',
        sinal: 'x',
        custo: 1,
        buff: 1.3,
        possui: false
    },
    {
        id: 'chonkyScarecrow',
        nome: 'Chonky Scarecrow',
        descricao: 'Basic Scarecrow AOE aumenta o tamanho para 7x7',
        cropAfetada: 'DESATIVADO',
        afeta: 'quantidade',
        sinal: '+',
        custo: 1,
        buff: 7 * 7,
        possui: false
    },
    //Skills - Tier 2
    {
        id: 'strongRoots',
        nome: 'Strong Roots',
        descricao: '10% de redução no tempo das Advanced Crops',
        cropAfetada: 'advanced',
        afeta: 'tempo',
        sinal: 'x',
        custo: 2,
        buff: 0.9,
        possui: false
    },
    {
        id: 'coinSwindler',
        nome: 'Coin Swindler',
        descricao: '+10% de coins ao vender colheitas (Loja de Sementes)',
        cropAfetada: 'todas',
        afeta: 'coins',
        sinal: 'x',
        custo: 2,
        buff: 1.1,
        possui: false
    },
    {
        id: 'goldenSunflower',
        nome: 'Golden Sunflower',
        descricao: '1/700 de obter +0,35 gold ao colher sunflowers manualmente',
        cropAfetada: 'Sunflower',
        afeta: 'gold',
        sinal: '+',
        custo: 2,
        buff: 1.35 / 700 * 0.35,
        possui: false
    },
    {
        id: 'horrorMike',
        nome: 'Horror Mike',
        descricao: 'Scary Mike AOE aumenta o tamanho para 7x7 (Crops Médias)',
        cropAfetada: 'DESATIVADO',
        afeta: 'quantidade',
        sinal: '+',
        custo: 2,
        buff: 7 * 7,
        possui: false
    },
    {
        id: 'lauriesGains',
        nome: 'Laurie\'s Gains',
        descricao: 'Laurie Crow AOE aumenta o tamanho para 7x7 (Crops Avançadas)',
        cropAfetada: 'DESATIVADO',
        afeta: 'quantidade',
        sinal: '+',
        custo: 2,
        buff: 7 * 7,
        possui: false
    },
    // Skills - Tier 3
    {
        id: 'acreFarm',
        nome: 'Acre Farm',
        descricao: '+1 Advanced crop yeild, -0.5 Basic and Medium crop yield',
        cropAfetada: 'advanced',
        afeta: 'quantidade',
        sinal: '+',
        custo: 3,
        buff: 1,
        cropReduzida: 'basic medium',
        deBuff: 0.5,
        possui: false
    },
    {
        id: 'hectareFarm',
        nome: 'Hectare Farm',
        descricao: '+1 Basic and Medium crop yield, -0.5 Advanced crop yield',
        cropAfetada: 'basic medium',
        afeta: 'quantidade',
        sinal: '+',
        custo: 3,
        buff: 1,
        cropReduzida: 'advanced',
        deBuff: 0.5,
        possui: false
    },
    {
        id: 'instantGrowth',
        nome: 'Instant Growth',
        descricao: 'Capacidade de deixar todas Crops prontas para serem colhidas (1/72h)',
        cropAfetada: 'DESATIVADO',
        afeta: 'quantidade',
        sinal: '+',
        custo: 3,
        buff: '',
        possui: false
    }
];

nftCrops.forEach(nft => { 
    
    let checkbox = document.getElementById(nft.id); 
    
    if (checkbox) {
        nft.possui = checkbox.checked; 

        checkbox.addEventListener('change', function() { 
            nft.possui = checkbox.checked; 
            atualizarStatusDasCrops();
        });
    }
});

//PARTE PARA PROGRAMAR DE MARCA AS CHECKBOX SE POSSUO OU NÃO AS SKILLS - essa parte vou ter q aprender bem ainda!
skillCrops.forEach(skill => { //forEach é um método do JavaScript que serve para percorrer cada item de um array e executar uma função para cada um deles. É como um "loop" mais simples.
    
    let checkbox = document.getElementById(skill.id); // => é um abreviamento de function, entao usar '() =>' é a msm coisa de 'function()', foi oque entendi - o .id é pra verificar se o id no html bate com o pesquisado
    
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
    
    //multiplocar/somar e subtrair as crops que faço com os buffs que tenho!
    let multiCrop = 1;
    let somaCrop = 0;
    let menosCrop = 0;

    skillCrops.forEach(coleta => {

        if (coleta.possui === true && coleta.sinal === 'x' && coleta.afeta === 'quantidade' &&
            (coleta.cropAfetada === 'todas' || coleta.cropAfetada.includes(crop.tier) || coleta.cropAfetada === crop.name)) {

            multiCrop *= coleta.buff;
        };

        if (coleta.possui === true && coleta.sinal === '+' && coleta.afeta === 'quantidade' &&
            (coleta.cropAfetada === 'todas' || coleta.cropAfetada.includes(crop.tier) || coleta.cropAfetada === crop.name)) {

            somaCrop += coleta.buff;
        };

        if (coleta.possui === true && coleta.sinal === '+' && coleta.afeta === 'quantidade' && coleta.cropReduzida && (coleta.cropReduzida.includes(crop.tier) || coleta.cropReduzida === crop.name)) {
                menosCrop += coleta.deBuff;
        };

    });

    nftCrops.forEach(coleta => { 

        if (coleta.possui === true && coleta.sinal === 'x' && coleta.afeta.includes('quantidade') && //depois revisar por questao de nfts como nancy/scarecrow/kuebiko
            (coleta.cropAfetada === 'todas' || coleta.cropAfetada.includes(crop.tier) || coleta.cropAfetada === crop.name)) {

            multiCrop *= coleta.buff;
        };

        if (coleta.possui === true && coleta.sinal === '+' && coleta.afeta.includes('quantidade') && //depois revisar por questao de nfts como cabbage boy e cabbage girl
            (coleta.cropAfetada === 'todas' || coleta.cropAfetada.includes(crop.tier) || coleta.cropAfetada === crop.name)) {

            somaCrop += coleta.buff;
        };

    });

    let colheita = ((crop.quantidade * multiCrop) + somaCrop) - menosCrop;
    let colheitaTotal = colheita * plots;

    //redução do tempo
    let reduzTempo = 1;
    skillCrops.forEach(coleta => {

        if (coleta.possui === true && coleta.sinal === 'x' && coleta.afeta === 'tempo' &&
            (coleta.cropAfetada === 'todas' || coleta.cropAfetada.includes(crop.tier) || coleta.cropAfetada === crop.name)) {

            reduzTempo *= coleta.buff;
        };

    });
    let tempo = crop.tempoDeCrescimento * reduzTempo;

    let lucro = colheita * crop.vendaDaCrop - crop.custoDaSemente;

    mostrarNoHtml.innerHTML += (`Crop: ${crop.name}\n`); //+= como só tem uma 'variavel' saida no html, o sinal += salva as informações, senao ele sempre cobre com a ultima informação;
    msParaTempo(tempo, mostrarNoHtml);
    mostrarNoHtml.innerHTML += (`Estoque: ${crop.estoqueDeSementes}\n`);
    mostrarNoHtml.innerHTML += (`Crop por Plot: ${colheita.toFixed(2)}\n`);
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

