video="";
status="";
objects=[];
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas=createCanvas(400,400);
    canvas.position(500,200);
}
function draw(){
    image(video,0,0,400,400);
    r=random(255);
    g=random(255);
    b=random(255);
    if(status !=""){
        object_detector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Objects Detected";
            document.getElementById("objects_detected").innerHTML="Objects Detected: "+objects.length;
            fill(r,g,b)
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x-20,objects[i].y-20,objects[i].width,objects[i].height);
        }
 
    }
}
function start(){
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}
