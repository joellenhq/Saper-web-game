const wielkosc=16;
var wielk;
wielk=wielkosc*wielkosc+7;
var szerokosc;
szerokosc=24;
var bomby;
bomby=false;
var zero;

var pola=new Array(wielk);
var x;
var ile;
var yes= new Audio("yes.wav");
var no= new Audio("no.wav");

function przyciskenable(){
	bomby=!bomby;
	var bomba="b"+1;
	if(bomby){
		document.getElementById(bomba).style.background="red";
	}
	else{document.getElementById(bomba).style.background="green";}
	
	}


function wypisz(){
		
	var tresc="";
	for(i=0;i<=wielk;i++){
		var element="el"+i;
		tresc=tresc+'<div class="poj" onclick="sprawdz('+i+')" id="'+element+'"></div>';
	if((i+1)%szerokosc==0){
		tresc=tresc+'<div style="clear:both;"></div>';
	}
	}
	document.getElementById("pole").innerHTML = tresc;
}

function tlo(){
	for(i=0;i<=wielk;i++){
		var element="el"+i;
		if((i+1)%2==0){
		document.getElementById(element).style.background="lightgray";
	}
	}
}

window.onload = start;

function start(){
	for(i=0;i<=wielk;i++){
	pola[i]="nr";
	}
	for(j=0;j<=(Math.floor(wielk*1/4));j++){
	x=Math.floor(Math.random()*wielk);
	pola[x]="bomb";
	}
	wypisz();
	
	tlo();
	var bomba="b"+1;
	document.getElementById("przycisk").innerHTML='<hr><span class="przyc" id="'+bomba+'" onclick="przyciskenable()">bomby</span>';
	
}


function sprawdz(nr){
	if(bomby){
		var element="el"+nr;
		document.getElementById(element).style.background="red";
	}
	else{
	if(pola[nr]=="bomb"){
			no.play();
			for(i=0;i<=wielk;i++){
				var element="el"+i;
				if(pola[i]=="bomb"){
					document.getElementById(element).style.background="black";
				}
			}
			powiadom();
			
	}
	
	else if(pola[nr]=="nr"){
		yes.play();
		var element="el"+nr;
	
	ile=0;
	if((nr+1)%szerokosc==0 ){
		if(pola[nr-szerokosc-1]=="bomb"){ile++;}
		if(pola[nr-szerokosc]=="bomb"){ile++;}
		if(pola[nr-1]=="bomb"){ile++;}
		if(pola[nr+szerokosc]=="bomb"){ile++;}
		if(pola[nr+szerokosc-1]=="bomb"){ile++;}
		pola[nr]=ile;
		if(pola[nr]==0){
			sprawdz(nr-szerokosc-1);
			sprawdz(nr-szerokosc);
			sprawdz(nr+szerokosc);
			sprawdz(nr+szerokosc-1);
			sprawdz(nr-1);
		}
	}
	else if((nr+szerokosc)%szerokosc==0){
		if(pola[nr-szerokosc]=="bomb"){ile++;}
		if(pola[nr-szerokosc+1]=="bomb"){ile++;}
		if(pola[nr+1]=="bomb"){ile++;}
		if(pola[nr+szerokosc+1]=="bomb"){ile++;}
		if(pola[nr+szerokosc]=="bomb"){ile++;}
		pola[nr]=ile;
		if(pola[nr]==0){
			sprawdz(nr-szerokosc);
			sprawdz(nr-szerokosc+1);
			sprawdz(nr+szerokosc+1);
			sprawdz(nr+szerokosc);
			sprawdz(nr+1);
		}
		}
	else{
		if(pola[nr-szerokosc-1]=="bomb"){ile++;}
		if(pola[nr-szerokosc]=="bomb"){ile++;}
		if(pola[nr-szerokosc+1]=="bomb"){ile++;}
		if(pola[nr+1]=="bomb"){ile++;}
		if(pola[nr-1]=="bomb"){ile++;}
		if(pola[nr+szerokosc+1]=="bomb"){ile++;}
		if(pola[nr+szerokosc]=="bomb"){ile++;}
		if(pola[nr+szerokosc-1]=="bomb"){ile++;}
		pola[nr]=ile;
		if(pola[nr]==0){
			sprawdz(nr-szerokosc-1);
			sprawdz(nr-szerokosc);
			sprawdz(nr-szerokosc+1);
			sprawdz(nr+szerokosc+1);
			sprawdz(nr+szerokosc);
			sprawdz(nr+szerokosc-1);
			sprawdz(nr-1);
			sprawdz(nr+1);
		}
		
	}
		
		document.getElementById(element).innerHTML=pola[nr];
		document.getElementById(element).style.color="blue";
		document.getElementById(element).style.cursor="default";
		if((nr+1)%2==0){
		document.getElementById(element).style.background="yellowgreen";}
		else{document.getElementById(element).style.background="olivedrab";}
		wygrana();
	}
	}
}

function powiadom() {
  
  if (confirm("Przegrana! Chcesz zagrać ponownie?")) {
    location.reload();
	
  } 
  else{for(i=0;i<=wielk;i++){
	element="el"+i;
	document.getElementById(element).setAttribute("onclick",";");
	}}
}

function wygrana(){
	zero=0;
	for(i=0;i<=wielk;i++){
	if(pola[i]=="nr"){zero++;}
	}
	if(zero==0){
		if (confirm("Wygrana! Chcesz zagrać ponownie?")) {
			location.reload();
	
		} 
		else{
			for(i=0;i<=wielk;i++){
			element="el"+i;
			document.getElementById(element).setAttribute("onclick",";");
			}
		}
	}
}
