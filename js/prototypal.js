"use strict";
var prototypal = (function() {

  var init = function(options) {

    var team = {
      name: "",
      conference: "",
      league: "NBA",
      inheritance: "prototypal",

      winGame: function() {
        window.console.log(this.name + " has won a game!");
      },

      composeTextMsg: function() {
        return(this.name + " has won " + this.conference + " conference finals in " + this.league + " :)");
      }
    };

    var eastTeam = Object.create(team, {
      conference: { value: "east" }
    });

    var westTeam = Object.create(team, {
      conference: { value: "west" }
    });

    var club;
    if (options.teamConference === "east") {
      club = Object.create(eastTeam, {
        name: { value: options.teamName }
      });
    }
    else {
      club = Object.create(westTeam, {
        name: { value: options.teamName }
      });
    }

    if (club.name) {
      document.getElementsByClassName("inheritance-type")[0].innerHTML = club.inheritance;
      document.getElementsByClassName("generated-club")[0].innerHTML = club.composeTextMsg();
    }
    else {
      document.getElementsByClassName("generated-club")[0].innerHTML = "You did not type team name.";
    }
  };

  return {
    init: init
  };

})();

