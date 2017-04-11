
/**
 * @name test002
 * 
 * 
 * @license mit

 */

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

export function dsp(t) {
  var snd,freq=440,vol,env;
  //freq=lat1.run(t, (Math.random()*400+100));
  freq=lat1.run(t, (lat1.cnt%10+2)*50);
  vol=lat2.run(t, (Math.random()*0.5+0.05));
  vol=0.7;
  env=Math.cos(t* Math.PI * 2*1)*Math.cos(t*Math.PI*2*0.5)*Math.cos(t*Math.PI*0.25);
  env=env*env;
  snd=Math.sin(t * Math.PI * 2 *freq)*env*vol;
  return snd;
}

/**
 * ### Exercise:
 * 
 * Complete the function to accept a frequency in Hz and return a sample:
 */

function sin(){
  //
}
