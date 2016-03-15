var mainModule = (function() {

  var pseudoclassical = this.pseudoclassical,
      functional = this.functional,
      prototypal = this.prototypal;

  var generate;
  (generate = function() {
    var inheritanceType = document.getElementById("inheritance-type").value;

    if (inheritanceType === 'pseudoclassical') {
      pseudoclassical.init();
    }
    else if (inheritanceType === 'functional') {
      functional.init();
    }
    else if (inheritanceType === 'prototypal') {
      prototypal.init();
    }
  })();

  return {
    generate: generate
  };

})();