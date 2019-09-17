
var firebaseConfig = {
    apiKey: "AIzaSyBgVLSufIVaIvwoxcd6GpOxa8YzmBZk4sE",
    authDomain: "train-scheduler-18bb8.firebaseapp.com",
    databaseURL: "https://train-scheduler-18bb8.firebaseio.com",
    projectId: "train-scheduler-18bb8",
    storageBucket: "",
    messagingSenderId: "540292416769",
    appId: "1:540292416769:web:c7bee3a452b4d012138700"
  };
  
  firebase.initializeApp(firebaseConfig);

  var trainData = firebase.database();

  $("addTrainBtn").on("click",function(){
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequencyInput").val().trim();
      
      console.log(firstTrain);
      return false;

  })

  trainData.ref().on("child_added", function(snapshot){
      var name = snapshot.val().name;
      var destination = snapshot.val().destination;
      var frequency = snapshot.val().frequency;
      var firstTrain = snapshot.val().firstTrain;

      var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
      var minutes = frequency - remainder;
      var arrival = moment().add(minutes, "m").format("hh:mm A");

      console.log(remainder);
      console.log(minutes);
      console.log(arrival);

      $("#trainTable >tbody").append("<tr><td"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"<td></tr>/");
  })