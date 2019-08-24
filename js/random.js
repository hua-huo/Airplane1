//产生随机数
//Math.random()产生的随机数都是小数（0-1）
function randomNum(min,max){
	return parseInt(Math.random() * (max - min) + min);
}

//随机图片
function randomPic(){
	var Star = ["moon","mars","uranus","jupiter","asteroid"];
	return Star[randomNum(0,4)];
}