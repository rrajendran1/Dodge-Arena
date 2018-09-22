var backgroundImage;
var playerImage;
var playerImage2;
var playerIdle;
var heart;
var spear;
var player;
var spears = [];
var planes = [];
var score;
var startTime;
var d;
var currentTime;
var bullets = [];
var bulletImage;
var bulletImage2;
var planeImage;
var planeImage2;
var bombImage;
var missileF;
var spearF;
var bulletF;
var pickP;
var adShown;
var bannerShow;
var someText;

var endTime;
var creditScreen;

var arrowImages = [3];
var playButton;
var shoppingImage;
var storePopup;
var backButton;
var muteButton;
var soundButton;
var explosionSound;

var witchW;
var baseW;
var goldenW;
var skeletonW;
var soldierW;
var sorcererW;
var rangerW;
var assassinW;
var explosion;
var textS;

var backgroundMusic;
var hitSound;
var explosionSound;

var pixelFont;

var charArray = [];
var charPurchased;
var game;
var charCount;
var widthThing;
var focus;
var spaghetti;

/* Local Storage Variables:
charEnabled, charPurchased (JSON Array), highscore, credits
*/

function preload() {

  if (localStorage.charEnabled == null){
    localStorage.charEnabled = "base";
  }


  backgroundImage = loadImage("art\\countryBackground.png");
  playerImage = loadImage("art\\" + localStorage.charEnabled + "walk.gif");
  playerImage2 = loadImage("art\\" + localStorage.charEnabled + "walkLeft.gif");

  if (localStorage.charEnabled == "assassin"){
    playerIdle = loadImage("art\\assassinIdle.gif");
  }
  spear = loadImage("art\\arrow.png");
  bulletImage = loadImage("art\\bullet.png");
  bulletImage2 = loadImage("art\\bullet2.png");
  arrowImages[0] = loadImage("art\\leftarrow.png");
  arrowImages[1] = loadImage("art\\uparrow.png");
  arrowImages[2] = loadImage("art\\rightarrow.png");
  playButton = loadImage("art\\play2.png");
  muteButton = loadImage("art\\mute.png");
  soundButton = loadImage("art\\sound.png");
  shoppingImage = loadImage("art\\shoppingbutton.png");
  backButton = loadImage("art\\backbutton.png");
  heart = loadImage("art\\heart.png");
  bombImage = loadImage("art\\bomb.png");
  planeImage = loadImage("art\\plane.png");
  planeImage2 = loadImage("art\\plane2.png");

  /*explosion = loadGif("art\\explosion.gif");
  baseW = loadGif("art\\basewalk.gif");
  goldenW = loadGif("art\\goldenwalk.gif");
  witchW = loadGif("art\\witchwalk.gif");
  skeletonW = loadGif("art\\skeletonwalk.gif");
  soldierW = loadGif("art\\soldierwalk.gif");
  sorcererW = loadGif("art\\sorcererwalk.gif");
  rangerW = loadGif("art\\rangerwalk.gif");
  assassinW = loadGif("art\\assassinwalk.gif");*/
  explosion = loadImage("art\\explosion.gif");
  baseW = loadImage("art\\basewalk.gif");
  goldenW = loadImage("art\\goldenwalk.gif");
  witchW = loadImage("art\\witchwalk.gif");
  skeletonW = loadImage("art\\skeletonwalk.gif");
  soldierW = loadImage("art\\soldierwalk.gif");
  sorcererW = loadImage("art\\sorcererwalk.gif");
  rangerW = loadImage("art\\rangerwalk.gif");
  assassinW = loadImage("art\\assassinwalk.gif");

  backgroundMusic = loadSound("music\\backgroundMusic.mp3");
  hitSound = loadSound("music\\hitSound.mp3");
  explosionSound = loadSound("music\\explosionSound.mp3");

  pixelFont = loadFont("art\\pixel.ttf");
  
}

