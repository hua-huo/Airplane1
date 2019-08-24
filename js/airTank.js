var mainSize = document.getElementById("mainSize");
var bg1 = document.getElementById("bg1");
var bg2 = document.getElementById("bg2");
var ado = document.getElementById("ado");


//让背景动起来
var timeBg = setInterval(function(){
	bg1.style.top = bg1.offsetTop + 1 + "px";
	bg2.style.top = bg2.offsetTop + 1 + "px";
	if(bg1.offsetTop >= 583){
		bg1.style.top = "-583px";
	}else if(bg2.offsetTop >= 583){
		bg2.style.top = "-583px";
	}
},10)

//开始游戏
var start = document.getElementById("start");
start.onclick = function(){
	mainSize.removeChild(start);
	ado.play();//播放音乐

//让飞机具有拖拽效果
var air = document.getElementById("airplane");
air.onmousedown = function(e){
	evt = e || window.event;
	baseX = evt.pageX;
	baseY = evt.pageY;
	moveX = 0;
	moveY = 0;
	mainSize.onmousemove = function(e){
		ev = e || window.event;
		moveX = ev.pageX - baseX;
		moveY = ev.pageY - baseY;
		baseX = ev.pageX;
		baseY = ev.pageY;
		air.style.left = air.offsetLeft + moveX + "px";
		air.style.top = air.offsetTop + moveY + "px";
	}
}

//鼠标离开飞机
// air.addEventListener("mouseup",function(){
// 	mainSize.onmousemove = null;
// 	air.style.left = "170px";
// 	air.style.top = "480px";
// },false)

//产生子弹
var timeBullet = setInterval(function(){
	var Bullet = document.createElement("div");
	Bullet.className = "bullet";
	mainSize.appendChild(Bullet);
	Bullet.style.left = air.offsetLeft + 22 +"px";
	Bullet.style.top = air.offsetTop - 15 +"px";
	
	//让子弹飞
	var timeBulletFly = setInterval(function(){
		Bullet.style.top = Bullet.offsetTop - 10 +"px";
		if(Bullet.offsetTop<=10){
			clearInterval(timeBulletFly);
			mainSize.removeChild(Bullet);
		}
	},20)
	Bullet.timer = timeBulletFly;
	
},300)

//产生坦克
var timeTank = setInterval(function(){
	var Tank = document.createElement("div");
	Tank.className = "tank";
	Tank.id = "tank" + randomNum(1,5);
	mainSize.appendChild(Tank);
	Tank.style.left = randomNum(0,385) +"px";
	Tank.style.top = 0;
	
	//让坦克飞
	var timeTankFly = setInterval(function(){
		Tank.style.top = Tank.offsetTop + 1 +"px";
		if(Tank.offsetTop>=583){
			clearInterval(timeTankFly);
			mainSize.removeChild(Tank);
		}
	},10)
	Tank.timer = timeTankFly;
},1000)

//碰撞检测（把不碰撞的情况选出来）
function collisionDete(Tank,Bullet){
	if(Tank.offsetTop > (Bullet.offsetTop + 20)  || Bullet.offsetTop > (Tank.offsetTop + 30) || Tank.offsetLeft > (Bullet.offsetLeft + 15) || Bullet.offsetLeft > 
	(Tank.offsetLeft + 30)){
		return false;
	}else{
		return true;
	}
}

//子弹碰坦克
var mark = 0;//分数
var timeBulletTank = setInterval(function(){
	var bullets = document.getElementsByClassName("bullet");
	var tanks = document.getElementsByClassName("tank");
	for(var i=0;i<bullets.length;i++){
		for(var j=0;j<tanks.length;j++){
			var b = bullets[i];
			var t = tanks[j];
			if(collisionDete(t,b)){
				mark++;
				clearInterval(b.timer);
				clearInterval(t.timer);
				mainSize.removeChild(t);
				mainSize.removeChild(b);
				break;
			}
		}
		
	}
},100)

//死亡检测
var timeAirTank = setInterval(function(){
	var tanks = document.getElementsByClassName("tank");
	for(var i=0;i<tanks.length;i++){
			var t = tanks[i];
			if(collisionDete(t,air)){
				for(var j=1;j<1000;j++){
					clearInterval(j);
					mainSize.onmousemove = null;
					air.onmousedown = null;
				}
				var gameover = document.createElement("div");
				gameover.innerHTML = "最终得分&nbsp" + mark * 10;
				gameover.id = "start";
				mainSize.appendChild(gameover);
				gameover.onclick = function(){
					location.reload();
				}
				break;
			}
	}
	
},100)

}