// var cookieArray = getAllCookies();
var array = []; //initilize empty array
var iterator = 0; //array iterator
var date = new Date(); //create new reference to date
var addState = 0;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var cx = windowWidth/2;
var cy = windowHeight/2;
var activityRandDeg = 0;
var activityRandR = 0;
var activityIconX = 0;
var activityIconY = 0;
var activityIconXN = 0;
  var activityIconX1= 0;
  var activityIconX2= 0;
  var activityIconX3= 0;
  var activityIconX4= 0;
  var activityIconX5= 0;
  var activityIconX6= 0;
  var activityIconY1= 0;
  var activityIconY2= 0;
  var activityIconY3= 0;
  var activityIconY4= 0;
  var activityIconY5= 0;
  var activityIconY6= 0;
  var name= 0;
  var hours= 0;
  var minutes= 0;
  var category= 0;
  var values= 0;

var addStatePlus= false;
//connect TU/e OOCSI server
OOCSI.connect("ws://oocsi.id.tue.nl");

//runs function when page is loaded
window.onload = function() {
  displayCookies();
};

//updates date variable every 1000 ms
setInterval(function(){
  var date = new Date();
  // updateTime(date);
  updateClock(date);
  // checkPizza();
}, 1000);

//updates the hands of the clock by apply transform on the styling
function updateClock(date){
  var secHand = document.getElementById("sec-hand").style;
  var minHand = document.getElementById("min-hand").style;
  var hrHand = document.getElementById("hr-hand").style;

  secHand.transform = "rotate(" + date.getSeconds() * 6 + "deg)";
  minHand.transform = "rotate(" + date.getMinutes() * 6 + "deg)";
  hrHand.transform = "rotate(" + (date.getHours() * 30 + date.getMinutes() * 0.5) + "deg)";
}

//creates unique number for cookies
function timeAsId() {
  var id = date.getHours().toString() +
           date.getMinutes().toString() +
           date.getSeconds().toString();
  return id; //returns string in the form "hours+minutes+seconds"
}

// subscribe to "SmartClock" channel
OOCSI.subscribe("SmartClock", function(msg) {

  //name of the module which is trying to connect
   name = msg.data.moduleName;
  //current time in hours (using the hour() function in Processing)
   hours = msg.data.timeStampHour;
  //current time in minutes (using the minute() function in Processing)
   minutes = msg.data.timeStampMin;
  //activity catergory defined as A , B , C , D etc.
   category = smg.data.actCategory;

  displayActivity(name, hours, minutes);

   values = joinVariables(name, hours, minutes, category);
  setCookie(name, value);

});

//sets cookie
function setCookie(name, value) {
  var cookieName = name + timeAsId();
  Cookies.set(cookieName, value, { expires: 1 }); //cookie expires in 1 day
}

//display activity on clock from oocsi input
function displayActivity(name, hours, minutes) {
  //appends an activity icon as image to the HTML DOM
  var img = document.createElement("img");
  var clockDiv = document.getElementById("clock");
  clockDiv.appendChild(img);

  var iconID = name + "Icon";

  //get icon bassed on activity name
  //var activityDiv = document.getElementById(name).style;
  var activityIcon = document.getElementById(iconID).style;

  console.log("deg");
console.log(hours* 30 + minutes * 0.5);

var iconAngle=(hours * 30 + minutes * 0.5)-90;



iconAngle=iconAngle*(Math.PI/180);
  //rotates div containing icon to the correct time, then counter rotates icon
  var activitySetIconX = (0 + (Math.cos(iconAngle)) * (235));
  console.log(activitySetIconX);
  var activitySetIconY = (0 + (Math.sin(iconAngle)) * (235));
  activityIcon.transform = "translateX(" + activitySetIconX + "px) translateY(" + activitySetIconY + "px)";
  // activityIcon.left = activitySetIconX + "px";
 //activityIcon.top = activitySetIconY + "px";
  activityIcon.visibility = "visible";

     //activityIcon.setAttribute('data-x', activitySetIconX);
    //activityIcon.setAttribute('data-y', activitySetIconY);
/*if (activityIcon=="pizzaIcon"){
    interact('.pizzaIcon')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }

    },

    //manualStart: true,
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    
  });

 

    var target = event.target;
        // keep the dragged position in the data-x/data-y attributes
        
        //x = x + iconFixX;
        //y = y + iconFixY;
        console.log(x);


    // update the posiion attributes
    target.setAttribute('data-x', activityIconX);
    target.setAttribute('data-y', activityIconY);
    console.log("changed");
      window.dragMoveListener = dragMoveListener;
      

      }*/
}

