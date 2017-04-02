# DBSU10-SmartClock wiki



[Visit the SmartClock here](http://2id60.win.tue.nl/~s141726/)

**Note**: the following source was used to create the basics of the clock --> [Link](https://www.youtube.com/watch?v=WnAGsXUJPYA)

## What is the SmartClock?



A regular clock on the wall has as main (and only) purpose to display the current time. In order to be on time with all our daily activities we often look at the clock to see what the current time is, which in turn helps determine how much time is left till you have to do something else or how much time has passed since you started a certain activity. A Clock only helps us to know the current time, but the calculation and organization of activities based on the knowledge of the current time takes place in our head. We want to simplify this thought process by displaying your daily activities directly on a clock. We believe this gives a better presentation of the activities during the day and helps organize them better.

## What does/can the SmartClock do? 



* The SmartClock allows users to create new activities and drag them on to the clock. The activities are displayed as icons which represent the activity and can be dragged to the outer border of the clock on the desired time.  
* The SmartClock is able to receive data (from OOCSI), in the form of time stamps, from other devices and display those on the clock.
* The SmartClock allows users to reschedule activities by dragging/repositioning icons already being displayed on the clock.
* The SmartClock can send data about activities back to other module when such a request comes in.

## How to send an activity (data) to the SmartClock via OOCSI?



There are 5 parameters required to successfully display an activity on the clock:


1. `SmartClock` - The name of the channel the SmartClock is subscribed to (listening to).
2. `moduleName` - The name of the module/device sending the data. 
3. `timeStampMin` - The current time in minutes.
4. `timeStampHour` - The current time in hours.
5. `actCategory` - The category for the activity to be places it.


Sending data via OOCSI can be done with the following statement:

for example: 

``` 
//define variables  
String module = "pizzaButton";    
int currentMin = minute(); //gets current time in minutes (1-59)    
int currentHour = hour(); //gets current time in hours (1-12)
String category = "B";   

//send data    
oocsi  
   .channel("SmartClock")    
      .data("moduleName", module)    
         .data("timeStampHour", currentHour)    
            .data("timeStampMin", currentMin)    
               .data("actCategory", category)    
                  .send();
```






