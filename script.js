//Exercícios 1, 2 e 3 - Caroline Ushirobira

var media, mediana;
var alunos = [
  {
    nome: 'João',
    nota: 5.0,
    idade: 45
  },
  {
    nome: 'Alfredo',
    nota: 8.0,
    idade: 17
  },
  {
    nome: 'Rafael',
    nota: 6.0,
    idade: 20
  },
  {
    nome: 'Leonardo',
    nota: 9.9,
    idade: 22
  },
  {
    nome: 'Jean',
    nota: 4.0,
    idade: 26
  },
  {
    nome: 'Beto',
    nota: 7.0,
    idade: 55
  },
  {
    nome: 'Luciana',
    nota: 9.0,
    idade: 56
  },
  {
    nome: 'Victor',
    nota: 2.0,
    idade: 33
  },
  {
    nome: 'Maria',
    nota: 4.0,
    idade: 18
  },
  {
    nome: 'Otávio',
    nota: 9.6,
    idade: 47
  },
  {
    nome: 'Priscila',
    nota: 2.0,
    idade: 23
  },
  {
    nome: 'Steves',
    nota: 6.9,
    idade: 89
  },
  {
    nome: 'Victorina',
    nota: 8.1,
    idade: 37
  },
  {
    nome: 'Gumerlinda',
    nota: 1.9,
    idade: 10
  },
  {
    nome: 'Samuel',
    nota: 7.1,
    idade: 56
  }
];

async function calculaMedia (students){
  var soma_notas = 0, resultado = 0;

  for (var i = 0; i<students.length; i++){
    soma_notas = students[i]['nota']+soma_notas;
  }

  resultado = soma_notas/students.length;

  return resultado;
}

async function calculaMediana (students){
  var index_med = 0, index_med1 = 0, index_med2 = 0;
  var resultado = 0;

  //Função para ordenar de forma crescente (StackOverflow)
  students.sort(function compare( a, b ) {
    
    if ( a.nota < b.nota ){
      return -1;
    }
    if ( a.nota > b.nota ){
      return 1;
    }
    return 0;
  });  

  //Conferindo se o tamanho do array é número par ou ímpar
  if (students.length%2==0){
    index_med1 = (students.length/2)-1;
    index_med2 = (students.length/2);

    resultado = (students[index_med1]['nota']+students[index_med2]['nota'])/2;
  }

  else if (students.length%2==1){
    index_med = Math.floor(students.length/2);

    resultado = students[index_med]['nota'];
  }

  return resultado;
}

async function calculaModa(students){
  var objeto_notas = {};
  for (var i = 0; i < students.length; i++) {
    var nota = students[i]['nota'];

    if (typeof objeto_notas[nota] == 'undefined') {
      objeto_notas[nota] = 1; 
    }
    else {
      objeto_notas[nota] = objeto_notas[nota] + 1;
    }
  }

  //descobrir qual maior frequência dentro do objeto_notas
  var maior_frequencia = 0;

  for (nota in objeto_notas) {
    var frequencia = objeto_notas[nota];
    if (frequencia > maior_frequencia) {
      maior_frequencia = frequencia;
    }
  }

  var moda = [];

  if (maior_frequencia < 2) {
    console.log("Não existe moda.");
  }

  //iterando dentro do objeto
  else {
    for (nota in objeto_notas) {
      var frequencia = objeto_notas[nota];
      if (frequencia == maior_frequencia) {
        moda.push(nota);
      }
    }
  }
  return moda;
}

//Desenvolvendo a quarta função solicitada no enunciado 3 
async function quartaFuncao(students){

  const media = await calculaMedia(students);
  const mediana = await calculaMediana(students);
  const moda = await calculaModa(students);

  for (var j =0; j<students.length; j++){

    students[j]['media'] = media;
    students[j]['mediana'] = mediana;
    students[j]['moda'] = moda;

    //Adicionando item 3.1: status aprovado ou reprovado
    if (students[j]['nota']>=media){
      students[j]['status'] = 'Aprovado';
    }
    else {
      students[j]['status'] = 'Reprovado';
    }

    //Adicionando item 3.2: comentário sobre moda
    //Percorrendo array de Moda para descobrir a menor Moda
    for (var i = 0; i <moda.length; i++){
      if (moda[i] < moda[i+1]){
        var menorModa = moda[i];
      }
    }
    
    if (students[j]['nota']<=menorModa){
      students[j]['comentario'] = 'precisa melhorar!';
    }
    else {
      students[j]['comentario'] = 'sua nota está acima da moda!';
    } 

    //Adicionando item 3.3: se nota for maior ou igual Mediana e menor que Média
    if ((students[j]['nota']>=mediana) && (students[j]['nota']<media)){
      students[j]['mensagem'] = 'quase lá, tenta mais um pouco!';
    }

    else {
      students[j]['mensagem'] = '...';
    }
    
  }

  return students;

}

quartaFuncao(alunos).then(resultado => {
  console.log(resultado);
})