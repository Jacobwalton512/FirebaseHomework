var config = {
    apiKey: "AIzaSyCcPFcbAjIsgXGQwE-A3AcOXkeD40qypE8",
    authDomain: "train-times-93583.firebaseapp.com",
    databaseURL: "https://train-times-93583.firebaseio.com",
    storageBucket: "train-times-93583.appspot.com"
  }; 
  firebase.initializeApp(config); 
  var trainData = firebase.database();
  
  $("#addTrain").on("click", function() {
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();
  
    var Train = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
    trainData.ref().push(Train);
    alert("Train added!");
    return false;
  });
  
  trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var trainFirstTrain = childSnapshot.val().firstTrain;
  
    var timeArr = trainFirstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var trainMinutes;
    var trainArrival;
  //This method im still confused on moment?**
    if (maxMoment === trainTime) {
      trainArrival = trainTime.format("hh:mm A");
      trainMinutes = trainTime.diff(moment(), "minutes");
    } else {
      var differenceTimes = moment().diff(trainTime, "minutes");
      var trainRemainder = differenceTimes % tFrequency;
      trainMinutes = trainFrequency - trainRemainder;
      tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
    $("#trains > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
            trainFrequency + "</td><td>" + trainArrival + "</td><td>" + trainMinutes + "</td></tr>");
  });
  
  