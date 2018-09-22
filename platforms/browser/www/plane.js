function Plane(){
	this.h = width/15;
	this.w = width*.09566;
	this.sound = true;
	
	this.y = width/25;
	this.facing = random(100) > 50;
	if (this.facing){
		this.x = -this.w;
	} else {
		this.x = width+this.w;
	}

	this.bomb = false;
	this.explosionH = false;
	this.explosionF = 0;
	this.bombY = this.y+this.h/2;
	this.bombX = 0;
	this.bombH = width/10;
	this.bombW = width/10;
	this.exploS = true;

	this.bombG = width*1.5/2600;
	if (localStorage.charEnabled == "sorcerer" || (localStorage.charEnabled == "assassin" && (localStorage.p1 == "5"  || localStorage.p2 == "5"))){
		this.bombG = width/2600;
	}
	if (localStorage.performance=="false"){
		this.bombG *=2;
	}
	this.bombV = 0;
	this.hitH = false;
	//explosion.pause();
	//explosion.frame(0);


	if (this.facing){
		this.velocity = width/120;
		this.bombStart = random(width/2);
	} else {
		this.velocity = -width/120;
		this.bombStart = width/2+ random(width/2);
	}
	if (localStorage.performance=="false"){
		this.velocity *=2;
	}

	

	this.show = function(){
		if (this.facing){
			image(planeImage,this.x,this.y,this.w, this.h);
		} else {
			image(planeImage2,this.x,this.y,this.w, this.h);
		}
		if (this.bomb && (this.bombY < height/1.55 + width*.04)){
			image(bombImage,this.bombX,this.bombY,this.bombW, this.bombH);
		} else if (this.bomb){
			if (this.explosionF < 9){
			if (this.explosionF > 3 && this.explosionF < 6){
				this.explosionH = true;
			} else {
				this.explosionH = false;
			}
			
			//explosion.frame(this.explosionF);
			image(explosion,this.bombX,height/1.55 + width*.04,this.bombW, this.bombH);
			if (frameCount%3 == 0){
			this.explosionF++;
			}

			} else {
				this.explosionH = false;
			}	
		}

	}
	this.update = function(){
		this.x += this.velocity;
		if ((this.facing && this.bombStart < this.x) || (!this.facing && this.bombStart > this.x)){
			this.bomb=true;
		}
		if (this.bomb){
			if (this.facing && this.bombY < height/1.55+width*.04){
				this.bombX = this.x+this.w/2;
			} else if (this.bombY < height/1.55+width*.04){
				this.bombX = this.x-this.w/2;
			}

			this.bombV += this.bombG;
			this.bombY += this.bombV;
		}

		if (this.explosionH && this.sound){
			this.sound = false;
			//explosionSound.play();
		}

	}

	this.offscreen = function(){
		return this.x > width*1.2 || this.x < -this.w*1.2;
	}
	
	this.hit = function(){
		//if (this.explosionH && !this.hit && player.x < this.bombX+this.bombW && player.x+player.w > this.bombX && localStorage.charEnabled != "ranger"){
		if (localStorage.charEnabled != "ranger" && !(localStorage.charEnabled == "assassin" && (localStorage.p1 == "6"  || localStorage.p2 == "6"))){
			if (!this.hitH && this.explosionH && player.x < this.bombX+this.bombW*.6 && player.x+player.w*.6 > this.bombX){
				if (player.y > player.ystart - this.bombH*.26){
					this.hitH = true;
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	this.exploSound = function(){
		if (this.explosionH && this.exploS){
			this.exploS = false;
			return true;
		} else {
			return false;
		}
	}

}