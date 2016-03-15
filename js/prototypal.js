var prototypal = (function() {

  var inheritanceType = document.getElementById("inheritance-type").value;

  var init = function() {

    var teamName = document.getElementById("team-name").value,
        teamConference = document.getElementById("conference").value;

    var team = {
      name: "",
      conference: "",
      league: "NBA",
      inheritance: "prototypal",

      winGame: function() {
        console.log(this.name + " has won a game!");
      },

      composeTextMsg: function() {
        return(this.name + " has won a " + this.conference + " conference finals in " + this.league + " :)" );
      }
    };

    var eastTeam = Object.create(team, {
      conference: { value: 'east' }
    });

    var westTeam = Object.create(team, {
      conference: { value: 'west' }
    });

    var club;
    if (teamConference === 'east') {
      club = Object.create(eastTeam, {
        name: { value: teamName},
      });
    }
    else {
      club = Object.create(westTeam, {
        name: { value: teamName},
      });
    }

    if (club.name) {
      document.getElementsByClassName("inheritance-type")[0].innerHTML = club.inheritance;
      document.getElementsByClassName("generated-club")[0].innerHTML = club.composeTextMsg();
    }
    else {
      document.getElementsByClassName("generated-club")[0].innerHTML = "You did not type team name.";
    }
  }

  return {
    init: init
  };

})();

