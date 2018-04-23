/* DOCUMENT VARIABLES */
var header = document.querySelector('header');
var nav = document.querySelector('nav')
var sBtns = document.querySelectorAll('nav span');
var main = document.querySelector('main');
var sections = document.querySelectorAll('section');
var posSections = [];
var goTop = document.querySelector('#go-top');
var currentIndexSection; //values: 0,1,2...
var currentTopPosition;




//filling up position sections list
function fillPositions(){
  posSections = [];
  for (var k = 0; k < sections.length; k++){
    var section = sections[k];
    var position = section.getBoundingClientRect().top + window.scrollY;
    posSections.push(position);
  }
  console.log('positions updated: ', posSections);
  
}
fillPositions();

//resize events
window.addEventListener('resize', function() {
  fillPositions();
  // calcCurrentPosValues();
});



//add actions to nav buttons when they are clicked
//scroll to the right section
function linkButtons(){
  for (var k = 0; k < sections.length; k++){
    sBtns[k].addEventListener('click', function(e) {
      var index = Number(e.target.id.slice(-1))-1;
      scrollToPos(posSections[index]);
    });
  }
}
linkButtons();

//function that scrolls to a absolute position in the document
function scrollToPos(position){
  window.scroll({ top: position, left: 0, behavior: 'smooth' });
  console.log("I'm scrolling to: ", position);
}


//add action to goTop button
goTop.addEventListener('click', function() {
  scrollToPos(0);
});

// sections[0].textContent = "hello";

//add action when scrolling 
// window.addEventListener('scroll', () => {
//   let direction = 0;
//   if ((window.scrollY - currentTopPosition) > 0) {
//     direction = 1;
//   } else if ((window.scrollY - currentTopPosition) < 0) {
//     direction = -1;
//   }
//   console.log("scroll direction: ", direction);
//   calcCurrentPosValues();
// });
// // place section in place after scroll
// function sectionScrolled(direction, section){
//   if (direction > 0) {
//     if(window.scrollY) 
//   }
// }


// // values to calculate when document loads
// function calcCurrentPosValues(){
//   currentTopPosition = window.scrollY;
//   for (let k = 0; k < sections.length; k++){
//     if (currentTopPosition >= (posSections[k] - 0.25*window.innerHeight)){
//       //added 0.25 for nav button highlight
//       currentIndexSection = k;
//     } else {
//       break;
//     }
//   }
//   console.log("current position values calculated: ", currentTopPosition, currentIndexSection);
// }
// calcCurrentPosValues();
