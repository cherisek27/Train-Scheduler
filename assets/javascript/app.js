// Steps to complete:

// 1. Create Firebase link
// 2. Create initial train data in database
// 3. Create button for adding new trains - then update the html + update the database
// 4. Create a way to retrieve trains from the trainlist.
// 5. Create a way to calculate the time way. Using difference between start and current time.
//    Then take the difference and modulus by frequency. (This step can be completed in either 3 or 4)

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBaWbHIAaLbfv81sXd6Ie1af0ObmenQu94",
    authDomain: "train-scheduler-5fd8c.firebaseapp.com",
    databaseURL: "https://train-scheduler-5fd8c.firebaseio.com",
    projectId: "train-scheduler-5fd8c",
    storageBucket: "train-scheduler-5fd8c.appspot.com",
    messagingSenderId: "410749264874" 

  }; 

  firebase.initializeApp(config); 


  var database = firebase.database(); 


  $("#submit").on("click", function(){

  	var newName = $("#trainName").val().trim(); 
  	var newDestination = $("#destination").val().trim(); 
  	var newFirstTime = $("#firstTime").val().trim(); 
  	var newFrequency = $("#frequency").val().trim(); 

    var newTrain = {
      name: newName,
      dest: newDestination, 
      first: newFirstTime, 
      freq: newFrequency,
    }

  	database.ref().push(newTrain);
  	
  	$("#trainName").val(""); 
    $("#destination").val(""); 
    $("#firstTime").val(""); 
    $("#frequency").val("");

    console.log("newTrain: " + newTrain); 
    console.log("Name: " + newTrain.name); 
    console.log("Destination: " + newTrain.dest);
    console.log("First Time: " + newTrain.first); 
    console.log("Frequency: " + newTrain.freq); 

    return false; 

  }); 
 

  database.ref().on("child_added", function(childSnapshot, prevChildKey){ 

    console.log("Child Snapshot Value: " + childSnapshot.val());

    var newName = childSnapshot.val().name; 
    var newDestination = childSnapshot.val().dest; 
    var newFirstTime = childSnapshot.val().first; 
    var newFrequency = childSnapshot.val().freq; 

    console.log('newFirstTime', newFirstTime)
    console.log("newName: " + newName);
    console.log("newDestination: " + newDestination);
    console.log("newFrequency: " + newFrequency);
  
  var currentTime = moment(); 
  console.log(moment(currentTime).format("hh:mm A")); 

  var firstTimeConverted = moment(newFirstTime, "hh:mm A").subtract(1, "days");
 
  timeDiff = moment().diff(moment(firstTimeConverted), "minutes"); 
  console.log("Difference in time: " + timeDiff);

  var remainder = timeDiff % newFrequency; 
  console.log("Remainder: ", remainder);

  var minsUntilTrain = newFrequency - remainder; 
  console.log("Time Til Train: " + minsUntilTrain); 

  var nextTrainTime = moment().add(minsUntilTrain, "minutes"); 
  console.log("Next arrival: " + moment(nextTrainTime).format("hh:mm A")); 

  $("#trainTable > tbody").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + moment(nextTrainTime).format("hh:mm A") + "</td><td>" + minsUntilTrain); 

  return false; 

}); 
// Assume the following situations.

// (TEST 1)
// First Train of the Day is 3:00 AM
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? ( Let's use our brains first)
// It would be 3:18 -- 2 minutes away

// (TEST 2)
// First Train of the Day is 3:00 AM
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Let's use our brains first)
// It would be 3:21 -- 5 minutes away


// ==========================================================

// Solved Mathematically
// Test case 1:
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically
// Test case 2:
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21

