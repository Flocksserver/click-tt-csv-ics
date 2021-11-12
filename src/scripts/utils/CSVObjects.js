/**
 * Created by marcel on 09.12.14.
 */
var myPunktspielArray = new PunktspielArray();

function PunktspielArray(){
  this.punktspielArray = new Array();
}
function Mannschaft(inputName,inputAltersklasse,inputLiga,inputMannschaftsNummer){
  this.vereinsName=inputName;
  this.altersklasse= inputAltersklasse;
  this.liga=inputLiga;
  this.mannschaftsNummer=inputMannschaftsNummer;
  this.punktspiele=new Array();
}
function Punktspiel(inputDatum,inputUhrzeit,inputHeim,inputAusw){
  this.datum=inputDatum;
  this.uhrzeit=inputUhrzeit;
  this.heim=inputHeim;
  this.auswaerts=inputAusw;
}
