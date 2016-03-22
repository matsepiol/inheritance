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
          var teams = markTeamsFromJSON(getJSON.responseText);
          localStorage.setItem("predefinedTeams", teams);
        }
        setPredefinedTeams();
      }
    };
    getJSON.send(null);
  }).call();

  //seperate teams from json and other teams from ls
  var markTeamsFromJSON = function(json) {
    var predefinedTeams = JSON.parse(json);
    for (var i = 0 ; i < predefinedTeams.teams.length ; i++) {
      var team = predefinedTeams.teams[i];
      team.fromJSON = true;
    }

    return JSON.stringify(predefinedTeams);
  };

  var deleteTeamfromLS = function(obj, deletedTeam) {
    var predefinedTeams = JSON.parse(localStorage.getItem("predefinedTeams")),
        liItem = obj.parentElement,
        optionItem = document.getElementById("predefined-teams-picker").querySelectorAll("option[value=" + deletedTeam.name + "]")[0];

    //deleting item from ls, and removing li and option elements from DOM
    for (var i = 0 ; i < predefinedTeams.teams.length ; i++) {
      var team = predefinedTeams.teams[i];
      if (team.name === deletedTeam.name) { 
        predefinedTeams.teams.splice(i, 1);
        liItem.parentNode.removeChild(liItem);
        optionItem.parentNode.removeChild(optionItem);
        localStorage.setItem("predefinedTeams", JSON.stringify(predefinedTeams));
        return;
      }
    }
  };

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
        optionItem = document.createElement("option"),
        liItem = document.createElement("li"),
        deleteButton = document.createElement("span");

    deleteButton.classList.add("icon-cancel");
    optionItem.text = optionItem.value = team.name;
    predefinedTeamsPicker.add(optionItem);
    liItem.appendChild(document.createTextNode(team.name + " - " + team.conference + " conference"));
    if (!team.fromJSON) { liItem.appendChild(deleteButton); }
    deleteButton.addEventListener("click", function() { deleteTeamfromLS(this, team); });
    list.appendChild(liItem);
  };

  var clearLocalStorage = function() {
    var listEl = document.getElementsByClassName("predefined-teams-list")[0].getElementsByTagName("li"),
        optionEl = document.getElementById("predefined-teams-picker").getElementsByTagName("option"),
        i;

    localStorage.clear();
    for (i = listEl.length - 1 ; i >= 0 ; i--) {
      listEl[i].parentNode.removeChild(listEl[i]); //clearing DOM elements
    }

    for (i = optionEl.length - 1 ; i >= 0 ; i--) {
      optionEl[i].parentNode.removeChild(optionEl[i]); //clearing DOM elements
    }
    loadJSON(); //loading fresh data from json
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
      var newTeam = {"name": nameWrapper.value, "conference": conferenceWrapper.value},
          isInLS = false;

      predefinedTeams = JSON.parse(localStorage.getItem("predefinedTeams"));

      //check if this team already exist in ls
      for (i = 0 ; i < predefinedTeams.teams.length ; i++) {
        team = predefinedTeams.teams[i];
        if (team.name === newTeam.name) { isInLS = true; }
      }

      if (!isInLS) {
        predefinedTeams.teams.push(newTeam);
        localStorage.setItem("predefinedTeams", JSON.stringify(predefinedTeams)); //add new team to ls 
        createPredefinedList(newTeam);
      }
    }

    var options = {
      teamName: nameWrapper.value,
      teamConference: conferenceWrapper.value,
      inheritanceType: inheritanceWrapper.value
    };

    var club;
    if (options.inheritanceType === "pseudoclassical") {
      club = pseudoclassical.composeTeam(options);
      pseudoclassical.writeInfo(club);
    }
    else if (options.inheritanceType === "functional") {
      club = functional.composeTeam(options);
      functional.writeInfo(club);
    }
    else if (options.inheritanceType === "prototypal") {
      club = prototypal.composeTeam(options);
      prototypal.writeInfo(club);
    }
  }).call();

  return {
    generate: generate,
    clearLocalStorage: clearLocalStorage
  };

})();