/**
 * Created by marcel on 09.12.14.
 */
function generateICS(){
  var ics ='';
  var leerAdd = ''
  var tmpIcs = leerAdd.concat(
    "BEGIN:VCALENDAR",
    "\r\n"
    ,"PRODID:-//Mozilla.org/NONSGML Mozilla Calendar V1.1//EN"
    ,"\r\n"
    ,"VERSION:2.0"
    ,"\r\n"
    ,"BEGIN:VTIMEZONE"
    ,"\r\n"
    ,"TZID:Europe/Berlin"
    ,"\r\n"
    ,"X-LIC-LOCATION:Europe/Berlin"
    ,"\r\n"
    ,"BEGIN:DAYLIGHT"
    ,"\r\n"
    ,"TZOFFSETFROM:+0100"
    ,"\r\n"
    ,"TZOFFSETTO:+0200"
    ,"\r\n"
    ,"TZNAME:CEST"
    ,"\r\n"
    ,"DTSTART:19700329T020000"
    ,"\r\n"
    ,"RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3"
    ,"\r\n"
    ,"END:DAYLIGHT"
    ,"\r\n"
    ,"BEGIN:STANDARD"
    ,"\r\n"
    ,"TZOFFSETFROM:+0200"
    ,"\r\n"
    ,"TZOFFSETTO:+0100"
    ,"\r\n"
    ,"TZNAME:CET"
    ,"\r\n"
    ,"DTSTART:19701025T030000"
    ,"\r\n"
    ,"RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10"
    ,"\r\n"
    ,"END:STANDARD"
    ,"\r\n"
    ,"END:VTIMEZONE"
    ,"\r\n");
  ics += tmpIcs;
  tmpIcs = '';
  mannschaftsExportArray.forEach(function(mannschaft) {
    var altersklasse = mannschaft.altersklasse;
    var liga = mannschaft.liga;
    var nummer = mannschaft.mannschaftsNummer;
    var eigenerVerein = mannschaft.vereinsName;

    mannschaft.punktspiele.forEach(function(punktspiel) {
      var datum = punktspiel.datum;
      var uhrzeit = punktspiel.uhrzeit;
      var heim = punktspiel.heim;
      var gast = punktspiel.auswaerts;
      var terminStart = datum+"T"+uhrzeit;
      var terminEnde = datum+"T"+((parseInt(uhrzeit)+20000).toString());
      var rand1 = Math.random().toString().substring(2,6);
      var rand2 = Math.random().toString().substring(2,6);
      var rand3 = Math.random().toString().substring(2,6);

      tmpIcs = leerAdd.concat("BEGIN:VEVENT"
        ,"\r\n"
        ,"CREATED:20121009T084420Z"
        ,"\r\n"
        ,"LAST-MODIFIED:20121009T084420Z"
        ,"\r\n"
        ,"DTSTAMP:20121009T084420Z"
        ,"\r\n"
        ,"UID:FlocksServer-"+eigenerVerein+"-"+rand1+"-"+rand2+"-"+rand3
        ,"\r\n"
        ,"SUMMARY:"+nummer+". "+altersklasse+": "+heim+" gegen "+gast
        ,"\r\n"
        ,"STATUS:CONFIRMED"
        ,"\r\n"
        ,"DTSTART;TZID=Europe/Berlin:"+terminStart
        ,"\r\n"
        ,"DTEND;TZID=Europe/Berlin:"+terminEnde
        ,"\r\n"
        ,"DESCRIPTION:"+liga
        ,"\r\n"
        ,"TRANSP:OPAQUE"
        ,"\r\n"
        ,"END:VEVENT"
        ,"\r\n");
      ics += tmpIcs;
      tmpIcs = '';
    });
  });

  tmpIcs = leerAdd.concat("END:VCALENDAR");
  ics += tmpIcs;
  return ics;
}
