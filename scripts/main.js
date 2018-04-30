/* DOCUMENT VARIABLES */
var header = document.querySelector('header');
var nav = document.querySelector('nav')
var sBtns = document.querySelectorAll('nav span');
var main = document.querySelector('main');
var sections = document.querySelectorAll('section');
var posSections = [];
var goTop = document.querySelector('#go-top');
var currentSIndex; //values: 0,1,2...
var isScrolling = false;
var nextBtns = document.querySelectorAll('span.next')
var menuBtn = document.querySelector('#menu-button');
const navHeight = 56;


/*
  actions when document finish loading as a whole
*/
window.addEventListener('load', function() {
  console.log('all has finished loading');
  setSecHeight();
  fillPositions();
});

/*
  adjust sections width
*/
function setSecHeight() {
  for (var k = 0; k < sections.length; k++){
    sections[k].style.height = window.innerHeight+'px';
  }
}
setSecHeight();


/*
  toggle nav visibility
*/

menuBtn.addEventListener('click', function() {
  if(header.classList.contains('visible')){
    header.classList.remove('visible');
    menuBtn.classList.remove('pinned');
  } else {
    header.classList.add('visible');
    menuBtn.classList.add('pinned');
  }
});



/*
  hover nav event
*/
window.addEventListener('mousemove', function(e) {
  if (e.clientY <= navHeight) {
    header.classList.add('hovered');
  } else {
    header.classList.remove('hovered');
  }
});


/*
  filling up position sections list
*/

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


/*
  resize events
*/

window.addEventListener('resize', function() {
  setSecHeight();
  setTimeout(fillPositions, 600);
  // fillPositions();  // update positions because of resizing
  // goCurrentSection();//commented out because of annoying displacement when url bar hides in mobile browsers // always endup showing a whole section
});


/*
  add actions to nav buttons when they are clicked
  scroll to the right section
*/

function linkButtons(){
  for (var k = 0; k < sections.length; k++){
    sBtns[k].addEventListener('click', function(e) {
      var index = Number(e.target.id.slice(-1))-1;
      scrollToPos(posSections[index]);
      //remove header 'visible' class
      header.classList.remove('visible');
      menuBtn.classList.remove('pinned');
    });
  }
}
linkButtons();


/*
  function that scrolls to a absolute position in the document
*/

function scrollToPos(position){
  window.scroll({ top: position, left: 0, behavior: 'smooth' });
  // console.log("I'm scrolling to: ", position);
}


//add action to goTop button
goTop.addEventListener('click', function() {
  scrollToPos(0);
});


//move to the next/previous section when mouse wheel is scrolled
window.addEventListener('wheel', function (e) {
  e.preventDefault();
  e.stopPropagation();
  // console.log('wheel scrolled');
  if (isScrolling){
    // avoid executing multiple times on one wheel action
    return;
  }

  isScrolling = true;

  if (e.deltaY > 0){
    if(window.scrollY < posSections[currentSIndex]){
      //adjust the section if it's slightly under top window border
      goCurrentSection()
    } else {
      goNextSection();
    }
    isScrolling = false; //wheel scroll OFF
  } else if(e.deltaY < 0){
    if(window.scrollY > posSections[currentSIndex]){
      //adjusts section if it's slightly over the top window border
      goCurrentSection();
    } else {
      goPreviousSection();
    }
    isScrolling = false; //wheel scroll OFF
  }

});


//add action when scrolling 
window.addEventListener('scroll', function() {
 
  revealGoTop();
  setCurrentSection();
});

//reveal or hide the Go-top button
function revealGoTop(){
  if(window.scrollY !== 0){
    goTop.classList.add('visible');
  } else {
    goTop.classList.remove('visible');
  }
}

// // values to calculate when document loads
function setCurrentSection(){
  for (var k = 0; k < sections.length; k++){
    if (window.scrollY >= (posSections[k] - 0.2*window.innerHeight)){
      //added 0.25 for nav button highlight
      currentSIndex = k;
    } else {
      break;
    }
  }
  setActiveSection();
  // console.log("current position values calculated: ", currentSIndex);
}
setCurrentSection();

/*
  set the active class to the right section
*/
function setActiveSection() {
  for (var k = 0; k < sections.length; k++){
    if (k == currentSIndex){
      sBtns[k].classList.add('active');
    } else {
      sBtns[k].classList.remove('active');
    }
  }
}


//move to next section
function goNextSection(){
  var nextSIndex;
  if( currentSIndex === sections.length){
    //last section, stays or adjusts
    nextSIndex = currentSIndex;
  } else {
    //increase section index by one
    nextSIndex = currentSIndex + 1;
  }
  //move to position of next section
  scrollToPos(posSections[nextSIndex]);
}

//move to previous section
function goPreviousSection(){
  var previousSIndex;
  if( currentSIndex === 0){
    //first section, stays or adjusts
    previousSIndex = currentSIndex;
  } else {
    //decrease section index by one
    previousSIndex = currentSIndex - 1;
  }
  //move to position of previous section
  scrollToPos(posSections[previousSIndex]);
}

//adjust position of current section (to be displayed fully)
function goCurrentSection(){
  scrollToPos(posSections[currentSIndex]);
}

//add functionality to every 'next' button
function linkNextBtns(){
  for(var k = 0; k < sections.length-1; k++){
    nextBtns[k].addEventListener('click', function(e) {
      console.log(e.target.parentNode.classList[1]);
      console.log("going to: ", Number(e.target.parentNode.classList[1].slice(-1)));
      scrollToPos(posSections[
        Number(e.target.parentNode.classList[1].slice(-1))
      ]);
    });
  }
}
linkNextBtns();