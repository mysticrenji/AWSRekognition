//Load aws-sdk module 

var AWS = require("aws-sdk"); 
var StringBuilder = require("stringbuilder")
const Stream = require('stream')
const Speaker = require('speaker')
AWS.config.loadFromPath('./config.json');

//Get the recognition object handle
var recognition = new AWS.Rekognition();
/*
var landscapeParams= {
Image: {
  S3Object: {
   Bucket: "s3rekognition",
   Name: "Wolf.jpg"
   }
  },
   MinConfidence: 80
};

//Call the service
recognition.detectLabels(landscapeParams, function(error, response) {
 if (error) console.log(error, error.stack); // an error occurred
 else 
 {
  console.log("-------- START: Object and scene detection --------");
  var labels = response.Labels;
  for(var i=0; i<labels.length; i++)
  {
   console.log("Name ="+labels[i].Name+", Confidence ="+labels[i].Confidence);  
  }
  console.log("-------- END: Object and scene detection --------");
  console.log("\n");
 }
});
*/

/*
//Prepare the input parameters
var faceParams = {
 Image: {
  S3Object: {
   Bucket: "s3rekognition",  
   Name: "Messi.jpg"
  }
 },
 Attributes: [
    "ALL"
  ]
};

*/

//Image Comparison

//Prepare the input parameters
var params = {
 SourceImage: {
  S3Object: {
   Bucket: "s3rekognition",
   Name: "Source1.jpg"
  }
 },
 TargetImage: {
  S3Object: {
   Bucket: "s3rekognition",
   Name: "Me.jpg"
  }
 },
 SimilarityThreshold: 80 //only allow a match of atleast 80%
};

//Call the service
recognition.compareFaces(params, function(error, response) {
 if (error) console.log(error, error.stack); // an error occurred
 else 
 {
  if(response.FaceMatches != null && response.FaceMatches.length > 0)
  {
   console.log("-------- START: Face Comparison --------");
   console.log("Renjith match found with similarity of ->"+response.FaceMatches[0].Similarity+"%");
   console.log("-------- END: Face Comparison --------");
   console.log("\n");
  }
 }
});




/*

//AWS Polly Initialisation
 // Create an Polly client
    const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-west-2'
})

// Create the Speaker instance
  const Player = new Speaker({
  channels: 1,
  bitDepth: 16,
  sampleRate: 16000
})

 


//Call the service
//var sb = new StringBuilder( {newline:'\r\n'} );
recognition.detectFaces(faceParams, function(error, response) {
 if (error) console.log(error, error.stack); // an error occurred
 else 
 {
  
 // console.log("-------- START: Facial analysis --------");
  var faceDetails = response.FaceDetails[0];
  var script = ""
        + "<speak>"
        + "<p>"
        + "Starting Facial Analysis"
        + "</p>"
        + "<p>"
        + "Person is smiling"
        + faceDetails.Smile.Value
        + "</p>"
        + "<p>"
        + "Person is wearing sunglasses"
        + faceDetails.Sunglasses.Value
        + "</p>"
        + "</speak>";
/*  
 sb.appendLine("Starting Facial Analysis");
  sb.appendLine("Person is smiling :"+faceDetails.Smile.Value)
  sb.appendLine("Person is wearing sunglasses :"+faceDetails.Sunglasses.Value)
  sb.appendLine("Person gender :"+faceDetails.Gender.Value)
  sb.appendLine("Person has beard :"+faceDetails.Beard.Value) */
/*
  console.log("Person is smiling :"+faceDetails.Smile.Value);
  console.log("Person is wearing sunglasses :"+faceDetails.Sunglasses.Value);
  console.log("Person gender :"+faceDetails.Gender.Value);
  console.log("Person has beard :"+faceDetails.Beard.Value);
  console.log("Person has mustache :"+faceDetails.Mustache.Value);
  console.log("Person has EyesOpen :"+faceDetails.EyesOpen.Value);
  console.log("-------- END: Facial analysis --------");
  console.log("\n");
*/
 

/*
let params = {
    'Text': script ,
    'OutputFormat': 'pcm',
    'VoiceId': 'Kimberly',
    'TextType': "ssml",
    'SampleRate': "16000"
 }




Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
        console.log(err.code)
    } else if (data) {
        if (data.AudioStream instanceof Buffer) {
            // Initiate the source
            var bufferStream = new Stream.PassThrough()
            // convert AudioStream into a readable stream
            bufferStream.end(data.AudioStream)
            // Pipe into Player
            bufferStream.pipe(Player)
        }
    }
})

 }
});
*/
