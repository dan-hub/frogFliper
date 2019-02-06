// Inimigos que nosso jogador deve evitar
class Enemy{
	constructor(){
		// As variáveis aplicadas a nossas instâncias entram aqui.
	    // Fornecemos uma a você para que possa começcar.

	    // A imagem/sprite de nossos inimigos, isso usa um
	    // ajudante que é fornecido para carregar imagens
	    // com facilidade.
		this.sprite = 'images/enemy-bug.png';
		
	}
	// Atualize a posição do inimigo, método exigido pelo jogo
	// Parâmetro: dt, um delta de tempo entre ticks
	update(dt){
		// Você deve multiplicar qualquer movimento pelo parâmetro
	    // dt, o que garantirá que o jogo rode na mesma velocidade
	    // em qualquer computador.
	}
	// Desenhe o inimigo na tela, método exigido pelo jogo
	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

class Char{
	constructor(){
		this.sprite = 'images/char-boy.png';
		this.x = 202;
		//Considerando que:
		//Primeiro: a imagem de cada bloco tem 171px de altura;
		//Segundo: o y "andavel" de cada bloco tem 83px;
		//Terceiro: o subsolo é igual a parte invisivel;
		//sabemos que a parte invisivel é = (171 - 83) / 2 = 44;
		this.y = -44 + 83 * 5;
		this.aguaFlag = false;
		this.aguaCancel = true;

	}

	update(){
	}

	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	
}

let player = new Char(),
	allEnemies = [];
for(let i = 1; i <= 4; i++){
	let enemy = new Enemy();
	allEnemies.push(enemy);
}

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.

hotkeys('up,down,left,right', function(event,handler) {
  switch(handler.key){
	case "up":
		if(player.y === -44){
			break;
		}
		
		player.y -= 83;

		//Verificação abaixo serve para saber se o char está na agua,
		//Caso sim, abre uma contagem para ver se ele continuara na agua
		//Caso continuar, o jogo é resetado
		if(player.y < 0){
			    window.setTimeout(function verificaAfogamento() {
			    	if(player.y < 0){
			    		
			    		player.y = -44 + 83 * 5;
			    		player.x = 202;
			    	}else{
			    		console.log("Não está mais na agua");
			    	}
			    }, 2000);
		}

		break;
	case "down":

		if(player.y >= -44 + 83 * 5){
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
 }
 console.log(`${player.x}, ${player.y}`)
});

