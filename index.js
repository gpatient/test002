
/**
 * @name test002
 * 
 * 
 * @license mit

 */

 import dbg from 'debug';
 dbg('aa')("asdf="+Math.random()+"time="+(new Date()).getMilliseconds());

var clsOne=function(){
function latch2(measher){
    if (!(this instanceof latch2)) return new latch2(measher);
  
  this.chk=0;
  this.measher=measher;
  this.val=0;
  this.cnt=0;
}

latch2.prototype.run=function (t,val){
    var ret=0;
    if((Math.round(t*1000)%(this.measher*10))<10){if(this.chk===0){this.val=val;this.cnt++;}this.chk=1;}
    else{this.chk=0;}
    ret=this.val;
    return ret;
  };
  var lat1= latch2(10);
  var lat2= latch2(100);
//var lat2=latch2(36);

this.main=function (t) {
  var snd,freq=440,vol,env;
  //freq=lat1.run(t, (Math.random()*400+100));
  freq=lat1.run(t, (lat1.cnt%10+2)*50);
  vol=lat2.run(t, (Math.random()*0.5+0.05));
  vol=0.7;
  env=Math.cos(t* Math.PI * 2*1)*Math.cos(t*Math.PI*2*0.5)*Math.cos(t*Math.PI*0.25);
  env=env*env;
  env=1;
  env=Math.sin(t* Math.PI * 10);
  env=env*env;
  snd=Math.sin(t * Math.PI * 2 *freq)*env*vol;
  return [snd,snd];
}
}
clsOne.prototype.run=function(t){
  return this.main(t);
}
var soundOne=new clsOne();
//////////////////////////////////////////////////////////////////////////////
var clsTwo=function(){
var m_aa=new FastLP3(400);var fastlp_a =function(x){return m_aa.run(x)};
var m_bb=new FastLP3(35);var fastlp_b =function(x){return m_bb.run(x)};

function FastLP3(n){
  this.n=n;
  
  this.val=0;
}
FastLP3.prototype.run=function(x)
{

  this.val += (x - this.val) / this.n;
  return this.val;
//    this.zval=this.value;
//  this.value=x;
//  return (x+this.zval)/2;
}
function noise(){
  return Math.random() * 2 - 1;
}

function sin(x, t){
  return Math.sin(2 * Math.PI * t * x);
}

function saw(x, t){
  return 1-2 * (t % (1/x)) * x;
}
function note(n, octave){
  return Math.pow(
    2,
    (n + 0 - 33 + (12 * (octave || 0))) / 12
  ) * 440; // A4 tune
}
function perc(wave, decay, o, t){
  var env = Math.max(0, 0.95 - (o * decay) / ((o * decay) + 1));
  return wave * env;
}

var millis=(new Date()).getMilliseconds();
for(var i=0;i<millis%100;i++)Math.random();

var kickbit = [ 0.99, 0.00, 0.99, 0.99, 0.00, 0.00];//, 0.99, 0.00 ,0.99,0.00,0.99,0.00 ];
var snarebit = [ 0.99, 0.00, 0.99, 0.99, 0.00, 0.00];//, 0.99, 0.00 ,0.99,0.00,0.99,0.00 ];

function bitset(){
var i;

for( i=0;i<kickbit.length;i++){
   kickbit[i]=Math.floor(Math.random()+0.3);
   //kickbit[i]=Math.random();
}
for( i=0;i<snarebit.length;i++){
    snarebit[i]=Math.floor(Math.random()+0.5);
   //kickbit[i]=Math.random();
}
//for(i=0;i<6;i++){snarebit.push(0);kickbit.push(0)}  
//kickbit[0]=3;
dbg('kickbit_')(kickbit);
dbg('snarebit')(snarebit);
}
bitset();
dbg('kickbit_')(kickbit);
dbg('snarebit')(snarebit);
var tempo=3.51368;
var m_chk=0;
this.main=function(t) { // drums
  
  if(Math.floor(t * tempo) % (kickbit.length*10) ==0){if(m_chk==0){m_chk=1;dbg(' ')('dddd');bitset();}}
  else m_chk=0;
  var vol=kickbit[Math.floor(t * tempo) % kickbit.length];
  //vol=0;
  var kick_osc = (
    saw(note(6,-1), t) * 0.24
  + sin(note(6,-1), t)
  )*vol;
  var kick =
    //saw(tempo, t) * 0.098*vol+ // click
  fastlp_a( // vcf
      perc(kick_osc, 78, (t) % (1/tempo)*tempo, t)
    ) * 3
  ;
  vol=snarebit[Math.floor(t * tempo) % snarebit.length];
  var snare_osc =
    sin(note(9, 0), t) * 0.1
  + noise() * 0.7
  ;
  snare_osc*=vol;
  var snare = // vcf
    fastlp_b(perc(snare_osc, 80 , (t + 1/tempo)*tempo % (1), t))
  ;

  var snd=snare+kick;
  //if(t>0.0001)kick=kick*kickbit[Math.floor(t * tempo- 0.0001) % kickbit.length];     
  return snd;
}
  
}

clsTwo.prototype.run=function(t){
  return this.main(t);
}
var soundTwo=new clsTwo();

export function dsp(t) {
  return soundTwo.run(t);
}