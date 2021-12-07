var starImg, bgImg;
var star, starBody;
//criar variável para sprite de fada e imgFada
var fada,fadaImg;
var bloco;


const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
  starImg = loadImage("images/star.png");
  bgImg = loadImage("images/starNight.png");
  //vozFada = loadSound("sound/JoyMusic.mp3");
  //carregar animação de fada 
  fadaImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
}

function setup() {
  createCanvas(800, 750);

  //escrever código para tocar o som vozFada
  

  //criar sprite de fada e adicionar animação para fada
  fada = createSprite(100,650,20,20);
  fada.addAnimation("fadaimg",fadaImg);
  fada.scale = 0.2
  fada.velocityX = 0;
  fada.debug = false;
  fada.setCollider("rectangle",170,100,1500,400)

  star = createSprite(650, 30);
  star.addImage(starImg);
  star.scale = 0.2;
  star.debug = false;

  bloco = createSprite(740,500,20,500);
  bloco.debug = false;
  bloco.visible = false;

  engine = Engine.create();
  world = engine.world;

  starBody = Bodies.circle(650, 30, 5, {
    restitution: 0.5,
    isStatic: true
  });
  World.add(world, starBody);

  Engine.run(engine);

}

function draw() {
  background(bgImg);

  //fazer com que posição do sprite seja a mesma que a do corpo starBody
  star.x = starBody.position.x 
  star.y = starBody.position.y 

  if(star.isTouching(fada)){
    Matter.Body.setStatic(starBody,true);
  }
  //se a estrela encostar na fada, o corpo fica estático
  /*
	exemplo:
	if(star.y > 470 && starBody.position.y > 470 ){
  	Matter.Body.setStatic(starBody,true);
	}
	Ajustar posição de acordo com a posição e o tamanho da sua fada
	*/

  fada.collide(bloco);

  fada.display();
  star.display();
  bloco.display();  

  drawSprites();
}

function keyPressed() {
  //**lembrar que dentro do function keyPressed() usamos keyCode ===
  if(keyCode === DOWN_ARROW){
      Matter.Body.setStatic(starBody,false)
      
  }

  if(keyCode === LEFT_ARROW){
    fada.velocityX = -2;
  }
  if(keyCode === RIGHT_ARROW){
    fada.velocityX = 6;
  }
  //se a seta para baixo for apertada, estrela deixa de ser estática

  //se a seta para a direita for apertada, o x da fada aumenta

  //se a seta para a esquerda for apertada, o x da fada diminui
  
}