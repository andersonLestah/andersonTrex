//criando as variáveis 
var trex,chao, subchao,nuvem,cacto,escolherCacto, tempoJogo,fimDeJogo,reiniciar,recorde; 

var trexCorrendo, imagemChao, imagemNuvem,imagemFim,imagemReiniciar;

var imagemCacto1, imagemCacto2, imagemCacto3,imagemCacto4, imagemCacto5, imagemCacto6;

var somPulo,somMorrer;

const JOGAR = 1
const ENCERRAR = 0
var estadoJogo = JOGAR;


//função para carregar imagens e animações
function preload(){
  
  trexCorrendo = loadAnimation("trex1.png","trex2.png","trex3.png")
  trexColidiu = loadImage("trex_collided.png")
  
  imagemChao = loadImage("ground2.png")
  
  imagemNuvem = loadImage("cloud.png")
  
  imagemCacto1 = loadImage("obstacle1.png")
  imagemCacto2 = loadImage("obstacle2.png")
  imagemCacto3 = loadImage("obstacle3.png")
  imagemCacto4 = loadImage("obstacle4.png")
  imagemCacto5 = loadImage("obstacle5.png")
  imagemCacto6 = loadImage("obstacle6.png")
  
  
  imagemFim = loadImage("gameOver.png")
  imagemReiniciar = loadImage("restart.png")
  
  somPulo= loadSound("jump.mp3")
  somMorrendo = loadSound("die.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  //criando o sprite do trex- colocando a animação
  trex = createSprite(50,height - 20,20,40)
  trex.addAnimation("correndo",trexCorrendo)
  trex.addAnimation("colidiu",trexColidiu)
  trex.scale = 0.5
  
  //criando o sprite do chao e colocando a imagem
  chao = createSprite(200,height - 20,500,10)
  chao.addAnimation("chao", imagemChao)
  
  //criando o subchao e deixando ele invisível. 
  subchao = createSprite(200,height,500,10)
  subchao.visible = false
  
  tempoJogo=0
  recorde=0
  
  trex.setCollider("circle",0,0,40)
  
  trex.debug=false
  
  
  
  grupoDenuvens = new Group ();
  grupoDecactos = new Group ();
  
  fimDeJogo = createSprite(width/2,height/2-30,30,30)
  fimDeJogo.addAnimation("fim",imagemFim)
  fimDeJogo.scale = 0.5
  
  
  reiniciar = createSprite(width/2,height/2,30,30)
  reiniciar.addAnimation("reiniciar",imagemReiniciar)
  reiniciar.scale = 0.5
  
}

function draw() {
  background(180)
  text("Tempo: " + tempoJogo,width-100,20)
  text(recorde,width-165,20)
 
  
  if(estadoJogo == JOGAR){
  tempoJogo=tempoJogo+1
  chao.velocityX = -(6 + tempoJogo /100)
    
    fimDeJogo.visible = false
    reiniciar.visible = false
    if(chao.x < 0){
    
    chao.x  = chao.width / 2
  }
    if (  (touches.length > 0 || keyDown("space") ) && trex.y > height - 39){
      somPulo.play()
    trex.velocityY = - 10
      touches = []
  }
     trex.velocityY = trex.velocityY + 0.5
gerarNuvens()
gerarCacto()
    
    if(grupoDecactos.isTouching(trex)){
      somMorrendo.play()
      
      estadoJogo = ENCERRAR;
    }
    
  }else if(estadoJogo == ENCERRAR){
    
     chao.velocityX = -0
    
    fimDeJogo.visible = true
    reiniciar.visible = true
    
    grupoDecactos.setVelocityXEach(0)
    grupoDenuvens.setVelocityXEach(0)
    
    grupoDecactos.setLifetimeEach(-1)
    grupoDenuvens.setLifetimeEach(-1)
    trex.changeAnimation("colidiu",trexColidiu)
    trex.velocityY=0
     if( touches.length > 0 || mousePressedOver(reiniciar)){
    restart()
    touches = []
  }
  }


  
  
  
  
  
 
  
  trex.collide(subchao)
  
 
  drawSprites()
 
}

function restart(){
  estadoJogo = JOGAR
  fimDeJogo.visible = false
  reiniciar.visible = false
  grupoDecactos.destroyEach()
  grupoDenuvens.destroyEach()
  trex.changeAnimation("correndo",trexCorrendo)
  
   if(tempoJogo>recorde){
recorde = tempoJogo
  }
  
  
  tempoJogo = 0
 
}
function gerarCacto(){
  if(frameCount % 60 == 0){
  
  cacto = createSprite(width,height-35,10,40)
  cacto.velocityX = - (6 + tempoJogo /100)

    
      escolherCacto = Math.round(random(1,6))
  
  switch (escolherCacto){
      
    case 1: cacto.addImage("imagemCacto1", imagemCacto1)
    break;
    case 2: cacto.addImage("imagemCacto2", imagemCacto2)
    break;
    case 3: cacto.addImage("imagemCacto2", imagemCacto3)
    break;
    case 4: cacto.addImage("imagemCacto1", imagemCacto4)
    break;
    case 5: cacto.addImage("imagemCacto2", imagemCacto5)
    break;
    case 6: cacto.addImage("imagemCacto2", imagemCacto6)
    break;
    
  }
    cacto.scale =0.4
    cacto.lifetime =120;
    grupoDecactos.add(cacto);
  
  }

  
  

  
}


function gerarNuvens(){
  
  if(frameCount % 60 == 0){
       nuvem=createSprite(width,100,50,10)
    nuvem.addImage("nuvem",imagemNuvem)
      nuvem.velocityX=-4    
      nuvem.y =Math.round(random(80,40))
    nuvem.depth = trex.deth
    trex.depth = trex.deth +1
    nuvem.scale = 0.4
    nuvem.lifetime = width;
    grupoDenuvens.add(nuvem);
     
     }

  
  
}
