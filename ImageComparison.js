//Load aws-sdk module 

var AWS = require("aws-sdk"); 
var script;
//var StringBuilder = require("stringbuilder")
const Stream = require('stream')
const Speaker = require('speaker')
AWS.config.loadFromPath('./config.json');

//Get the recognition object handle
var recognition = new AWS.Rekognition();

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

//Image Comparison

//Prepare the input parameters
var params = {
 SourceImage: {
  S3Object: {
   Bucket: "s3rekognition",
   Name: "Me.jpg"
  }
 },
 TargetImage: {
  S3Object: {
   Bucket: "s3rekognition",
   Name: "Source1.jpg"
  }
 },
 SimilarityThreshold: 80 //only allow a match of atleast 80%
};

//Call the service
recognition.compareFaces(params, function(error, response) {
	console.log("-------- Started CompareFaces Function --------");
 if (error) 
	 console.log(error, error.stack); // an error occurred
 else 
 {
  if(response.FaceMatches != null && response.FaceMatches.length > 0)
  {
   console.log("-------- START: Face Comparison --------");
   console.log("Photo match found with similarity of ->" +response.FaceMatches[0].Similarity+"%");
   console.log("-------- END: Face Comparison --------");
   console.log("\n");
   script = ""
        + "<speak>"
        + "<p>"
        + "Starting Facial Analysis"
        + "</p>"
        + "<p>"
        + "Photo match found with similarity of "
        + response.FaceMatches[0].Similarity + "%"
        + "</p>"
        + "</speak>";
  }
 }
 let paramsvoice = {
    'Text': script ,
    'OutputFormat': 'pcm',
    'VoiceId': 'Kimberly',
    'TextType': "ssml",
    'SampleRate': "16000"
 }


Polly.synthesizeSpeech(paramsvoice, (err, data) => {
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

});