function setup() {

  if (localStorage.times == null){
    localStorage.times = "0";
  }
  if (localStorage.p1 == null || localStorage.p2 == null){
    localStorage.p1 = '0';
    localStorage.p2 = '0';
  }
  if (localStorage.charPurchased == null){
    charArray = [true,false,false,false,false,false,false, false];
    localStorage.charPurchased = JSON.stringify(charArray);
  } else {
    charArray = JSON.parse(localStorage.charPurchased);
  }

  bannerShow = true;
  document.addEventListener("pause", onBlur, false);
  document.addEventListener("resume", onFocus, false);

  //TEST CODE
  /*charArray = [true,false,false,false,false,false,false, false];
    localStorage.charPurchased = JSON.stringify(charArray);
    localStorage.credits = 10000;*/
  if (localStorage.sound == null){
    localStorage.sound = "true";
  }


  /*admob.setOptions({
    publisherId:      "ca-app-pub-5976865007132965/4870867135",
    interstitialAdId: "ca-app-pub-5976865007132965/7545131937"
  }); */
  //admob.createBannerView();

  /*if (parseInt(localStorage.times) > 5 && parseInt(localStorage.times)%3 ==0){
    admob.requestInterstitialAd({
      publisherId:          "ca-app-pub-5976865007132965/4870867135",
      interstitialAdId:     "ca-app-pub-5976865007132965/7545131937",
      autoShowInterstitial: false
    });
    adShown = false;
  } else {
    adShown = true;
  }*/

  var canvas = createCanvas(window.innerWidth, window.innerHeight);
  fullscreen(true);
  background(0);
  focus = true;
  
  
  player = new Player();
  spears.push(new Spear());
  score = 0;
  d = new Date();
  startTime = d.getTime();
  endTime = 0;
  game = 2;

  if (localStorage.charEnabled == "soldier" || (localStorage.charEnabled == "assassin" && (localStorage.p1 == "4"  || localStorage.p2 == "4"))){
    game+=2;
  } 
  if(localStorage.charEnabled == "base"){
    game--;
  }
  if (localStorage.charEnabled == "ranger" || (localStorage.charEnabled == "assassin" && (localStorage.p1 == "6"  || localStorage.p2 == "6"))){
    game++;
  }

  pickP = 0;
  creditScreen = false;

  if (localStorage.performance == null){
    if (confirm("Would you like to stay in normal mode? Hit okay to continue or cancel to enable power saver mode (recommended for older devices)")){
      frameRate(30);
      localStorage.performance = "true";
    } else {
      frameRate(15);
      localStorage.performance = "false";
    }
  } else {
    if (localStorage.performance == "true"){
      frameRate(30);
    } else {
      frameRate(15);
    }
  }


  charCount = 0;
  storePopup = false;

  if (localStorage.highscore == null){
    localStorage.highscore = 0;
  }
  if (localStorage.credits == null){
    localStorage.credits = 100;
  }


  bulletF = 75;
  bombF = 200;
  spearF = 18;


  backgroundMusic.setVolume(.15);
  if (localStorage.sound == "true"){
    backgroundMusic.loop();
  }
  
  player.stop();
  
}

function restart(){
  //admob.destroyBannerView();
  location.reload();
}    