//join values into one value
function joinVariables(name, hours, minutes, category) {
  //join the values into single value seperated by ":"
  //restult: string like "value:value:value"
  var join = [name, hours, minutes, category].join(":");
  return join;
}

 
var addState = document.getElementById("add");
addState.addEventListener("click", addClicked);
//addState.addEventListener("click", hideActivityOptions);
var activities;
var activitiesDiv;
var activitiesState;

function randomXandY() {
activityRandDeg = Math.floor((Math.random() * 360) + 0);
   activityRandR = Math.floor((Math.random() * 80) + 80);
   activityRandDeg=activityRandDeg*(Math.PI/180);
   activityIconX = (0 + (Math.cos(activityRandDeg) * (activityRandR)));
   activityIconY = (0 + (Math.sin(activityRandDeg) * (activityRandR)));
  
}

function displayActivityOptions(activities, activitiesDiv, activitiesState){
var img = document.createElement("img");
  var clockDiv = document.getElementById("clock");
  clockDiv.appendChild(img);
   
   activityRandDeg = Math.floor((Math.random() * 360) + 0);
   activityRandR = Math.floor((Math.random() * 80) + 80);
   activityRandDeg=activityRandDeg*(Math.PI/180);
   activityIconX = (0 + (Math.cos(activityRandDeg) * (activityRandR)));
   activityIconY = (0 + (Math.sin(activityRandDeg) * (activityRandR)));
  // activities.setAttribute('data-x', activityIconX);
   // activities.setAttribute('data-y', activityIconY);


  //var activityIconX2 = -1 * activityRandDeg;

 //activityIconXN= activityIconX++; 

  if (activities=="workIcon"){
    activityIconX1= activityIconX;
    activityIconY1= activityIconY;
    console.log("Work");
    console.log(activityIconX1);
  }
   if (activities=="coffeeIcon"){
    activityIconX2= activityIconX;
    activityIconY2= activityIconY;

        console.log("Coffee");
        console.log(activityIconX1);
        console.log(activityIconX2);

   while ((Math.abs(activityIconX2-activityIconX1)<60) && (Math.abs(activityIconY2-activityIconY1)<60)){
        
        
            randomXandY();
 
        //activityIconX=activityIconX5;
        //activityIconY=activityIconY5;
        console.log("collission");
        activityIconX2=activityIconX;
        activityIconY2=activityIconY;
        activityIconX=activityIconX2;
        activityIconY=activityIconY2;
      }
        
  }
    if (activities=="pizzaIcon"){
    activityIconX3= activityIconX;
    activityIconY3= activityIconY;

        console.log("Pizza");

      while (((Math.abs(activityIconX3-activityIconX2)  < 60) && (Math.abs(activityIconY3-activityIconY2)  < 60)) || ((Math.abs(activityIconX3-activityIconX1)<60) && (Math.abs(activityIconY3-activityIconY1)<60))){
        
        
            randomXandY();
 
        //activityIconX=activityIconX5;
        //activityIconY=activityIconY5;
        console.log("collission");
        activityIconX3=activityIconX;
        activityIconY3=activityIconY;
        activityIconX=activityIconX3;
        activityIconY=activityIconY3;
      }

         

    //manualStart: true,
    // enable autoScroll


    // call this function on every dragmove event
   
    // call this function on every dragend event
    
  
}

    if (activities=="dinnerIcon"){
    activityIconX4= activityIconX;
    activityIconY4= activityIconY;

        console.log("dinner");

        while (((Math.abs(activityIconX4-activityIconX3)  < 60) && (Math.abs(activityIconY4-activityIconY3)  < 60)) || ((Math.abs(activityIconX4-activityIconX2)  < 60) && (Math.abs(activityIconY4-activityIconY2)  < 60)) || ((Math.abs(activityIconX4-activityIconX1)<60) && (Math.abs(activityIconY4-activityIconY1)<60))){
        
        
            randomXandY();
 
        //activityIconX=activityIconX5;
        //activityIconY=activityIconY5;
        console.log("collission");
        activityIconX4=activityIconX;
        activityIconY4=activityIconY;
        activityIconX=activityIconX4;
        activityIconY=activityIconY4;
      }
}
    if (activities=="sportIcon"){
    activityIconX5= activityIconX;
        activityIconY5= activityIconY;

        console.log("Sport");

    console.log(activityIconX5);
    console.log(activityIconX4);
    console.log(activityIconX3);
    console.log(activityIconX2);
    console.log(activityIconX1);
    console.log("Y");
     console.log(activityIconY5);
    console.log(activityIconY4);
    console.log(activityIconY3);
    console.log(activityIconY2);
    console.log(activityIconY1);
    console.log("difference");
       
       while (((Math.abs(activityIconX5 - activityIconX4) < 60) && (Math.abs(activityIconY5-activityIconY4) < 60)) || ((Math.abs(activityIconX5-activityIconX3)  < 60) && (Math.abs(activityIconY5-activityIconY3)  < 60)) || ((Math.abs(activityIconX5-activityIconX2)  < 60) && (Math.abs(activityIconY5-activityIconY2)  < 60)) || ((Math.abs(activityIconX5-activityIconX1)<60) && (Math.abs(activityIconY5-activityIconY1)<60))){
        
        
            randomXandY();
 
        //activityIconX=activityIconX5;
        //activityIconY=activityIconY5;
        console.log("collission");
        activityIconX5=activityIconX;
        activityIconY5=activityIconY;
        activityIconX=activityIconX5;
        activityIconY=activityIconY5;
      }
        
     
   


       //activityIconX=activityIconX5;
        //activityIconY=activityIconY5;

        console.log("sportssssss");
        //displayActivityOptions(activities, activitiesDiv, activitiesState);

        //activityIconX=activityIconX5;
        activityIconXN=0;

  }


  


var allActivities= document.getElementById(activities).style;
   // 
  // var allActivitiesType= document.getElementById(activitiesDiv).style;
 //allActivities.transform = "translateY(" + activityIconY + "px) rotate(" + activityIconX2 + "deg)";
 //allActivitiesType.transform = "rotate(" + activityIconX + "deg)";
 allActivities.transform = "translateX(" + activityIconX + "px) translateY(" + activityIconY + "px)";
 //allActivities.left = activityIconX + "px";
 //allActivities.top = activityIconY + "px";

 //activityIcon.transform = "rotate(" + activityIconX2 + "deg)";
 allActivities.visibility = activitiesState;


}


