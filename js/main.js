"use strict";
var mainModule = (function() {

  var pseudoclassical = window.pseudoclassical,
      functional = window.functional,
      prototypal = window.prototypal;

  document.getElementById("team-name").value = "";

  var loadJSON;
  (loadJSON = function() {
    var getJSON = new XMLHttpRequest();
    getJSON.overrideMimeType("application/json");
    getJSON.open("GET", "teams.json", true);
    getJSON.onreadystatechange = function () {
      if (getJSON.readyState == 4 && getJSON.status == "200") {
        //saving json to local storage
        if(!localStorage.predefinedTeams) {
          localStorage.setItem("predefinedTeams", getJSON.responseText);
        }
        setPredefinedTeams();
      }
    };
    getJSON.send(null);
  }).call();

  var setPredefinedTeams = function() {
    var predefinedTeams = JSON.parse(localStorage.getItem("predefinedTeams"));

    for (var i = 0 ; i < predefinedTeams.teams.length ; i++) {
      var team = predefinedTeams.teams[i];

      //adding predefined teams to predefined teams picker in DOM
      createPredefinedList(team);
    }
  };

  //add predefined teams to list and options
  var createPredefinedList = function(team) {
    var list = document.getElementsByClassName("predefined-teams-list")[0].getElementsByTagName("ul")[0],
        predefinedTeamsPicker = document.getElementById("predefined-teams-picker"),
        option = document.createElement("option"),
        newItem = document.createElement("li");

    option.text = option.value = team.name;
    predefinedTeamsPicker.add(option);
    newItem.appendChild(document.createTextNode(team.name + " - " + team.conference + " conference"));
    list.appendChild(newItem);
  };

  var clearLocalStorage = function() {
    var listEl = document.getElementsByClassName("predefined-teams-list")[0].getElementsByTagName("li"),
        optionEl = document.getElementById("predefined-teams-picker").getElementsByTagName("option"),
        i;

    localStorage.clear();
    for (i = listEl.length - 1 ; i >= 0 ; i--) {
      listEl[i].parentNode.removeChild(listEl[i]);
    }

    for (i = optionEl.length - 1 ; i >= 0 ; i--) {
      optionEl[i].parentNode.removeChild(optionEl[i]);
    }
    loadJSON();
  };

  var generate;
  (generate = function(val) {

    var nameWrapper = document.getElementById("team-name"),
        conferenceWrapper = document.getElementById("conference"),
        inheritanceWrapper = document.getElementById("inheritance-type"),
        predefinedTeams,
        team,
        i;

    if (val) { //if predefined
      predefinedTeams = JSON.parse(localStorage.getItem("predefinedTeams"));

      for (i = 0 ; i < predefinedTeams.teams.length ; i++) {
        team = predefinedTeams.teams[i];

        //picking correct predefined team from local storage and setting the options accordingly
        if (team.name === val) {
          nameWrapper.value = team.name;
          conferenceWrapper.value = team.conference;
        }
      }
    }
    else if (nameWrapper.value) { //if new team, not predefined
      var newTeam = {"name": nameWrapper.value, "conference": conferenceWrapper.value};
      predefinedTeams = JSON.parse(localStorage.getItem("predefinedTeams"));

      for (i = 0 ; i < predefinedTeams.teams.length ; i++) {
        team = predefinedTeams.teams[i];
        if (team.name === newTeam.name) return; 
      }

      predefinedTeams.teams.push(newTeam);
      localStorage.setItem("predefinedTeams", JSON.stringify(predefinedTeams));
      createPredefinedList(newTeam);
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
    generate: generate,
    clearLocalStorage: clearLocalStorage
  };

})();