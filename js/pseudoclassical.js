var pseudoclassical = (function() {

  var inheritanceType = document.getElementById("inheritance-type").value;

  var init = function() {

    var teamName = document.getElementById("team-name").value,
        teamConference = document.getElementById("conference").value;

    var team = function() {};

    team.prototype = {
      name: "",
      conference: "",
      league: "NBA",
      inheritance: "pseudoclassical",

      winGame: function() {
        console.log(this.name + " has won a game!");
      },

      composeTextMsg: function() {
        return (this.name + " has won a " + this.conference + " conference finals in " + this.league + " :)");
      }
    };

    var eastTeam = function(teamName) {
      this.name = teamName;
      this.conference = 'east';
    };

    var westTeam = function(teamName) {
      this.name = teamName;
      this.conference = 'west';
    };

    var applyInheritance = function(child, parent) {
      var tempObj = function(){};
      tempObj.prototype = parent.prototype;
      child.prototype = new tempObj();
    };

    applyInheritance(eastTeam, team);
    applyInheritance(westTeam, team);

    var club;
    if (teamConference === 'west') {
      club = new westTeam(teamName);
    }
    else {
      club = new eastTeam(teamName);
    }

    document.getElementsByClassName("inheritance-type")[0].innerHTML = club.inheritance;
    document.getElementsByClassName("generated-club")[0].innerHTML = club.composeTextMsg();
  }

  if (inheritanceType === 'pseudoclassical') {
    init();
  }

  return {
    init: init
  }

})();