function addClicked(){
     addStatePlus= !addStatePlus;

  if (addStatePlus==true) {
    
     activitiesState = "visible";
     activities = "workIcon";
     activitiesDiv = "work";
    displayActivityOptions(activities, activitiesDiv, activitiesState);

         activities = "coffeeIcon";
   // 
      activitiesDiv = "coffee";

    displayActivityOptions(activities, activitiesDiv, activitiesState);

         activities = "pizzaIcon";
   // 
      activitiesDiv = "pizza";

    displayActivityOptions(activities, activitiesDiv, activitiesState);

         activities = "dinnerIcon";
   // 
      activitiesDiv = "dinner";

    displayActivityOptions(activities, activitiesDiv, activitiesState);

         activities = "sportIcon";
   // 
      activitiesDiv = "sport";

    displayActivityOptions(activities, activitiesDiv, activitiesState);
    activityIconXN= 0;
}

  if (addStatePlus == false){
           activitiesState = "hidden";
     activities = "workIcon";
     activitiesDiv = "work";


    displayActivityOptions(activities, activitiesDiv, activitiesState);

         activities = "pizzaIcon";
   // 
      activitiesDiv = "pizza";

    displayActivityOptions(activities, activitiesDiv, activitiesState);

         activities = "coffeeIcon";
   // 
      activitiesDiv = "coffee";

    displayActivityOptions(activities, activitiesDiv, activitiesState);

         activities = "dinnerIcon";
   // 
      activitiesDiv = "dinner";

    displayActivityOptions(activities, activitiesDiv, activitiesState);

         activities = "sportIcon";
   // 
      activitiesDiv = "sport";

    displayActivityOptions(activities, activitiesDiv, activitiesState);

}
}
/*
$( document ).ready(function() {
interact('.pizzaIcon')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }

    },

    //manualStart: true,
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    
  });

 function dragMoveListener (event) {

    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        //x = x + iconFixX;
        //y = y + iconFixY;
        console.log(x);

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
      window.dragMoveListener = dragMoveListener;

  });*/




// get a reference to an element
var stage = document.getElementById('stage');
$stage = jQuery(stage);

// create a manager for that element
var manager = new Hammer.Manager(stage);

// create recognizers
var Pan = new Hammer.Pan();
var Rotate = new Hammer.Rotate();
var Pinch = new Hammer.Pinch();
var Tap = new Hammer.Tap({
  taps: 1
});
var DoubleTap = new Hammer.Tap({
  event: 'doubletap',
  taps: 2
});

// use them together
Rotate.recognizeWith([Pan]);
Pinch.recognizeWith([Rotate, Pan]);

