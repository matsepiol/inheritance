"use strict";
var mainModule = (function() {

  var pseudoclassical = window.pseudoclassical,
      functional = window.functional,
      prototypal = window.prototypal;

  var getJSON = new XMLHttpRequest();
  getJSON.overrideMimeType("application/json");
  getJSON.open("GET", "teams.json", true);
  getJSON.onreadystatechange = function () {
    if (getJSON.readyState == 4 && getJSON.status == "200") {
      //saving json to local storage
      localStorage.setItem("predefinedTeams", getJSON.responseText);
      setPredefinedTeams();
    }
  };
  getJSON.send(null);

  var setPredefinedTeams = function() {
    var predefinedTeamsPicker = document.getElementById("predefined-teams-picker"),
        predefinedTeams = JSON.parse(localStorage.getItem("predefinedTeams"));

    for (var i = 0 ; i < predefinedTeams.teams.length ; i++) {
      var option = document.createElement("option"),
          team = predefinedTeams.teams[i];

      option.text = option.value = team.name;

      //adding predefined teams to predefined teams picker in DOM
      predefinedTeamsPicker.add(option);
    }
  };

  var generate;
  (generate = function(val) {

    var nameWrapper = document.getElementById("team-name"),
        conferenceWrapper = document.getElementById("conference"),
        inheritanceWrapper = document.getElementById("inheritance-type");

    if (val) {
      var predefinedTeams = JSON.parse(localStorage.getItem("predefinedTeams"));

      for (var i = 0 ; i < predefinedTeams.teams.length ; i++) {
        var team = predefinedTeams.teams[i];

        //picking correct predefined team from local storage and setting the options accordingly
        if (team.name === val) {
          nameWrapper.value = team.name;
          conferenceWrapper.value = team.conference;
        }
      }
    }

    var options = {
      teamName: nameWrapper.value,
      teamConference: conferenceWrapper.value,
      inheritanceType: inheritanceWrapper.value
    };

    if (options.inheritanceType === "pseudoclassical") {
      pseudoclassical.init(options);
    }
    else if (options.inheritanceType === "functional") {
      functional.init(options);
    }
    else if (options.inheritanceType === "prototypal") {
      prototypal.init(options);
    }
  }).call();

  return {
    generate: generate
  };

})();