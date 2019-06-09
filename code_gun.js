var bullets = ["let", "const", "var", "{", ",", '"', "'", ";", "]", "[", "}", "(", ")", "if", "while", "for", "break", "continue", "switch", "*", "/", "//", "/*", "*/", "<", ">", ":", "&&", "||", "!=", "=", "==", "+", "!", "-", "%", "undefined", "NaN", "infinity", "false", "true", "defined"];
var isMouseDown = false;
var isEnteredMousedownForFirstTime = true;
var current_bullet_index;

call_my_update();

function call_my_update() {
    my_update();
    setTimeout(call_my_update, 10);
}
function my_update(){
	/*if(isMouseDown){
		if(isEnteredMousedownForFirstTime){
			current_bullet_index = projectiles.length;
			projectiles.push(new Code_bullet(weapons[1].x, weapons[1].y, weapons[1].x + Math.cos(weapons[1].angle), weapons[1].y + Math.sin(weapons[1].angle), weapons[1].held_by, bullets[Math.round(Math.random()*bullets.length)]));
			isEnteredMousedownForFirstTime = false;
		}else{
			projectiles[current_bullet_index].current_bullet += bullets[Math.round(Math.random()*bullets.length)];
		}
	}*/
}
class Code_bullet extends Projectile{
    constructor(x, y, tx, ty, who, current_bullet){
        super(x, y, tx, ty, who);
        let dist = d(x, y, tx, ty);
        this.speed = 3;
        this.dx = (tx-x)/dist*this.speed;
        this.dy = (ty-y)/dist*this.speed;
        this.angle = Math.atan2(ty-y, tx-x);
        this.current_bullet = current_bullet;
    }
    update(){
        this.x += this.dx;
        this.y += this.dy;
        this.angle = Math.atan2(this.ty-this.y, this.tx-this.x);
    }
	draw(){
		context.save();
	    context.translate(this.x, this.y);
	    context.rotate(this.angle+Math.PI);
		context.font = "15pt Arial";
        context.fillText(this.current_bullet, 0, 0);
        context.restore();
	}
}
class Code_gun extends Weapon{
	shoot(){
		if (this.curr_reload <= 0){
            projectiles.push(new Code_bullet(this.x, this.y, this.x + Math.cos(this.angle), this.y + Math.sin(this.angle), this.held_by, bullets[Math.round(Math.random()*bullets.length)]));
            this.curr_reload = this.reload_time;
        }
    }
}

weapons.push(new Code_gun(500, 500));

window.addEventListener("contextmenu", function(e){
	e.returnValue = false;
});
window.addEventListener("mousedown", function (e) {
    my_mousedown();
});
window.addEventListener("mouseup", function (e) {
    my_mouseup();
});
function my_mousedown(){
	isMouseDown = true;
}
function my_mouseup(){
	isMouseDown = false;
	isEnteredMousedownForFirstTime = true;
	current_bullet_index = undefined;
}