DoubleTap.recognizeWith([Tap]);
Tap.requireFailure([DoubleTap]);

// add the recognizers
manager.add(Pan);
manager.add(Rotate);
manager.add(Pinch);
manager.add(DoubleTap);
manager.add(Tap);

// subscribe to events
var liveScale = 1;
var currentRotation = 0;
manager.on('rotatemove', function(e) {
    // do something cool
    var rotation = currentRotation + Math.round(liveScale * e.rotation);
    $.Velocity.hook($stage, 'rotateZ', rotation + 'deg');
});
manager.on('rotateend', function(e) {
    // cache the rotation
    currentRotation += Math.round(e.rotation);
});

var deltaX = 0;
var deltaY = 0;
manager.on('panmove', function(e) {
  // do something cool
  var dX = deltaX + (e.deltaX);
  var dY = deltaY + (e.deltaY);
  console.log($stage);
  $.Velocity.hook($stage, 'translateX', dX + 'px');
  $.Velocity.hook($stage, 'translateY', dY + 'px');
});
manager.on('panend', function(e) {
  deltaX = deltaX + e.deltaX;
  deltaY = deltaY + e.deltaY;
});

// subscribe to events
var currentScale = 1;
function getRelativeScale(scale) {
  return scale * currentScale;
}
manager.on('pinchmove', function(e) {
  // do something cool
  var scale = getRelativeScale(e.scale);
  $.Velocity.hook($stage, 'scale', scale);
});
manager.on('pinchend', function(e) {
  // cache the scale
  currentScale = getRelativeScale(e.scale);
  liveScale = currentScale;
});

var colors = [
  [20, 187, 95],
  [20, 95, 187],
  [187, 95, 20],
  [187, 20, 95],
  [95, 20, 187],
  [95, 187, 20]
];
function mult(a, b) {
  return Math.round(a * b);
}
function makeColor(rgb, adj) {
  adj = adj || 1;
  return 'rgb('+mult(rgb[0], adj)+','+mult(rgb[1], adj)+','+ mult(rgb[2], adj)+')';
}
var currentColorIndex = 0;
manager.on('tap', function(e) {
  currentColorIndex++;
  if (currentColorIndex >= colors.length) {
    currentColorIndex = 0;
  }
  stage.style.backgroundColor = makeColor(colors[currentColorIndex]);
  stage.style.borderColor = makeColor(colors[currentColorIndex], 0.85);
});

var isShrunken = false;
manager.on('doubletap', function() {
  console.log('doubletapped');
  var scale = $.Velocity.hook($stage, 'scale');
  if (isShrunken) {
    $.Velocity.hook($stage, 'scale', 2 * scale);
  } else {
    $.Velocity.hook($stage, 'scale', .5 * scale);
  }
  isShrunken = !isShrunken;
});





//when Create Activity button is clicked
function buttonCreate() {
  //get input from dropdown menu
  var nameTemp = document.getElementById('actPicker').value;
  //get input from textbox
  var timeTemp = document.getElementById("user_input").value;

  //timeTemp is of the form name:Category so we split on ":"
  var name = nameTemp.split(":");
  //activityTime is of the form HH:MM so we split on ":"
  var time = timeTemp.split(":");
  if (checkOverlap(time[0], time[1])) {
    displayActivity(name[0], time[0], time[1]);

    var joinedValues = joinVariables(name[0], time[0], time[1], name[1]);
    setCookie(name, joinedValues);
    sendActivity(name[0], time[0], time[1]);
  } else {
    window.alert("Another activity is already planned around this time!");
  }
}

function buttonReschedule() {
  //get input from dropdown menu
  var nameTemp = document.getElementById('actPicker').value;
  //get input from textbox
  var timeTemp = document.getElementById("user_input").value;

  //timeTemp is of the form name:Category so we split on ":"
  var name = nameTemp.split(":");
  //activityTime is of the form HH:MM so we split on ":"
  var time = timeTemp.split(":");

  var allCookies = Cookies.get(); //store all cookies in variable
  for (var key in allCookies) {
    if (allCookies.hasOwnProperty(key)) {
      var cKey= key;
      console.log(cKey);
      tempArray = allCookies[key].split(":");
      console.log(tempArray[0]);
      console.log(name[0]);
      if (tempArray[0] == name[0]) {
        var joinedValues = joinVariables(name[0], time[0], time[1], name[1]);
        Cookies.set(cKey, joinedValues, { expires: 1 }); //cookie expires in 1 day
        displayActivity(name[0], time[0], time[1]);
        if (name === "coffee") {
          var timeMin = ((parseInt(time[0])*60) + parseInt(time[1])) - ((parseInt(tempArray[1])*60) + parseInt(tempArray[2]));
          changeCoffee(timeMin);
        }
      }
    }
  }
}

