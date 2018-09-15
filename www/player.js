
function Player(){
	this.w = width/13;
	this.h = width*.11;
	
	this.ystart = height/1.55;
	this.y = this.ystart;
	this.idle = false;
	this.x = width/2-this.w/2;
	this.velocity = 0;
	this.yvelocity = 0;
	if (localStorage.charEnabled !="sorcerer" || !(localStorage.charEnabled == "assassin" && (localStorage.p1 == "5"  || localStorage.p2 == "5"))){
		this.gravity = width*1.8/1225;
	} else {
		this.gravity = width*3*2/4900;
	}

	if (localStorage.performance=="false"){
		this.gravity *=2;
	}

	this.facing = true;
	this.frameStop = 0;
	if (localStorage.charEnabled =="base"){
		this.frameStop = 7;
	}
	

	this.show = function(){
		if (this.idle){
			image(playerIdle,this.x,this.y,this.w, this.h);
		} else if (this.facing){
			image(playerImage,this.x,this.y,this.w, this.h);
		} else { 
			image(playerImage2,this.x,this.y,this.w, this.h);
		}
	}
	this.update = function(){
		this.x += this.velocity;

		if (this.x <= 0){
			this.x = 0;
		}

		if (this.x >= width -70){
			this.x = width -70;
		}

		if (this.yvelocity > 0){
			this.yvelocity -= this.gravity;
			this.y -= this.yvelocity;
		} else if (this.y <= 0){
			this.y = 1;
		} else if (this.y >= this.ystart){
			this.y = this.ystart;
		} else {
			this.yvelocity -= this.gravity;
			this.y -= this.yvelocity;
		}

		if (!explosionSound.isPlaying() && this.explosionH){
          explosionSound.play();
        }
	}
	this.left = function(){
		this.idle = false;
		if (!(localStorage.charEnabled == "skeleton") && !(localStorage.charEnabled == "assassin" && (localStorage.p1 == "3"  || localStorage.p2 == "3"))){
			this.velocity = -width*1.8/327;
		} else{
			this.velocity = -width*1.8/218;
		}

		if (localStorage.performance=="false"){
		this.velocity *=2;
		}

		this.facing = false;
		if (!playerImage2.playing()){
			playerImage2.play();
		}
		if (playerImage.playing()){
			playerImage.pause();
		}
	}
	this.right = function(){
		this.idle = false;
		if (!(localStorage.charEnabled == "skeleton") && !(localStorage.charEnabled == "assassin" && (localStorage.p1 == "3"  || localStorage.p2 == "3"))){
			this.velocity = width*1.5/327;
		} else{
			this.velocity = width*1.5/218;
		}
		this.facing = true;

		if (localStorage.performance=="false"){
		this.velocity *=2;
		}

		if (!playerImage.playing()){
			playerImage.play();
		}
		if (playerImage2.playing()){
			playerImage2.pause();
		}
	}
	this.up = function(){
		if (localStorage.charEnabled != "witch" && !(localStorage.charEnabled == "assassin" && (localStorage.p1 == "2"  || localStorage.p2 == "2"))){
			this.yvelocity = width*1.3/65;
		} else {
			this.yvelocity = width*1.3/100;
		}

		if (localStorage.performance=="false"){
			this.yvelocity *= 1.38;
		}
	}
	this.stop = function(){
		if (playerImage.loaded() && playerImage2.loaded() && localStorage.charEnabled != "assassin"){
			if (this.facing){
				playerImage.pause();
				playerImage.frame(this.frameStop);
			} else {
				playerImage2.pause();
				playerImage2.frame(this.frameStop);
			}
		} else if (localStorage.charEnabled == "assassin"){
			this.idle = true;
		}
		this.velocity = 0;
	}



}