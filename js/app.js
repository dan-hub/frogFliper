//A estrela sempre estará lá, somente é controlada a sua visibilidade e sua capacidade de ser pega
class Star{
	constructor(){
		//Quantidade de estrelas pegas pelo jogador, isso irá influenciar na skin seguinte
		this.prestiges = 0;
		this.visivel = false;
		//False = player não pegou a estrela; True = player pegou a estrela.
		this.coletaStatus = false;
	}


	setVisivel(){
		this.visivel = true;
	}
	reset(){
		this.visivel = false;
		this.coletaStatus = false;
	}
}

//Objeto para controle do placar do game
class Score{
	constructor(){
		this.points= 0;
		this.best = 0;
	}

	reset(){
		if(this.points > this.best){
			this.best = this.points;
			console.log(this.best);
		}
		this.points= 0;
		
	}
	add(){
		this.points++;
	}
}
// Inimigos que nosso jogador deve evitar
class Enemy{
	constructor(){
		// As variáveis aplicadas a nossas instâncias entram aqui.
	    // Fornecemos uma a você para que possa começcar.

	    // A imagem/sprite de nossos inimigos, isso usa um
	    // ajudante que é fornecido para carregar imagens
	    // com facilidade.
		this.sprite = 'images/enemy-bug.png';

		this.raffle();


	}
	// Atualize a posição do inimigo, método exigido pelo jogo
	// Parâmetro: dt, um delta de tempo entre ticks
	update(dt){
		this.x += dt * this.speed;
		if(this.x >= 606){
			this.raffle();
		}
	}
	// Desenhe o inimigo na tela, método exigido pelo jogo
	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	//Responsavel por:
	//sorteio da linha de respwan,
	//Velocidade,
	//e rebobinar a posição de x
	raffle(){
		//Temos 3 linhas de locomoção para os enemies,
		//logo iremos numera-las de 0 a 2 de cima para baixo
		this.linha = Math.floor(Math.random() * 3);
		switch(this.linha){
			case 0: this.y = 60;
					break;
			case 1: this.y = 60 + 83;
					break;
			case 2: this.y = 60 + 2*83;
					break;
		}
		this.x = -101 * 3;
		//Velocidade terá 300 niveis (deverá ser multiplicada por dt)
		this.speed = Math.floor(Math.random() * (400 - 100 +1) + 100);
	}
}

class Char{
	constructor(){
		this.sprite = 'images/char-boy.png';
		this.reset();

	}

	reset(){
		this.x = 202;
		//Considerando que:
		//Primeiro: a imagem de cada bloco tem 171px de altura;
		//Segundo: o y "andavel" de cada bloco tem 83px;
		//Terceiro: o subsolo é igual a parte invisivel;
		//sabemos que a parte invisivel é = (171 - 83) / 2 = 44;
		this.y = -23 + 83 * 5;
	}
	update(){
	}

	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	coletar(){
		console.log("Dando prestige na estrela...");
		star.prestiges++;
		star.visivel = false;
		star.coletaStatus = true;
	}

	prestige(){
		star.reset();
		player.reset();
		score.reset();
	}


}

let player = new Char(),
	allEnemies = [],
	score = new Score(),
	star = new Star();
for(let i = 1; i <= 4; i++){
	let enemy = new Enemy();
	allEnemies.push(enemy);
}


// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.

hotkeys('space,up,down,left,right', function(event,handler) {
  switch(handler.key){
	case "up":
		if(player.y <= -23){
			break;
		}

		player.y -= 83;

		//Verificação abaixo serve para saber se o char está na agua,
		//Caso sim, abre uma contagem para ver se ele continuara na agua
		//Caso continuar, o jogo é resetado
		if(player.y < 0){
			    window.setTimeout(function verificaAfogamento() {
			    	if(player.y < 0){
			    		player.reset();
			    		score.reset();
			    	}else{
			    		console.log("Não está mais na agua");
			    	}
			    }, 2000);
		}

		break;
	case "down":
		if(player.y >= -23 + 83 * 5){
			break;
		}

		player.y += 83;

		break;
	case "left":
		if(player.x <= 0){

			break;
		}
		player.x -= 101;

		break;
	case "right":
		if(player.x >= 404){

			break;
		}
		player.x += 101;

		break;

		//Comando para dar o prestige e obter a skin seguinte
	case "space":
		if(star.coletaStatus && star.prestiges <= 3){
			switch(star.prestiges){
				case 1: player.sprite = 'images/char-cat-girl.png'; break;
				case 2: player.sprite = 'images/char-pink-girl.png'; break;
				case 3: player.sprite = 'images/char-princess-girl.png'; break;
			}
			player.prestige();
		}
		
 }
 if(player.x === 202 && player.y === 143 && star.visivel){
 	//Dar prestige
 	player.coletar();
 }
 console.log(`Coordenadas[x: ${player.x}, y: ${player.y}]`);
 jump.play();
});