function displayCookies() {
  var allCookies = Cookies.get(); //store all cookies in variable

  //store all values of the cookies in array
  for (var key in allCookies) {
    if (allCookies.hasOwnProperty(key)) {
      array.push(allCookies[key]);
    }
  }

  //loop trough array containing all activities and call displayActivity
  for (var i = 1; i < array.length; i++) {
    var tempArray = array[i].split(":");
    var nname = tempArray[0];
    var hhours = tempArray[1];
    var mminutes = tempArray[2];
    displayActivity(nname, hhours, mminutes);
  }
}

//removes all cookies
function removeAllCookies() {
  var allCookies = Cookies.get(); //store all cookies in variable

  for (var key in allCookies) {
    if (allCookies.hasOwnProperty(key)) {
      Cookies.remove(key);
    }
  }
  location.reload();
}

//send planned activity to other modules
function sendActivity(name, hours, minutes) {
  if (name === "coffee") {
    var timeMin = ((parseInt(hours)*60) + parseInt(minutes)) - ((date.getHours()*60) + date.getMinutes());
    sendCoffee(timeMin);
  }
}

function sendCoffee(time) {
  // JSON data object with two items, position and color
  var id = 2123;
  var data = {"caffee_who" : id, "caffee_amount" : 1, "coffee_time_to_wait" : time};
  console.log(time);
  console.log(data);
  // send data object to client "John"
  OOCSI.send("coffee_channel", data);
  console.log("data send");
}

function changeCoffee(time) {
  // JSON data object with two items, position and color
  var id = 2123;
  var data = {"caffee_command" : "change", "number" : 4, "caffee_who" : id, "caffee_amount" : 1, "coffee_time_to_wait" : time};
  console.log(time);
  console.log(data);
  // send data object to client "John"
  OOCSI.send("coffee_channel", data);
  console.log("data send");
}

//check if there are no overlapping activities at the chosen time
function checkOverlap(hours, minutes) {
  var array2D = [];
  var noOverlap = true;
  var tempArray;
  var allCookies = Cookies.get(); //store all cookies in variable
  for (var key in allCookies) {
    if (allCookies.hasOwnProperty(key)) {
      tempArray = allCookies[key].split(":");
      console.log(tempArray);
      array2D.push(tempArray);
      console.log(array2D);
    }
  }

  for (var i = 1; i < array2D.length; i++) {
    console.log(tempArray);
    var t1 = parseInt(hours)*60 + parseInt(minutes);
    var t2 = parseInt(array2D[i][1])*60 + parseInt(array2D[i][2]);
    console.log(t1);
    console.log(t2);
    if ((t2 < t1) && (t2 + 30 < t1)) {
      noOverlap = true;
      console.log(noOverlap);
    } else if ((t2 > t1) && (t2 - 30 > t1)) {
      noOverlap = true;
      console.log(noOverlap);
    } else {
      noOverlap = false;
      console.log(noOverlap);
      break;
    }
  }
  console.log(noOverlap);
  return noOverlap;
}

function currentActivity() {

}

//checks if there is a pizza activity planned
function checkPizza() {
  var array2D = [];
  var pizzaPlanned = false;
  var tempArray;
  var allCookies = Cookies.get(); //store all cookies in variable
  for (var key in allCookies) {
    if (allCookies.hasOwnProperty(key)) {
      tempArray = allCookies[key].split(":");
      array2D.push(tempArray);
    }
  }

  for (var i = 1; i < array2D.length; i++) {
    if (array2D[i][0] === "pizza") {
      console.log();
      var t2 = parseInt(array2D[i][1]);
      var t4 = t2.toString() + array2D[i][2] + "00";
      console.log(t2);
      console.log(t4);
      var currentT = parseInt((date.getHours()*60).toString() + date.getMinutes().toString() + date.getSeconds().toString());
      console.log(currentT);
      if (t2 === currentT) {
        pizzaPlanned = true;
        break;
      }
    }
  }
  console.log(pizzaPlanned);
  return pizzaPlanned;
}



// function getAllCookies() {
//   var array2D = [];
//   var tempArray;
//   var allCookies = Cookies.get(); //store all cookies in variable
//   for (var key in allCookies) {
//     if (allCookies.hasOwnProperty(key)) {
//       tempArray = allCookies[key].split(":");
//       array2D.push(tempArray);
//     }
//   }
// }
