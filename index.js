
/**
 * @name test002
 * 
 * 
 * @license mit

 */

 import dbg from 'debug';
 import QBiquad from 'opendsp/biquad';
 
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
var m_memTime=0;
var m_wwT=8;

var m_melody=[0,3,5,7,10,12,15,12,24,24,24,24,
              0,3,5,7,10,12,15,12,24,24,24,24];//
              //0,3,5,7,10,12,15,12,24,24,24,24];
// 0 2 4 7  9  12
// 2 4 7 9  12 14
// 4 7 9 12 14 16
// 7 9 12 14 16 19
//-3 0 2 4  7  9

function generativeMelody()
{
  var lls=[[0, 2, 4, 7 , 9,  12],
 [2, 4, 7, 9,  12, 14],
 [4, 7, 9, 12, 14, 16],
 [7, 9, 12, 14, 16, 19],
 [-3, 0, 2, 4,  7,  9]
];
  var len=m_melody.length-Math.floor(Math.random()*5)-1;
  var list=   [3  ,5  ,7  ,10  ,0,  0  , 0];
  var listran=[0.5,0.3,0.1,0.25,0.3,0.9,1.3];
  var sum,cho,i,j,sum2,trans=0;
  list=lls[Math.floor(Math.random()*5)];
  
  trans=Math.floor(Math.random()*12);
   for( i=0;i<list.length;i++){list[i]+=trans;};
  list.push(24);
   for( i=0;i<m_melody.length;i++){m_melody[i]=24;};
   
  sum=0;
  for( i=0;i<listran.length;i++){sum+=listran[i];};
  
  dbg('list')("list="+list+" sum="+sum);
  for( i=1;i<len;i++){
    cho=Math.random()*sum;
    sum2=0;
    for(j=0;j<listran.length;j++){sum2+=listran[j];if(sum2>cho)break;}
    //dbg('j')("i="+i+" j="+j+" m="+list[j]);
   
    m_melody[i]=list[j];
   
  }
  m_melody[0]=list[0];
  m_melody[i]=list[5];
  
  dbg('m_melody')("m_melody="+m_melody);
}
//////////////////////////////////////////////////////////

var vcf =[];
var i=0;
for(i=0;i<5;i++){
  vcf[i]=new QBiquad('bpf');
  vcf[i].cut(700) .res(15).gain(3).update();  
}

function filterBank(snd,fn,mm)
{


  
  var out=0;
  var oo=[];
  // vowel a
  var ff=[650, 1080, 2650, 2900, 3250];
  var am=[ 1, 0.50118723362727, 0.44668359215096, 0.3981071705535, 0.079432823472428 ];
  var bw=[ 10, 12.777777777778, 24.166666666667, 30, 35.357142857143 ];
  if(fn==1){//vowel i
    ff=[290, 1870, 2800, 3250, 3540];
    am=[ 1, 0.17782794100389, 0.12589254117942, 0.1, 0.031622776601684 ];
    bw=[ 7.25, 20.777777777778, 28, 27.083333333333, 29.5 ];
  }
  else if(fn==2){// vowel e
    ff=[400, 1700, 2600, 3200, 3580];
    am=[ 1, 0.19952623149689, 0.25118864315096, 0.19952623149689, 0.1 ];
    bw=[ 5.7142857142857, 21.25, 26, 26.666666666667, 29.833333333333 ];
  
  }
  //q= cut/bw  res
  for(i=0;i<5;i++){
    vcf[i].cut(ff[i]+mm).res(bw[i]*(mm/100+1)).update();
    oo[i] = vcf[i].update().run(snd)*am[i];
    out+=oo[i];
    
  }
  return out*3;
  
}
var m_aaS1=2,m_aaS2=6,m_aaS3=0; //1~4 1~8 0~2
m_aaS1=tempo=Math.floor(Math.random()*4)+1;
m_aaS2=tempo=Math.floor(Math.random()*8)+1;
m_aaS3=tempo=Math.floor(Math.random()*2)+0;
function aaSnd(freq,t){
  var snd;
  var cc=Math.sin(t*Math.PI*2*(freq/m_aaS1))*(m_aaS2);
  snd=Math.sin(t*Math.PI*2*freq+cc  );
  snd*=2.25;
  snd=filterBank(snd,m_aaS3,0);
  return snd;
}

function baseSnd(notfreq,t){
  return aaSnd(notfreq,t);
  //return sin(notfreq,t);
  }
