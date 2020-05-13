import $ from 'jquery';

const calculateComplexity = function (password) {
    var complexity = 0;
    
    var regExps = [ 
      /[a-z]/,
      /[A-Z]/,
      /[0-9]/,
      /.{8}/,
      /.{16}/,
      /[!-//:-@[-`{-ÿ]/
    ];
    
    regExps.forEach(function (regexp) {
      if (regexp.test(password)) {
        complexity++;
      }
    });
    
    return {
      value: complexity,
      max: regExps.length
    };
  };
   
  export const checkPasswordStregth = function (password) {
    var progress = document.querySelector('#passwordComplexity'),
        complexity = calculateComplexity(password); 
    
    progress.value = complexity.value;
    progress.max = complexity.max;
};  
  
  var input = document.querySelector('#inputPassword');
  //input.addEventListener('keyup', checkPasswordStregth);