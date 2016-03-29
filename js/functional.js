"use strict";
var functional = (function() {

  var composeTeam = function(options) {

    var team = function() {
      var club = {};

      club.name = options.teamName;
      club.conference = '';
      club.league = 'NBA';
      club.inheritance = 'functional';

      club.winGame = function() {
        window.console.log(club.name + ' has won a game!');
      };

      club.composeTextMsg = function() {
        return(this.name + ' has won ' + this.conference + ' conference finals in ' + this.league + ' :)');
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
    if (options.teamConference === 'west') {
      club = new westTeam(options.teamName);
    }
    else {
      club = new eastTeam(options.teamName);
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