this.main=function(t) { // drums
  
  //TIME CHECK m_wwT is one music length
  if(Math.floor((t-m_memTime) * tempo) % (m_melody.length*m_wwT) ==0)
  //if(t-m_memTime>10)
  {if(m_chk==0){
    tempo=Math.random()*9+0.9;
    m_wwT=Math.floor(tempo*2.2); // one music length
    //tempo=7.83;
    generativeMelody();
    m_chk=1;m_memTime=t;dbg(' t')('dddd tempo='+tempo+' t='+t+' m_wwT='+m_wwT);bitset();}}
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
    //fastlp_b(perc(snare_osc, 80 , (t + 1/tempo)*tempo % (1), t))
    fastlp_b(perc(snare_osc, 80 , (t %( 1/tempo))*tempo , t))
  ;
  var melody=0;
  var not=m_melody[Math.floor(t * tempo) % m_melody.length];
  var notfreq=note(not,3);
  if(not!=24)
  melody=perc(baseSnd(notfreq,t),10,(t % (1/tempo*1))*(tempo) ,t)*0.1;
  var snd=snare+kick+melody;
  //snd+=sin(783,t)*0.1; 
  //snd+=sin(783*9/8,t)*0.1;
  //snd+=sin(783/2*9/8,t)*0.1;
  //snd+=sin(441,t)*0.1;
  //if(t>0.0001)kick=kick*kickbit[Math.floor(t * tempo- 0.0001) % kickbit.length];     
  return snd;
}
  
}

clsTwo.prototype.run=function(t){
  return this.main(t);
}
var soundTwo=new clsTwo();

