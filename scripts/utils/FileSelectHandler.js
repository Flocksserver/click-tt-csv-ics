/**
 * Created by marcel on 09.12.14.
 */

$(document).on('change', '.btn-file :file', function() {
  var input = $(this),
    numFiles = input.get(0).files ? input.get(0).files.length : 1,
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label, input]);
});


function handleFileSelect(evt) {
  var files = evt.target.files;
  var selectedFile = files[0];

  if(isCSV(selectedFile)){
    var reader = new FileReader();
    reader.onload = function(e) {
      //console.log("Reader OnLoad");
      var text = reader.result;
      if(isNotFalseExport(text)){
        if(isVereinsspielplan(text)) {
          var arrayAlle = text.split('\n');


            var alleZweiDim = new Array;
          for (var i = 1; i < arrayAlle.length - 1; i++) {
            var entry = arrayAlle[i];
            alleZweiDim.push(entry.split(';'));
          }
            console.log(arrayAlle);

            heimVerein = getHeimVerein(alleZweiDim);
          console.log("Eigener Verein: "+heimVerein);
          createPunktspielArray(alleZweiDim);


          myPunktspielArray.punktspielArray.forEach(function (entry) {
            mannschaftsOberflaechenArray.push(entry);
          });

          var appElement = document.getElementById('listIdCtrl');
          var $scope = angular.element(appElement).scope();
          $scope.$apply(function () {
            $scope.mannschaftsOberflaechenArray = myPunktspielArray.punktspielArray;
            $scope.dateiAusgewaehlt = true;
          });
          $scope.$apply();

        }else{
          alert("Fehlerhafter Inhalt! Es wurde ein anderer Inhalt erwartet. Bitte verwende nur unveränderte Vereinspielplan-Dateien.");
        }
      }else{
        alert("Fehlerhafter Inhalt! Eventuell wurde die Datei leer aus click-TT exportiert?");
      }
    }
    reader.readAsText(selectedFile, "ISO-8859-1");
  }else{
    alert("Falsche Datei");
  }
}

function isCSV(file) {
  var ext = getExtension(file.name);
  switch (ext.toLowerCase()) {
    case 'csv':
      return true;
  }
  return false;
}

function getExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

function isNotFalseExport(text){
  if(text.substring(0,4)=="null"){
    return false;
  }else{
    return true;
  }
}

function isVereinsspielplan(text){
  if(text.substring(0,6)=="Termin"){
    return true;
  }else{
    return false;
  }
}

function getHeimVerein(alleZweiDim){

  var nurVereine = new Array();

  alleZweiDim.forEach(function(entry) {
    nurVereine.push(entry[spaltenInfo.HEIMMANNSCHAFT]);
  });

  nurVereine.sort();

  var a = '';
  var aCount = 0;
  var b = '';
  var bCount = 0;

  for(var i = 0; i < nurVereine.length-1;i++) {

    if (nurVereine[i]==b) {
      bCount++
      if (bCount > aCount && nurVereine[i + 1]!=b) {
        a = b;
        aCount = bCount;
        b = '';
      }
    } else {
      b = nurVereine[i];
      bCount = 0;
    }
  }
  if(aCount>bCount){
    return a;
  }else{
    return b;
  }

}

function createPunktspielArray(alleZweiDim){
  for(var i = 0; i < alleZweiDim.length;i++) {
    var entry=alleZweiDim[i];
    var vereinMitNummer;
    var vereinMannschaftsnummer;
    if(heimVerein==entry[spaltenInfo.HEIMMANNSCHAFT]){
      vereinMannschaftsnummer = entry[spaltenInfo.HEIMMANNSCHAFT_NUMMER];
      vereinMitNummer = entry[spaltenInfo.HEIMMANNSCHAFT]+" "+mannschaftRoemisch[vereinMannschaftsnummer];
    }else{
      vereinMannschaftsnummer = entry[spaltenInfo.GASTMANNSCHAFT_NUMMER];
      vereinMitNummer = entry[spaltenInfo.GASTMANNSCHAFT]+" "+mannschaftRoemisch[vereinMannschaftsnummer];
    }
    if(!isMannschaftSchonVorhanden(vereinMitNummer,entry)){
      var neueMannschaft = new Mannschaft(vereinMitNummer,entry[spaltenInfo.ALTERSKLASSE],entry[spaltenInfo.LIGA],vereinMannschaftsnummer);
      myPunktspielArray.punktspielArray.push(neueMannschaft);
    }

    myPunktspielArray.punktspielArray.forEach(function(eMannschaft) {
      if(eMannschaft.vereinsName==vereinMitNummer && eMannschaft.liga==entry[spaltenInfo.LIGA]){
        var datum = getDatum(entry[spaltenInfo.DATUM_UND_SPIELZEIT]);
        var uhrzeit = getUhrzeit(entry[spaltenInfo.DATUM_UND_SPIELZEIT]);
        var heimNummer = entry[spaltenInfo.HEIMMANNSCHAFT_NUMMER];
        var heimM = entry[spaltenInfo.HEIMMANNSCHAFT]+" "+mannschaftRoemisch[heimNummer];
        var gastNummer = entry[spaltenInfo.GASTMANNSCHAFT_NUMMER];
        var gastM = entry[spaltenInfo.GASTMANNSCHAFT]+" "+mannschaftRoemisch[gastNummer];
        var neuesPunktspiel = new Punktspiel(datum,uhrzeit,heimM,gastM)
        eMannschaft.punktspiele.push(neuesPunktspiel);
      }
    });
  }
}

function getDatum(datumUndString){
  var tempStr = datumUndString.substring(0, 10);
  var tempStrOhnePunkt = tempStr.replace(".", "");
  var tempStrOhnePunktNull = tempStrOhnePunkt.replace(".", "");
  var jahr = tempStrOhnePunktNull.substring(4, 8);
  var monat =tempStrOhnePunkt.substring(2, 4);
  var tag =tempStrOhnePunkt.substring(0, 2);
  var datumZusammengesetzt = jahr+monat+tag;
  return datumZusammengesetzt;
}

function getUhrzeit(datumUndString){
  var tempStr = datumUndString.substring(11, 16);
  var tempStrOhnePunkt = tempStr.replace(":", "");
  tempStrOhnePunkt = tempStrOhnePunkt + "00";
  return tempStrOhnePunkt;
}

function isMannschaftSchonVorhanden(vereinMitNummer,entry){
  var isVorhanden = false;
  for(var i = 0 ; i < myPunktspielArray.punktspielArray.length;i++) {
    var eMannschaft = myPunktspielArray.punktspielArray[i];
    if(eMannschaft.vereinsName==vereinMitNummer&&eMannschaft.liga==entry[spaltenInfo.LIGA]){
      isVorhanden = true;
      break;
    }
  }
  return isVorhanden;
}
