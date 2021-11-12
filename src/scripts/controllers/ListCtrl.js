/**
 * Created by marcel on 09.12.14.
 */

app.controller('ListCtrl', function ($scope) {
  document.getElementById('fileSelect').addEventListener('change', handleFileSelect, false);
  addEventListener('load', load, false);
  function load(){
  };

  $scope.mannschaftsOberflaechenArray = mannschaftsOberflaechenArray;
  $scope.dateiAusgewaehlt =false;
  $scope.value2 = "ab";
  $scope.addOrDeleteFromExportList = function(mannschaft, event){

    if($(event.target).is('input')){
      if(isMannschaftInExport(mannschaft)){
        loescheMannschaftAusExport(mannschaft);
      }else{
        fuegeMannschaftZuExport(mannschaft);
      }
    }

  }
  $scope.exportiereDatei = function(nameDerDatei){
    if(mannschaftsExportArray.length>=1){
      if(nameDerDatei!=''){
        if(!nameDerDatei.match(/\W/g)){
          var nameDerDateiMitAnhang = nameDerDatei.concat('.ics');
          var icsDatei = generateICS();
          var blob = new Blob([icsDatei], {type: "text/plain;charset=utf-8"});
          saveAs(blob, nameDerDateiMitAnhang);
        }else{
          alert('Der gewählte Kalendername enthält ungültige Zeichen.');
        }
      }else{
        alert("Es wurde kein Kalendername vergeben.");
      }
    }else{
      alert("Es wurde keine Mannschaft ausgewählt.");
    }
  }
});

function fuegeMannschaftZuExport(_mannschaft){
  mannschaftsExportArray.push(_mannschaft);
}

function loescheMannschaftAusExport(_mannschaft){
  for(var i = 0 ; i < mannschaftsExportArray.length;i++) {
    var eMannschaft = mannschaftsExportArray[i];
    if(eMannschaft.vereinsName==_mannschaft.vereinsName&&eMannschaft.liga==_mannschaft.liga){
      mannschaftsExportArray.remove(i);
      break;
    }
  }
}

function isMannschaftInExport(_mannschaft){
  var isVorhanden = false;
  for(var i = 0 ; i < mannschaftsExportArray.length;i++) {
    var eMannschaft = mannschaftsExportArray[i];
    if(eMannschaft.vereinsName==_mannschaft.vereinsName&&eMannschaft.liga==_mannschaft.liga){
      isVorhanden = true;
      break;
    }
  }
  return isVorhanden;
}
