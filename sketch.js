var amp_hist;
var amp;
var song;
var song_input
var start_col;

function preload(){
	song = loadSound("CandyWalls.mp3");
}

function setup(){
	createCanvas(1600, 900);
	colorMode(HSB, 255);
	background(0);

	song_input = createFileInput(handle_file);
	song_input.position(0, 0);

	amp = new p5.Amplitude();
	amp.setInput(song);
	amp_hist = [];
	for(let i = 0; i < 360; i++){
		amp_hist[i] = 0.2;
	}

	start_col = random(255);
}

function draw(){
	if(song.isPlaying()){
		amp_hist.push(amp.getLevel());
		if(amp_hist.length > 360){
			amp_hist.splice(0, 1);
		}

		noFill();
		stroke((map(amp.getLevel(), 0, 0.6, 0, 255) + start_col)%255, 255*(7/10), 255);
		beginShape();
		for(let i = 0; i < 360; i++){
			if(amp_hist.length <= i){
				break;
			}
			let dist = 300;
			vertex(cos(radians(i))*amp_hist[i]*dist + mouseX, sin(radians(i))*amp_hist[i]*dist + mouseY);
		}
		endShape();
	}
	console.log(amp.getLevel());
}

function handle_file(file){
		song = loadSound(file.data);
}

function keyPressed(){
	if(key === ' '){
		if(song.isPlaying()){
			song.pause();
		}
		else{
			amp = new p5.Amplitude();
			amp.setInput(song);
			song.play();
		}
	}
	if(key === 'c'){
		background(0);
	}
}
