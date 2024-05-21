function IsTouching(ax,ay,aw,ah, bx,by,bw,bh){
	a_l = ax	 ;
	a_r = ax + aw;
	a_b = ay	 ;
	a_t = ay + ah;
	b_l = bx	 ;
	b_r = bx + bw;
	b_b = by	 ;
	b_t = by + bh;
	if (a_l >= b_r || a_r <= b_l || a_t <= b_b || a_b >= b_t) return false;
	return true;
}
function ObjTouching(obj1, obj2){
    return IsTouching(obj1.x, obj1.y, obj1.w, obj1.h, obj2.x, obj2.y, obj2.w, obj2.h);
}

function ImageLoad(path){
    let a = new Image();
    a.src = path;
    return a;
}

class Object {
	constructor(x, y, width, height, color = "black") {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color
	}
	get w() {
		return this.width;
	}
	set w(value) {
		this.width = value;
	}
	get h() {
		return this.height;
	}
	set h(value) {
		this.height = value;
	}
	get pos() {
		return Array(this.x, this.y)
	}
	set pos(value) {
		this.x = value[0];
		this.y = value[1];
	}
    CollisionAdd(CollisionList){
        CollisionList.push({x: this.x, y: this.y, w: this.w, h: this.h})
    }
	Render(ctx) {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x, this.y, this.w, this.h)
	}
}

class ImageObject extends Object{
    constructor(x, y, width, height, img){
        super(x, y, width, height)
        this.SetImage(img);
    }
    Render(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    SetImageByName(img){
        this.img = new Image();
        this.img.src=img
    }
    SetImageByObject(img){
        this.img = img
    }
    SetImage(img){
        if (typeof(img) == "string") return this.SetImageByName(img)
        return this.SetImageByObject(img)
    }
}

class PlayerObject extends ImageObject{
    constructor(x,y,w,h,img){
        super(x,y,w,h,img);
        this.BPos = {x: 0, y: 0}
        this.Speed = 100;
        this.AnimationFrame = 0;
        this.Direction = Direction.s;
        this.weapon = "0"
        this.ammunition = "0"
    }
}

function Clamp(num, min, max) {
	return num < min ? min : num > max ? max : num;
}

export {Object, IsTouching, ObjTouching, ImageLoad, ImageObject, Clamp, PlayerObject};