
(function() {

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
  
    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
          },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
  
    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());
  
  (function() {
  
    var coin,
      coinImage,
      canvas;
  
    function gameLoop() {
  
      window.requestAnimationFrame(gameLoop);
  
      coin.update();
      coin.render();
    }
  
    // Função prepara
    function sprite(options) {
  
      // inicializando configuração
      var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;
  
      // onde objeto vai ser desenhado 
      that.context = options.context;
      // Largura
      that.width = options.width;
      // altura
      that.height = options.height;
      // objeto que recebe a imagem
      that.image = options.image;
  
      that.update = function() {
  
        tickCount += 1;
  
        if (tickCount > ticksPerFrame) {
  
          tickCount = 0;
  
          //verifica se é chegou a ultima imagem
          if (frameIndex < numberOfFrames - 1) {
            // avança proxima imagem
            frameIndex += 1;
          } else {
            // retorna a posição inicial
            frameIndex = 0;
          }
        }
      };
  
      that.render = function() {
  
        // Clear the canvas
        that.context.clearRect(0, 0, that.width, that.height);
  
        // Draw the animation
        that.context.drawImage(
          that.image,
          frameIndex * that.width / numberOfFrames,
          0,
          that.width / numberOfFrames,
          that.height,
          0,
          0,
          that.width / numberOfFrames,
          that.height);
      };
  
      return that;
    }
  
    // pega o elemento que vamos tornar um obj canvas
    canvas = document.getElementById("coinAnimation");
    canvas.width = 100;
    canvas.height = 100;
  
    // cria um um objeto para receber as imagem
    coinImage = new Image();
  
    // Inicializa um objeto canvas
    coin = sprite({
      context: canvas.getContext("2d"),
      width: 1000,
      height: 100,
      image: coinImage,
      numberOfFrames: 10,
      ticksPerFrame: 2
    });
  
    // Carrega Roteiro da imagem
    coinImage.addEventListener("load", gameLoop);
    // coinImage.src = "http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/downloads/sprite-animation-demo/images/coin-sprite-animation.png";
    coinImage.src = "img/moeda-dourada.png";
  
  }());
  
  
  $('.btn').on('click', function(){
  
      var res = '';
  
      $("#resultado").text('')
  
      if(Math.random() < 0.5) {
          res = 'Cara';
      } else {
          res = 'Coroa';
      }
  
      setTimeout(function(){
          $('#resultado').text('');
      }, 1000);
  
      $("#resultado").text(res);
  
  });
  