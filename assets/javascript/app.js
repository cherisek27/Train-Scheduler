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

  $("#trainTable > tbody").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + moment(nextTrainTime).format("hh:mm") + "</td><td>" + minsUntilTrain); 

  return false; 

}); 
 

