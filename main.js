/* DOCUMENT VARIABLES */
var header = document.querySelector('header');
var nav = document.querySelector('nav')
var sectionsBtns = []
var main = document.querySelector('main');
var sections = [];
var posSections = [];
var goTop = document.querySelector('#go-top');

// filling up sections selectors list
function fillSections(){
  for (section of main.children){
    sections.push(section);
  }
  console.log('sections filled: ', sections);
}
fillSections();

//filling up position sections list
function fillPositions(){
  posSections = [];
  for ( section of sections){
    let position = section.getBoundingClientRect().top + window.scrollY;
    posSections.push(position);
  }
  console.log('positions updated: ', posSections);
}
fillPositions();

//updating positions when rezise is done
window.addEventListener('resize', fillPositions)


//filling  nav buttons list
function fillButtons(){
  for (button of nav.children){
    sectionsBtns.push(button);
  }
  console.log('buttons filled: ', sectionsBtns);
}
fillButtons();


//add actions to nav buttons when they are clicked
//scroll to the right section
function linkButtons(){
  for (let k = 0; k < sections.length; k++){
    sectionsBtns[k].addEventListener('click', () =>{
      scrollTo(posSections[k]);
    });
  }
}
linkButtons();

//function that scrolls to a absolute position in the document
function scrollTo(position){
  window.scroll({top: position, behavior: "smooth"});
  console.log("I'm scrolling to: ", position);
}


//add action to goTop button
goTop.addEventListener('click', () => {
  scrollTo(0);
});