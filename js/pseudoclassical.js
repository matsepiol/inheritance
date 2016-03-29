"use strict";
var pseudoclassical = (function() {

  var composeTeam = function(options) {

    var team = function() {};

    team.prototype = {
      name: '',
      conference: '',
      league: 'NBA',
      inheritance: 'pseudoclassical',

      winGame: function() {
        window.console.log(this.name + ' has won a game!');
      },

      composeTextMsg: function() {
        return (this.name + ' has won ' + this.conference + ' conference finals in ' + this.league + ' :)');
      }
    };

    var EastTeam = function(teamName) {
      this.name = teamName;
      this.conference = 'east';
    };

    var WestTeam = function(teamName) {
      this.name = teamName;
      this.conference = 'west';
    };

    var applyInheritance = function(child, parent) {
      var TempObj = function() {};
      TempObj.prototype = parent.prototype;
      child.prototype = new TempObj();
    };

    applyInheritance(EastTeam, team);
    applyInheritance(WestTeam, team);

    var club;
    if (options.teamConference === 'west') {
      club = new WestTeam(options.teamName);
    }
    else {
      club = new EastTeam(options.teamName);
    }

    return club;
  };

  var writeInfo = function(club) {
    if (club.name) {
      document.getElementsByClassName('inheritance-type')[0].innerHTML = club.inheritance;
      document.getElementsByClassName('generated-club')[0].innerHTML = club.composeTextMsg();
    }
    else {
      document.getElementsByClassName('generated-club')[0].innerHTML = 'You did not type team name.';
    }
  };

  return {
    composeTeam: composeTeam,
    writeInfo: writeInfo
  };

})();