function draw() {

  textFont(pixelFont);
  strokeWeight(1);
  stroke(255);
  background(0);
  if (score >= 150){
    bulletF = 40;
    spearF = 7;
    bombF = 80;

  } else if (score >= 100){
    bulletF = 65;
    spearF = 10;
    bombF = 100;

  } else if (score >= 50){
    bulletF = 75;
    spearF = 13;
    bombF = 140;
  } else if (score >= 25){
    bulletF = 110;
    spearF = 25;
    bombF = 170;
  } else {
    bulletF = 90;
    spearF = 18;
  }

  //textFont(pixelFont);
  if (game>0){
    image(backgroundImage,0,0,width,height);
    //textFont(pixelFont);
    textSize(height/15);
    fill(255);
    text(score,10,height/15+1);

    for (var x = 0; x<game; x++){
      image(heart, width-(x+1)*width/20, 5, width/20, width/20);
    }
    
    
    player.show();
    player.update();

    tint(255, 120);
    image(arrowImages[0], width/5-width/26, height*.85, width/13,width/13);
    image(arrowImages[1], width/2-width/26, height*.85, width/13,width/13);
    image(arrowImages[2], width*4/5-width/26, height*.85, width/13,width/13);
    noTint();

    if (frameCount % spearF == 0){
        spears.push(new Spear());
        score++;
      }

    //Bullets
    d = new Date();
    currentTime = d.getTime();
    if (currentTime - startTime > 6000){

      if (frameCount % bulletF == 0){
        bullets.push(new Bullet());
        score++;
        score++;
      }

      for (var s = bullets.length-1; s>=0; s--){
        bullets[s].show();
        bullets[s].update();

        if (bullets[s].hit()){
          hitSound.play();
          game--;
          if (game == 0){
              localStorage.times = parseInt(localStorage.times)+1;
            }
        } 

        if (bullets[s].offscreen()){
          bullets.splice(s,1);
        }

        

       }

    }

    //Planes
    if (currentTime - startTime > 000){
      if (frameCount % bombF == 0){
        planes.push(new Plane());
        score++;
        score++;
      }
      for (var p = planes.length-1; p>=0; p--){
        planes[p].show();
        planes[p].update();

        if (planes[p].hit()){
            game--;
            if (game == 0){
              localStorage.times = parseInt(localStorage.times)+1;
            }
        }
        if (planes[p].exploSound()){
          explosionSound.play();
        }

        if (planes[p].offscreen()){
          planes.splice(p,1);
        }
      }
    }

    //Spears
    for (var s = spears.length-1; s>=0; s--){
      spears[s].show();
      spears[s].update();
      if (spears[s].hit()){
        hitSound.play();
        game--;
        if (game == 0){
              localStorage.times = parseInt(localStorage.times)+1;
            }
      }

      if (spears[s].offscreen()){
        spears.splice(s,1);
      }
    }

    //Touches
    for (var c = 0; c<touches.length; c++){
      var tX = touches[c].x;
      var tY = touches[c].y;
      if( tX < width/3){
        player.left();
      } else if ((tX < width*2/3 && tX > width/3) && ((player.y == player.ystart) ||  localStorage.charEnabled == "witch" || (localStorage.charEnabled == "assassin" && (localStorage.p1 == "2"  || localStorage.p2 == "2"))) && (player.y > width*.1)) {
        player.up();
      } else if (tX > width*2/3){
        player.right();
      }
    }


    
  } else {

    d = new Date();
    if (endTime ==0){
      endTime = d.getTime();
      localStorage.credits = parseInt(localStorage.credits) + score;
      if (localStorage.charEnabled == "golden" || (localStorage.charEnabled == "assassin" && (localStorage.p1 == "1"  || localStorage.p2 == "1"))){
        localStorage.credits = parseInt(localStorage.credits) + score;
      }
    }


    if (d.getTime() - endTime < 1000){
      image(backgroundImage,0,0,width,height);
      fill(255);
      text(score,10,height/15+1);
      player.stop();
      player.show();
      for (var s = spears.length-1; s>=0; s--){
        spears[s].show();
      }

      for (var s = bullets.length-1; s>=0; s--){
        bullets[s].show();
      }

      for (var s = planes.length-1; s>=0; s--){
        planes[s].show();
      }

    //End Game Menu
    } else if (!adShown) {
      //admob.showInterstitialAd();
      adShown = true;
    } else if (!storePopup && !creditScreen){
      /*if (bannerShow){
          admob.createBannerView({
            autoShowBanner: true
          });
          bannerShow = false;
          resizeCanvas(window.innerWidth, window.innerHeight);
        }*/

        if (localStorage.highscore < score){
          localStorage.highscore = score;
        }

        tint(255, 50);
        image(backgroundImage,0,0,width,height);
        fill(255);
        textS = height/4/1.5;
        textSize(textS);
        textAlign(CENTER);
        fill('red');
        text("GAME OVER", width/2, height/5.5);
        textSize(height/14);
        textSize(height/8);

        fill('blue');
        text("Score: " + score, width/2, height*52/100);
        textSize(height/16);
        fill('orange');
        text("Highscore: " + localStorage.highscore, width*1.2/5, height*1.62/5);
        fill('green');
        text("Credits:" + localStorage.credits, width*3.8/5, height*1.62/5);
        if (localStorage.charEnabled == "golden" || (localStorage.charEnabled == "assassin" && (localStorage.p1 == "1"  || localStorage.p2 == "1"))){
          textSize(height/33);
          text("x2 Credits Earned", width*3.8/5, height*1.62/5+height/30);
          textSize(height/14);
        }
        fill(255);

        tint(255, 200);
        image(playButton, width/2-width/15,height*11/19,width/7.5,width/7.5);
        image(shoppingImage, width*3.8/5-width/15,height*11/19,width/7.5,width/7.5);
        if (localStorage.sound == "true"){
          image(muteButton, width*1.2/5-width/15,height*11/19,width/7.5,width/7.5);
        } else {
          image(soundButton, width*1.2/5-width/15,height*11/19,width/7.5,width/7.5);
        }
        textS = height/8/4;
        textSize(textS);

        stroke(255);
        strokeWeight(3);
        fill(179,179,179);
        rect(width*1.2/5-textS*9.3,height*11/18+width/7.5-textS*1.3/2, textS*18.6, textS*3.55);
        rect(width/2-textS*3.9,height*11/18+width/7.8, textS*7.8, textS*2.84);
        stroke(1);

        fill(255);

        if (localStorage.performance == "true"){
          text("Mode: Normal",width*1.2/5,height*11/18+width/7.5+textS*1.5/2);
        } else {
          text("Mode: Power Saving",width*1.2/5,height*11/18+width/7.5+textS*1.5/2);
        }
        text("Click to Switch",width*1.2/5,height*11/18+width/7.5+textS*5/2);
        
        fill(255);
        text("Special",width/2,height*11/18+width/7.5+textS);
        text("Thanks",width/2,height*11/18+width/7.5+textS*2.15);


          if ((!charArray[1] && localStorage.credits>350) || (!charArray[2] && localStorage.credits>550) || (!charArray[3] && localStorage.credits>550)){
            fill('blue');
            text("^",width*3.8/5,height*11/18+width/7.5+textS/2);
            text("You can buy",width*3.8/5,height*11/18+width/7.5+textS*3/2);
            text("a character",width*3.8/5,height*11/18+width/7.5+textS*5/2);
          }


        noTint();


        

      //Store Popup for Character Selecton and Purchase
      } else if (storePopup && !creditScreen){
          image(backButton,width/13,height/20, width/11,width/11);
          image(playButton,width/13, height/4, width/11,width/11);   

          fill(255);
          noStroke();
          textS = height/18/1.5;
          textSize(textS);
          textAlign(CENTER);

          image(window[localStorage.charEnabled+"W"], width/3-width/26, height/15, width/13, width*.11);
          /*
          if (!playerImage.playing()){
            playerImage.play();
          }*/
          text("Current:", width/3,height/20);

          text("Base", width/2,height/20);
          image(baseW, width/2-width/26,height/15, width/13, width*.11);
          

          text("Golden Guy", width*2/3,height/20);
          image(goldenW, width*2/3-width/26,height/15, width/13, width*.11);
          

          text("Witch", width*5/6,height/20);
          image(witchW, width*5/6-width/26,height/15, width/13, width*.11);
          

          text("Skeleton", width/6, height/1.95);
          image(skeletonW, width/6-width/26,height/1.9, width/13, width*.11);

          text("Soldier", width/3, height/1.95);
          image(soldierW, width/3-width/26,height/1.9, width/13, width*.11);

          text("Sorcerer", width/2, height/1.95);
          image(sorcererW, width/2-width/26,height/1.9, width/13, width*.11);

          text("Ranger", width*2/3, height/1.95);
          image(rangerW, width*2/3-width/26,height/1.9, width/13, width*.11);

          text("Thief", width*5.3/6, height/1.95);
          if ((charArray[1] && charArray[2] && charArray[3] && charArray[4] && charArray[5] && charArray[6]) || charArray[7]){
            image(assassinW, width*5.3/6-width/26,height/1.95, width/13, width*.11);
          } else {
            textS = height/25/1.5;
            textSize(textS);
            fill('red');
            text("Own all", width*5.3/6, height/2+textS*3);
            text("characters", width*5.3/6, height/2+textS*4);
            text("to reveal", width*5.3/6, height/2+textS*5);
          }
          fill(255);

          

          textS = height/26/1.65;
          textSize(textS);
          textS++;
         //make the width/14 thing a variable
          widthThing = width/16;

          //Golden Guy
          textAlign(LEFT);
          fill('green');
          text("-Owned", width/2 - widthThing,height/15+width*.11+textS);

          if (charArray[1]){
            fill('green');
            text("-Owned", width*2/3-widthThing, height/15+width*.11+textS);
          } else if (parseInt(localStorage.credits) > 350){
            fill('green');
            text("-credits:$350", width*2/3-widthThing, height/15+width*.11+textS);
          } else {
            fill('red');
            text("-credits:$350", width*2/3-widthThing, height/15+width*.11+textS);
          }

          fill(255);
          text("-Earn double",width*2/3-widthThing, height/15+width*.11+textS*2);
          text(" credits",width*2/3-widthThing, height/15+width*.11+textS*3);
          text("-2 lives",width*2/3-widthThing, height/15+width*.11+textS*4);

          //Witch
          if (charArray[2]){
            fill('green');
            text("-Owned", width*5/6-widthThing, height/15+width*.11+textS);
          } else if (parseInt(localStorage.credits) > 550){
              fill('green');
              text("-credits:$550", width*5/6-widthThing, height/15+width*.11+textS);
          } else {
              fill('red');
              text("-credits:$550", width*5/6-widthThing, height/15+width*.11+textS);
          }
          
          fill(255);
          text("-Fly: Hold",width*5/6-widthThing, height/15+width*.11+textS*2);
          text(" up button",width*5/6-widthThing, height/15+width*.11+textS*3);
          text("-2 lives",width*5/6-widthThing, height/15+width*.11+textS*4);

          //Skeleton
          if (charArray[3]){
            fill('green');
            text("-Owned", width/6-widthThing*1.35, height/1.9+width*.11+textS);
          } else if (parseInt(localStorage.credits) > 550){
              fill('green');
              text("-credits:$550", width/6-widthThing*1.35, height/1.9+width*.11+textS);
          } else {
              fill('red');
              text("-credits:$550", width/6-widthThing*1.35, height/1.9+width*.11+textS);
          }
          
          fill(255);
          text("-Lighter: Move",width/6-widthThing*1.35, height/1.9+width*.11+textS*2);
          text(" 1.5x faster",width/6-widthThing*1.35, height/1.9+width*.11+textS*3);
          text("-2 lives",width/6-widthThing*1.35, height/1.9+width*.11+textS*4);
          

          //Soldier
          if (charArray[4]){
            fill('green');
            text("-Owned", width/3-widthThing*1.1, height/1.9+width*.11+textS);
          } else if (parseInt(localStorage.credits) > 750){
              fill('green');
              text("-credits:$750", width/3-widthThing*1.1, height/1.9+width*.11+textS);
          } else {
              fill('red');
              text("-credits:$750", width/3-widthThing*1.1, height/1.9+width*.11+textS);
          }
          
          fill(255);
          text("-Armor: Gain",width/3-widthThing*1.1, height/1.9+width*.11+textS*2);
          text(" 2 lives",width/3-widthThing*1.1, height/1.9+width*.11+textS*3);
          text("-4 lives",width/3-widthThing*1.1, height/1.9+width*.11+textS*4);

          //Sorcerer
          if (charArray[5]){
            fill('green');
            text("-Owned", width/2-widthThing*1.2, height/1.9+width*.11+textS);
          } else if (parseInt(localStorage.credits) > 1000){
              fill('green');
              text("-credits:$1000", width/2-widthThing*1.2, height/1.9+width*.11+textS);
          } else {
              fill('red');
              text("-credits:$1000", width/2-widthThing*1.2, height/1.9+width*.11+textS);
          }
          
          fill(255);
          text("-Gravity",width/2-widthThing*1.2, height/1.9+width*.11+textS*2);
          text(" control:",width/2-widthThing*1.2, height/1.9+width*.11+textS*3);
          text(" decrease all",width/2-widthThing*1.2, height/1.9+width*.11+textS*4);
          text(" gravity",width/2-widthThing*1.2, height/1.9+width*.11+textS*5);
          text("-2 lives",width/2-widthThing*1.2, height/1.9+width*.11+textS*6);

           //Ranger
          if (charArray[6]){
            fill('green');
            text("-Owned", width*2/3-widthThing*.7, height/1.9+width*.11+textS);
          } else if (parseInt(localStorage.credits) > 1000){
              fill('green');
              text("-credits:$1000", width*2/3-widthThing*.7, height/1.9+width*.11+textS);
          } else {
              fill('red');
              text("-credits:$1000", width*2/3-widthThing*.7, height/1.9+width*.11+textS);
          }
          
          fill(255);
          text("-Shield:",width*2/3-widthThing*.7, height/1.9+width*.11+textS*2);
          text(" Immunity",width*2/3-widthThing*.7, height/1.9+width*.11+textS*3);
          text(" to bombs",width*2/3-widthThing*.7, height/1.9+width*.11+textS*4);
          text(" and gain",width*2/3-widthThing*.7, height/1.9+width*.11+textS*5);
          text(" a life",width*2/3-widthThing*.7, height/1.9+width*.11+textS*6);
          text("-3 lives",width*2/3-widthThing*.7, height/1.9+width*.11+textS*7);

          if (charCount == 0){
            for (var x = 1; x < charArray.length; x++){
              if (charArray[x]){
                charCount++;
              }
            }
          }
          //Thief
          if (charArray[7]){
            fill('green');
            text("-Owned", width*5/6-widthThing*.5, height/1.9+width*.11+textS);
          } else if (parseInt(localStorage.credits) > 2500){
              fill('green');
              text("-credits:$2500", width*5/6-widthThing*.5, height/1.9+width*.11+textS);
          } else {
              fill('red');
              text("-credits:$2500", width*5/6-widthThing*.5, height/1.9+width*.11+textS);
          }
          
          fill(255);
          if (charCount >= 3){
            text("-Pick 2 powers",width*5/6-widthThing*.5, height/1.9+width*.11+textS*2);
            text(" from the other",width*5/6-widthThing*.5, height/1.9+width*.11+textS*3);
            text(" characters",width*5/6-widthThing*.5, height/1.9+width*.11+textS*4);
            text("-2 lives (base)",width*5/6-widthThing*.5, height/1.9+width*.11+textS*5);
          } else {
            var charNeeded = 3-charCount;
            text(" Buy " + charNeeded + " more",width*5/6-widthThing*.5, height/1.9+width*.11+textS*2);
            text(" characters",width*5/6-widthThing*.5, height/1.9+width*.11+textS*3);
            text(" to reveal",width*5/6-widthThing*.5, height/1.9+width*.11+textS*4);
          }


        //Credit Screen
        } else if (creditScreen){
          noStroke();
          background(0);
          image(backButton,width/13,height/20, width/11,width/11);
          image(playButton,width/13, height/4, width/11,width/11); 
          fill(255);
          textS = height/10/1.5;
          textSize(textS);
          textAlign(CENTER);
          text("Special Thanks to:",width/2,height/13+textS*3/2);
          
          //textAlign(LEFT);
          textS = height/15/1.5;
          textSize(textS);
          text('Michael J Pierce - Arrow',width/2, height/10+textS*9);
          text('daadau of opengameart - Missile ',width/2, height/10+textS*10);
          text('alekei of opengameart - Bomb Animation',width/2, height/10+textS*11);
          text('ansimuz of opengameart - Background',width/2, height/10+textS*12);
          text('mart of opengameart - Heart',width/2, height/10+textS*13);
          text('daadau of opengameart - Animated Thief',width/2, height/10+textS*14);
          text('Snabisch of opengameart - Background Music',width/2, height/10+textS*15);
          text('thejakesmith of pixabay - Plane',width/2, height/10+textS*16);
          text('gaurav.munjal.us - Character Sprites',width/2, height/10+textS*17);
        }
      }
      /*
      if (!document.hasFocus() && focus){
        focus = false;
        onBlur();
      }
      if (!focus && document.hasFocus()){
        focus = true;
        onFocus();
      }*/
    }