var clsThree=function(){
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

 
 
/*
bass:
ia	ftgentmp 0, 0, 16, -2, 600, 1040, 2250, 2450, 2750, 0,  -7,  -9,  -9, -20, 60, 70, 110, 120, 130
ie	ftgentmp 0, 0, 16, -2, 400, 1620, 2400, 2800, 3100, 0, -12,  -9, -12, -18, 40, 80, 100, 120, 120
ii	ftgentmp 0, 0, 16, -2, 350, 1700, 2700, 3700, 4950, 0, -20, -30, -22, -28, 60, 90, 100, 120, 120
io	ftgentmp 0, 0, 16, -2, 450, 800,  2830, 3500, 4950, 0, -11, -21, -20, -40, 40, 80, 100, 120, 120
iu	ftgentmp 0, 0, 16, -2, 325, 700,  2530, 3500, 4950, 0, -20, -32, -28, -36, 40, 80, 100, 120, 120
igoto ind
tenor:
ia	ftgentmp 0, 0, 16, -2, 650, 1080, 2650, 2900, 3250, 0,  -6,  -7,  -8, -22, 80, 90, 120, 130, 140	
ie	ftgentmp 0, 0, 16, -2, 400, 1700, 2600, 3200, 3580, 0, -14, -12, -14, -20, 70, 80, 100, 120, 120	
ii	ftgentmp 0, 0, 16, -2, 290, 1870, 2800, 3250, 3540, 0, -15, -18, -20, -30, 40, 90, 100, 120, 120	
io	ftgentmp 0, 0, 16, -2, 400,  800, 2600, 2800, 3000, 0, -10, -12, -12, -26, 70, 80, 100, 130, 135	
iu	ftgentmp 0, 0, 16, -2, 350,  600, 2700, 2900, 3300, 0, -20, -17, -14, -26, 40, 60, 100, 120, 120
igoto ind
countertenor:
ia	ftgentmp 990, 0, 16, -2, 660, 1120, 2750, 3000, 3350, 0,  -6, -23, -24, -38, 80, 90, 120, 130, 140	
ie	ftgentmp 991, 0, 16, -2, 440, 1800, 2700, 3000, 3300, 0, -14, -18, -20, -20, 70, 80, 100, 120, 120	
ii	ftgentmp 992, 0, 16, -2, 270, 1850, 2900, 3350, 3590, 0, -24, -24, -36, -36, 40, 90, 100, 120, 120	
io	ftgentmp 993, 0, 16, -2, 430,  820, 2700, 3000, 3300, 0, -10, -26, -22, -34, 40, 80, 100, 120, 120	
iu	ftgentmp 994, 0, 16, -2, 370,  630, 2750, 3000, 3400, 0, -20, -23, -30, -34, 40, 60, 100, 120, 120
igoto ind
alto:
ia	ftgentmp 0, 0, 16, -2, 800, 1150, 2800, 3500, 4950, 0,  -4, -20, -36, -60, 80,  90, 120, 130, 140
ie	ftgentmp 0, 0, 16, -2, 400, 1600, 2700, 3300, 4950, 0, -24, -30, -35, -60, 60,  80, 120, 150, 200
ii	ftgentmp 0, 0, 16, -2, 350, 1700, 2700, 3700, 4950, 0, -20, -30, -36, -60, 50, 100, 120, 150, 200
io	ftgentmp 0, 0, 16, -2, 450, 800,  2830, 3500, 4950, 0,  -9, -16, -28, -55, 70,  80, 100, 130, 135
iu	ftgentmp 0, 0, 16, -2, 325, 700,  2530, 3500, 4950, 0, -12, -30, -40, -64, 50,  60, 170, 180, 200
igoto ind
soprano:
ia	ftgentmp 0, 0, 16, -2, 800, 1150, 2900, 3900, 4950, 0,  -6, -32, -20, -50, 80,  90, 120, 130, 140	
ie	ftgentmp 0, 0, 16, -2, 350, 2000, 2800, 3600, 4950, 0, -20, -15, -40, -56, 60, 100, 120, 150, 200	
ii	ftgentmp 0, 0, 16, -2, 270, 2140, 2950, 3900, 4950, 0, -12, -26, -26, -44, 60,  90, 100, 120, 120	
io	ftgentmp 0, 0, 16, -2, 450,  800, 2830, 3800, 4950, 0, -11, -22, -22, -50, 40,  80, 100, 120, 120	
iu	ftgentmp 0, 0, 16, -2, 325,  700, 2700, 3800, 4950, 0, -16, -35, -40, -60, 50,  60, 170, 180, 200
*/

var vcf =[];
var i=0;
for(i=0;i<5;i++){
  vcf[i]=new QBiquad('bpf');
  vcf[i].cut(700) .res(15).gain(3).update();  
}

function filterBank(snd,fn,mm)
{


  
  var out=0;
  var oo=[];
  // vowel a
  var ff=[650, 1080, 2650, 2900, 3250];
  var am=[ 1, 0.50118723362727, 0.44668359215096, 0.3981071705535, 0.079432823472428 ];
  var bw=[ 10, 12.777777777778, 24.166666666667, 30, 35.357142857143 ];
  if(fn==1){//vowel i
    ff=[290, 1870, 2800, 3250, 3540];
    am=[ 1, 0.17782794100389, 0.12589254117942, 0.1, 0.031622776601684 ];
    bw=[ 7.25, 20.777777777778, 28, 27.083333333333, 29.5 ];
  }
  else if(fn==2){// vowel e
    ff=[400, 1700, 2600, 3200, 3580];
    am=[ 1, 0.19952623149689, 0.25118864315096, 0.19952623149689, 0.1 ];
    bw=[ 5.7142857142857, 21.25, 26, 26.666666666667, 29.833333333333 ];
  
  }
  //q= cut/bw  res
  for(i=0;i<5;i++){
    vcf[i].cut(ff[i]+mm).res(bw[i]*(mm/100+1)).update();
    oo[i] = vcf[i].update().run(snd)*am[i];
    out+=oo[i];
    
  }
  return out*3;
  
}
function aaSnd(freq,t){
  var snd;
  var cc=Math.sin(t*Math.PI*2*(freq/2))*(6);
  snd=Math.sin(t*Math.PI*2*freq+cc  );
  snd*=0.25;
  snd=filterBank(snd,Math.floor(t%3),0);
  return snd;
}
this.main=function(t) { // drums
  var sndr=Math.random()*33.4;
  var m_aa=new FastLP3(410);var fastlp_a =function(x){return m_aa.run(x)};
  var snda=fastlp_a(sndr);
  var snd;
  //snd=Math.sin(t*Math.PI*2*441);
  var freq=note(30);
  var cc=Math.sin(t*Math.PI*2*(freq/2))*(6);
  snd=Math.sin(t*Math.PI*2*freq+cc  )+snda;
  
  snd*=0.25;
  snd=filterBank(snd,Math.floor(t%3),0);
  snd=aaSnd(freq,t);
  snd*=Math.cos(t*Math.PI*2*0.25);
  return snd;
  return sndr*0.01;
}
  
}

clsThree.prototype.run=function(t){
  return this.main(t);
}
var soundThree=new clsThree();



export function dsp(t) {
  return soundTwo.run(t);
  //return soundThree.run(t);
}