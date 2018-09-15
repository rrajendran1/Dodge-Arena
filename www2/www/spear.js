function Spear(){

	this.w = width/36;
	this.h = width/18;
	this.hitOnce = false;

	this.x = random(width-this.w);
	this.y = -this.h;
	this.velocity = 0;
	if (localStorage.charEnabled != "sorcerer" && !(localStorage.charEnabled == "assassin" && (localStorage.p1 == "3"  || localStorage.p2 == "3"))){
		this.gravity = width*1.8/1700;
	} else {
		this.gravity = width*1.8/2268;
	}

	if (localStorage.performance=="false"){
		this.gravity *=2;
	}
	

	this.show = function(){
		fill(0);
		//if (!this.hitOnce){
			image(spear,this.x,this.y,this.w, this.h);
		//}
	}

	this.update = function(){
		this.velocity += this.gravity;
		this.y += this.velocity;
	}

	this.offscreen = function(){
		return this.y > height;
	}

	this.hit = function(){
		if ((player.y < this.y + this.h /2 && player.y + player.h > this.y) && !this.hitOnce){
			if (player.x + this.w-5 < this.x + this.w && player.x + this.w*2 > this.x ){
				this.hitOnce = true;
				return true;
			} else{
				return false;
			}
		} else {
			return false;
		}

	}


}