var accessToken = "7d4f45de34c64ab696990f4b81151ddd",
      baseUrl = "https://api.api.ai/v1/",
      $speechInput,
      $recBtn,
      recognition,
      messageRecording = "Recording...",
      messageCouldntHear = "I couldn't hear you, could you say that again?",
      messageInternalError = "Oh no, there has been an internal server error",
      messageSorry = "I'm sorry, I don't have the answer to that yet.";

    $(document).ready(function() {
      $speechInput = $("#speech");
      $recBtn = $("#rec");

      $speechInput.keypress(function(event) {
        if (event.which == 13) {
          event.preventDefault();
          send();
        }
      });
      $recBtn.on("click", function(event) {

        if (window.SpeechSynthesisUtterance === undefined) {
      // Not supported
        } else {
        switchRecognition();
    }
      });
      $(".debug__btn").on("click", function() {
        $(this).next().toggleClass("is-active");
        return false;
      });
    });

    function startRecognition() {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
          recognition.interimResults = false;

      recognition.onstart = function(event) {
        //respond(messageRecording);
        updateRec();
      };
      recognition.onresult = function(event) {
        recognition.onend = null;
        
        var text = "";
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
          }
          setInput(text);
        stopRecognition();
      };
      recognition.onend = function() {
        respond(messageCouldntHear);
        stopRecognition();
      };
      recognition.lang = "en-US";
      recognition.start();
    }
  
    function stopRecognition() {
      if (recognition) {
        recognition.stop();
        recognition = null;
      }
      updateRec();
    }

    function switchRecognition() {
      if (recognition) {
        stopRecognition();
      } else {
        startRecognition();
      }
    }

    function setInput(text) {
      $speechInput.val(text);
      send();
    }

    function updateRec() {
      $recBtn.text(recognition ? "Stop" : "Speak");
    }
var strResultText="";
var strdivcontainer="";
var strdivrequest="";
var strdivresponse="";



var i=0;
    function send() {
      var text = $speechInput.val();
    i++;
         /*************************************************************************************** */
strdivrequest= '<div id="userRequest'+(i+1)+'" class="user-request">'+
                           '<div class="user-request__text"></div>'+
                          '</div>';
strdivcontainer= $("#container").html();




$("#container").html(strdivcontainer+strdivrequest);
//  $("#container").html(  '<div id="userRequest" class="user-request">'+
//                            '<div class="user-request__text"></div>'+
//                           '</div>'+
//             '<div id="spokenResponse" class="server-response">'+
//                   '<div class="spoken-response__text"></div>'+
//             '</div>');

//             $("#container").html($("#userRequest").addClass("is-active").find(".user-request__text").html(text));

            //$("#container").scrollTop($("#container").prop("scrollHeight"));


/***************************************************************************************************** */
     var inputid="#userRequest"+(i+1)
      $(inputid).addClass("is-active").find(".user-request__text").html(text);
                         
      $speechInput.val("");
      $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({query: text, lang: "en", sessionId: "sessionId_userid_username_role"}),

        success: function(data) { 
          //alert( JSON.stringify(data, undefined, 2))
          prepareResponse(data);
        },
        error: function() { 
          //alert(JSON.stringify(data, undefined, 2))
          respond(messageInternalError);
        }
        
      });
      
    }

    function prepareResponse(val) {
      var debugJSON = JSON.stringify(val, undefined, 2);
      if(val.result.speech!=undefined)
      {
        spokenResponse = val.result.speech;
      }
      else if (val.result.fulfillment.speech !=undefined)
      {

        spokenResponse = val.result.fulfillment.speech;
      }
      else
      {
        spokenResponse=messageInternalError;

      }
    
      respond(spokenResponse);
      debugRespond(debugJSON);
    }

    function debugRespond(val) {
      $("#response").text(val);
    }
    var j=0;
    function respond(val) {
    j++;

      if (val == "") {
        val = messageSorry;
      }
    if (window.SpeechSynthesisUtterance == undefined) {
      // Not supported
    } else {
      //var voices = speechSynthesis.getVoices();


      // var msg1 = new SpeechSynthesisUtterance("");
      //  msg1.text = "";
      //   msg1.voice=voices[3];
      //   msg1.voiceURI ="native";
      //   msg1.lang = "en-US";
      //   window.speechSynthesis.speak(msg1);


      // for(var i = 0; i < 7; i++ ) {
      //   //console.log("Voice " + i.toString() + ' ' + voices[i].name + ' ' + voices[i].uri);
      // }
       // Read my text
      if (val != messageRecording) {
        
        var msg = new SpeechSynthesisUtterance();
        msg.text = val;
        //msg.voice=voices[3];
        msg.voiceURI ="native";
        msg.lang = "en-US";
        window.speechSynthesis.speak(msg);
        // alert( "index " + i + "Name "+ voices[i].name +" uri " +voices[i].uri);
      }
           
    }
      
  strdivresponse='<div id="spokenResponse'+(j+1)+'" class="server-response">'+
                  '<div class="spoken-response__text"></div>'+
            '</div>';

strdivcontainer= $("#container").html();

$("#container").html(strdivcontainer+strdivresponse);
var responseid="#spokenResponse"+(j+1)

      $(responseid).addClass("is-active").find(".spoken-response__text").html(val);
      //$("#resultWrapper").addClass("scrollDown")
// setInterval(function () {
//     $("#resultWrapper").load("apiai.html");

//    $("#resultWrapper").animate({
//         scrollDown: 500}, -500);

// }, 1000);
// alert($("#resultWrapper")[0].scrollHeight);

 $("#resultWrapper").animate({
        scrollTop: $("#resultWrapper")[0].scrollHeight}, -500);

}