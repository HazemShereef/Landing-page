/**
 * Define Global Variables
 * 
*/
const sections= document.querySelectorAll("section");
let viewedSection;
let currentActive;
let positionToScroll;
let name;
const iconBtn = document.getElementsByClassName("icon-button")[0];
const navMenu = document.getElementsByTagName("ul");
const navbarLinks = document.getElementById('navbar__list');
const navActiveState = document.getElementsByClassName("menu__link");
let sectionInView;



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//This function adds css code as a style tag in the html file itself,
//it changes the type of scrolling in the page to smooth






/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav

// this function created the li tags inside our ul tag, it also adds an anchor tag
// to be the link between the page's sections and their representive nav menu section
// Also it sets a class to menu__link, so that the nav bar will get styled

function createList(){
    for (i=0;i<sections.length;i++){
        sectionLink= sections[i].getAttribute("id");
        sectionName= sections[i].getAttribute("data-nav");
        itemList= document.createElement("li");
        itemList.innerHTML= `<a  class ="menu__link" href=#${sectionLink} data-active="${sectionLink}">${sectionName}</a>`
        document.getElementById("navbar__list").appendChild(itemList);
    }
}

// Add class 'active' to section when near top of viewport

//This function is a big one, 
//I tried to cut it down to smaller functions instead of the nested form shown below but
// for some reason the value of viewedSection variable was always undefined
// but when i put them in the nested form shown below it works
// It has something to do with scoping, but i couldn't figure out the problem after hours of researching



function nearestToTop(){
    // defining the variables
    let relativePlace=[]
    let notAbs;
    // setting the sections place in viewport to variables to process them later
    /* at the begining i didnt want to put it like that because then when i add a new section to page
    i will have to change this code and add a sectionFivePlace var, but when i try to do operations
    on the "sections" array directly it always gives error*/


        let sectionOnePlace=sections[0].getBoundingClientRect().top;
        let sectionTwoPlace=sections[1].getBoundingClientRect().top;
        let sectionThreePlace=sections[2].getBoundingClientRect().top;
        let sectionFourPlace=sections[3].getBoundingClientRect().top;
    
        // here i wanted to make sure that the getBoundingClientRect().top returned value is changed always to positive value
        
        notAbs=[sectionOnePlace,sectionTwoPlace,sectionThreePlace,sectionFourPlace];
        // a for loop to loop over the returned values of getBoundingClientRect().top and make sure they are positive
        for (i=0;i<sections.length;i++){
            relativePlace[i]= Math.abs(notAbs[i]);
        }

        //sorting the function ascendingly so that the smallest value(nearest section to top= section in viewport) will be at relativePlace[0]
        relativePlace.sort(function(a, b){return a - b});
        
        // after i got the smallest value, i check it with the values of each section to know to which section does this value belong
        if (relativePlace[0]=== Math.abs(sectionOnePlace)){
            viewedSection="section1";
        }else if(relativePlace[0]=== Math.abs(sectionTwoPlace)){
            viewedSection= "section2";
        }else if(relativePlace[0]=== Math.abs(sectionThreePlace)){
            viewedSection= "section3";
        }else if(relativePlace[0]=== Math.abs(sectionFourPlace)){
            viewedSection= "section4";
        }
        
        // this function sets a class attribute to the section in viewport to make it in active state
        // it searches for it using the id string from viewedSection var
        function changeActiveClass(){ 
            currentActive=document.getElementById(viewedSection);
            currentActive.setAttribute("class","your-active-class"); 
        } 
        // The next step after setting active state to the section in viewport was to remove it from all other sections
        // this was tricky, so i cloned the sections array to a new array called cloneSections
        // Then i used the viewedSection var to know the index of the section in viewport
        // Then i removed that section from the cloneSections array using splice method
        // so now i have an array that have all sections except the one in viewport
        // and now i can make a loop to iterate over that array removing the attribute class responsible for the active state

        
        function removeClass(){
            let cloneSections=[];
            for(i=0;i<sections.length;i++){
            cloneSections.push(sections[i].getAttribute("id"));
            }
            let index= cloneSections.indexOf(viewedSection);
            
            
            cloneSections.splice(index,1);
            
            for (i=0;i<cloneSections.length;i++){
                let toRemove=document.getElementById(cloneSections[i])
                toRemove.removeAttribute("class");
            }
           }
           // here i am calling the functions in the corrct order
        changeActiveClass(viewedSection);
        removeClass(viewedSection);
        return viewedSection;
    
}



  

// This function changes the background color of the section viewed in the nav bar

 document.addEventListener("scroll",function(){
  
    for (i=0;i<sections.length;i++){
    navActiveState[i].classList.remove("nav-active-class");
    let name = navActiveState[i].getAttribute("data-active");
    if (sectionInView===name){
    navActiveState[i].classList.add("nav-active-class");
   }}
   
 });


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
 
*/
// this event listens to every scroll user do and make sure that the active section feature is working

document.addEventListener("scroll", function(){
    nearestToTop();
    sectionInView = nearestToTop();
    
});

// this event listener is for the menu icon when the site is used on 600px width phones or less
// it listens to the click event and accordingly it adds or remove the class responsible for 
// the appearence and disappearence of the sections menu
iconBtn.addEventListener('click', function() {
   navbarLinks.classList.toggle("toggle_button");
  })
 
// Scroll to section on link click


//This event listener checks that the DOM is loaded first because the nav bar is created
// dynamically so if the function works directly we will get and error
// The data-active attribute holds the same string value as the id of each section
// this allowed me to make this function
// Its main purpose is to scroll smoothly to the desired section when the anchor on nav is clicked
  document.addEventListener('DOMContentLoaded', function() {
    for (i=0;i<4;i++){
        navActiveState[i].addEventListener("click", (e)=>{
            e.preventDefault();
            let sectionTogoId = e.target.getAttribute("data-active");
            let sectionTogo = document.getElementById(sectionTogoId);
            sectionTogo.scrollIntoView({behavior: "smooth"});
    
        })
      }
 }, false);
 

// Build menu 
createList();


