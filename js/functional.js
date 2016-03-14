var functional = (function() {

  var inheritanceType = document.getElementById("inheritance-type").value;

  var init = function() {

    var teamName = document.getElementById("team-name").value,
        teamConference = document.getElementById("conference").value;

    var team = function(teamName) {
      var club = {};

      club.name = teamName;
      club.conference = "";
      club.league = "NBA";
      club.inheritance = "functional";

      club.winGame = function() {
        console.log(club.name + " has won a game!");
      };

      club.composeTextMsg = function() {
        return(this.name + " has won a " + this.conference + " conference finals in " + this.league + " :)" );
      };

      return club;
    };

    var eastTeam = function(teamName) {
      var club = team(teamName);
      club.conference = 'east';
      return club;
    };

    var westTeam = function(teamName) {
      var club = team(teamName);
      club.conference = 'west';
      return club;
    };

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


  if (inheritanceType === 'functional') {
    init();
  }

  return {
    init: init
  }
  
})();