function touchEnded(){
  if (game>0){
    player.stop();
  }
}


function onBlur(){
  if (backgroundMusic.isPlaying()){
    backgroundMusic.pause();
  }
}

function onFocus(){
  if (localStorage.sound=="true" && !backgroundMusic.isPlaying()){
    backgroundMusic.loop();
  }
}

function mouseClicked(){
  if (storePopup && game<=0 && !creditScreen){
      if ((mouseX > width/13 && mouseX < width/13+width/11) && (mouseY > height/20 && mouseY < height/20 + width/11)){
         storePopup = false;
        } else if ((mouseX > width/13 && mouseX < width/13+width/11) && (mouseY > height/4 && mouseY < height/4 + width/11)){
         restart();
        } else if ((mouseX > width*5/12 && mouseX < width*7/12) && (mouseY < height/2)){
        if (confirm("Would you like to enable Base as your character?")){
          localStorage.charEnabled = "base";
         }

       //Golden Guy
      } else if ((mouseX > width*7/12 && mouseX < width*3/4) && (mouseY < height/2)){
        if (pickP>0){
          if (pickP==2){
            localStorage.p1 = '1';
            pickP--;
            confirm("Power 1, Double Credits Selected, pick one more");
          } else {
            localStorage.p2 = '1';
            pickP--;
            confirm("Power 2, Double Credits Selected");
          }
        } else if (charArray[1]){
           if (confirm("Would you like to enable Golden Guy as your character?")){
            localStorage.charEnabled = "golden";
            //restart();
          }
        } else if (parseInt(localStorage.credits) > 350){
           if (confirm("Would you like to purchase Golden Guy for 350 credits?")){
             localStorage.credits = parseInt(localStorage.credits) - 350;
             charArray[1] = true;
            localStorage.charPurchased = JSON.stringify(charArray);
            localStorage.charEnabled = "golden";
            //restart();
           }
         } else if (parseInt(localStorage.credits) <= 350){
             alert("Not enough credits");
         }

      //Witch
      } else if ((mouseX > width*3/4 && mouseX < width*11/12) && (mouseY < height/2)){
        if (pickP>0){
          if (pickP==2){
            localStorage.p1 = '2';
            pickP--;
            confirm("Power 1, Flying Selected, pick one more");
          } else {
            localStorage.p2 = '2';
            pickP--;
            confirm("Power 2, Double Credits Selected");
          }
        } else if (charArray[2]){
          if (confirm("Would you like to enable Witch as your character?")){
            localStorage.charEnabled = "witch";
             //restart();
           }
         } else if (parseInt(localStorage.credits) > 550){
           if (confirm("Would you like to purchase Witch for 550 credits?")){
            localStorage.credits = parseInt(localStorage.credits) - 550;
            charArray[2] = true;
             localStorage.charPurchased = JSON.stringify(charArray);
            localStorage.charEnabled = "witch";
            //restart();
           }
        } else if (parseInt(localStorage.credits) <= 550){
            alert("Not enough credits");
        }

      //Skeleton
       } else if ((mouseX > width*1/12 && mouseX < width*1/4) && (mouseY > height/2)){
         if (pickP>0){
          if (pickP==2){
            localStorage.p1 = '3';
            pickP--;
            confirm("Power 1, Speed Selected, pick one more");
          } else {
            localStorage.p2 = '3';
            pickP--;
            confirm("Power 2, Speed Selected");
          }
        } else if (charArray[3]){
          if (confirm("Would you like to enable Skeleton as your character?")){
            localStorage.charEnabled = "skeleton";
            //restart();
           }
        } else if (parseInt(localStorage.credits) > 550){
          if (confirm("Would you like to purchase Skeleton for 1000 credits?")){
            localStorage.credits = parseInt(localStorage.credits) - 550;
             charArray[3] = true;
             localStorage.charPurchased = JSON.stringify(charArray);
            localStorage.charEnabled = "skeleton";
            //restart();
             }
         } else if (parseInt(localStorage.credits) <= 550){
            alert("Not enough credits");
         }

      //Soldier
       } else if ((mouseX > width*1/4 && mouseX < width*5/12) && (mouseY > height/2)){
         if (pickP>0){
          if (pickP==2){
            localStorage.p1 = '4';
            pickP--;
            confirm("Power 1, Extra Lives Selected, pick one more");
          } else {
            localStorage.p2 = '4';
            pickP--;
            confirm("Power 2, Extra Lives Selected");
          }
        } else if (charArray[4]){
          if (confirm("Would you like to enable Soldier as your character?")){
            localStorage.charEnabled = "soldier";
            //restart();
           }
        } else if (parseInt(localStorage.credits) > 750){
          if (confirm("Would you like to purchase Soldier for 750 credits?")){
            localStorage.credits = parseInt(localStorage.credits) - 750;
             charArray[4] = true;
             localStorage.charPurchased = JSON.stringify(charArray);
            localStorage.charEnabled = "soldier";
            //restart();
             }
         } else if (parseInt(localStorage.credits) <= 750){
            alert("Not enough credits");
         }

       //Sorcerer
       } else if ((mouseX > width*5/12 && mouseX < width*7/12) && (mouseY > height/2)){
         if (pickP>0){
          if (pickP==2){
            localStorage.p1 = '5';
            pickP--;
            confirm("Power 1, Gravity Control Selected, pick one more");
          } else {
            localStorage.p2 = '5';
            pickP--;
            confirm("Power 2, Gravity Control Selected");
          }
        } else if (charArray[5]){
          if (confirm("Would you like to enable Sorcerer as your character?")){
            localStorage.charEnabled = "sorcerer";
            //restart();
           }
        } else if (parseInt(localStorage.credits) > 1000){
          if (confirm("Would you like to purchase Sorcerer for 750 credits?")){
            localStorage.credits = parseInt(localStorage.credits) - 1000;
             charArray[5] = true;
             localStorage.charPurchased = JSON.stringify(charArray);
            localStorage.charEnabled = "sorcerer";
            //restart();
             }
         } else if (parseInt(localStorage.credits) <= 1000){
            alert("Not enough credits");
         }

       //Ranger
       } else if ((mouseX > width*7/12 && mouseX < width*3/4) && (mouseY > height/2)){
         if (pickP>0){
          if (pickP==2){
            localStorage.p1 = '6';
            pickP--;
            confirm("Power 1, Shield Selected, pick one more");
          } else {
            localStorage.p2 = '6';
            pickP--;
            confirm("Power 2, Shield Selected");
          }
        } else if (charArray[6]){
          if (confirm("Would you like to enable Ranger as your character?")){
            localStorage.charEnabled = "ranger";
            //restart();
           }
        } else if (parseInt(localStorage.credits) > 1000){
          if (confirm("Would you like to purchase Ranger for 1000 credits?")){
            localStorage.credits = parseInt(localStorage.credits) - 1000;
             charArray[6] = true;
             localStorage.charPurchased = JSON.stringify(charArray);
            localStorage.charEnabled = "ranger";
            //restart();
             }
         } else if (parseInt(localStorage.credits) <= 1000){
            alert("Not enough credits");
         }

      //Thief
       } else if ((mouseX > width*3.1/4 && mouseX < width*11.3/12) && (mouseY > height/2)){
         if (charArray[7]){
          if (confirm("Would you like to enable Thief as your character?")){
            pickP = 2;
            localStorage.charEnabled = "assassin";
            confirm("Tap 2 characters to pick your powers");
            //restart();
           }
        } else if (!(charArray[1] && charArray[2] && charArray[3] && charArray[4] && charArray[5] && charArray[6])){
          alert("Need to own all characters to purchase");

        } else if (parseInt(localStorage.credits) > 2500){
          if (confirm("Would you like to purchase Thief for 2500 credits?")){
            localStorage.credits = parseInt(localStorage.credits) - 2500;
             charArray[7] = true;
             localStorage.charPurchased = JSON.stringify(charArray);
            localStorage.charEnabled = "assassin";
            pickP = 2;
            localStorage.p1 = '1';
            localStorage.p2 = '2';
            confirm("Tap 2 characters to pick your powers");
            //restart();
             }
         } else if (parseInt(localStorage.credits) <= 2500){
            alert("Not enough credits");
         } 

       }

  } else if (game<=0 && !creditScreen){
          if ((mouseX > width*1.2/5-width/15 && mouseX < width*1.2/5+width/15) && (mouseY > height*11/19 && mouseY < height*11/19 + width/7.5)){
            if (localStorage.sound == "true"){
            localStorage.sound = "false";
            backgroundMusic.pause();
            } else {
              if (!backgroundMusic.isPlaying()){
                 backgroundMusic.loop();
              }
              localStorage.sound = "true";
            }
          } else if ((mouseX > width*3.8/5-width/15 && mouseX < width*3.8/5+width/15) && (mouseY > height*11/19 && mouseY < height*11/19 + width/7.5)){
            storePopup = true;
          } else if ((mouseX > width/2 - width/7.5 && mouseX < width/2+width/7.5) && (mouseY > height*11/19 && mouseY < height*11/19 + width/7.5)){
            restart();
          } else if ((mouseX > width/2 - height*3.5/28 && mouseX < width/2 + height*3.5/28) && (mouseY > height*11/18+width/7.5-textS/2)){
            creditScreen = true;
          } else if ((mouseX > width*1.2/5 - height*8/28 && mouseX < width*1.2/5 + height*8/28) && (mouseY > height*11/18+width/7.5-textS/2)){
            if (localStorage.performance == "true"){
              if (confirm("Would you like to switch to power savings mode? (recommented for older devices)")){
                frameRate(15);
                localStorage.performance = "false";
              }
            } else {
              if (confirm("Would you like to switch to normal mode?")){
                frameRate(30);
                localStorage.performance = "true";
              }
            }
          }
        }
  if (creditScreen){
     if ((mouseX > width/13 && mouseX < width/13+width/11) && (mouseY > height/20 && mouseY < height/20 + width/11)){
         creditScreen = false;
        } else if ((mouseX > width/13 && mouseX < width/13+width/11) && (mouseY > height/4 && mouseY < height/4 + width/11)){
         restart();
        }
  }
}