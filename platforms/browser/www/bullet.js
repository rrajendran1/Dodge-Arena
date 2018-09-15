function Bullet(){
	this.w = width/17;
	this.h = width/24;
	this.facing = random(100) > 50;
	this.hitOnce = false;
	if (this.facing){
		this.x = -10;
		this.velocity = this.w*1.7/6.25;
	} else {
		this.x = width+10;
		this.velocity = -this.w*1.7/6.25;
	}
	
	if (localStorage.performance=="false"){
		this.velocity *=2;
	}
	this.y = random(player.h/2) + player.ystart + this.h/1.5;
	



	this.show = function(){
		fill(0);
		if (this.facing){
			image(bulletImage,this.x,this.y, this.w, this.h);
		} else {
			image(bulletImage2,this.x,this.y, this.w, this.h);
		}
	}

	this.update = function(){
			this.x += this.velocity;
	}

	this.offscreen = function(){
		return this.x > width+this.w || this.x < -this.w;
	}

	this.hit = function(){
		if ((player.y < this.y + this.h/3 && player.y + this.w*1.56 > this.y) && !this.hitOnce){
			if (player.x + this.h < this.x + this.w && player.x + this.h > this.x){
				this.hitOnce = true;
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}

	}


}