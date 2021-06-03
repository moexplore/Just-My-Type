$(document).ready(function () {
  let upperKey = $("#keyboard-upper-container");
  let lowerKey = $("#keyboard-lower-container");
  let sentences = [
    "ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate",
  ];
  let sentence = $("#sentence");
  let yellow = $("#yellow-block");
  let feedback = $("#feedback");
  let target = $("#target-letter");
  let startTime, endTime;
  let shiftDown = false;
  let i = 0;
  let j = 0;
  let counter = 0;
  let y = 17.5;
  let mistakes = 0;

  sentence.append(sentences[0]);
  target.append(sentences[0][0]);
  $(upperKey).css("display", "none");

  function start() {
    startTime = new Date();
  }

  function end() {
    console.log("start of end function");
    endTime = new Date();
    let timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds
    let seconds = Math.round(timeDiff);
    console.log(seconds + " seconds");
    let minutes = seconds / 60;
    console.log(minutes + " minutes");
    let numberOfWords = 54;
    console.log(mistakes + " mistakes");
    let wordsPerMinute = numberOfWords / minutes - 2 * mistakes;

    setTimeout(function () {
      let yes = $('<a href="javascript:location.reload(true)">Yes</a>');
      console.log("Almost at end");
      feedback.append($('<br>'))
      feedback.append(" Would you like to play again ");
      feedback.append(yes);
    }, 5000);
    console.log("set timeout function");
    feedback.empty();
    feedback.append(wordsPerMinute + " words per minute");
  }

  $(document).keypress(function (e) {
    counter++;
    if (counter === 1) {
      start();
      console.log("Started!");
    }
    $("#" + e.keyCode).addClass("highlight");
    if (e.key == target.text()) {
      target.empty();
      j++;
      target.append(sentences[i][j]);
      y = y + 17.5;
      yellow.css("left", y + "px");
      //Had to include the creation of the span in the function.  Was only adding 1 when I just had the feedback.append
      let spanglyph1 = $('<span class ="glyphicon glyphicon-ok"</span>');
      feedback.append(spanglyph1);
    } else {
      let spanglyph2 = $('<span class ="glyphicon glyphicon-remove"</span>');
      feedback.append(spanglyph2);
      mistakes++;
    }
    if (j >= sentences[i].length) {
      i++;
      if (i <= 4) {
        j = 0;
        y = 17.5;
        yellow.css("left", y + "px");
        sentence.empty();
        sentence.append(sentences[i]);
        target.append(sentences[i][j]);
        feedback.empty();
      } else {
        console.log("Game End");
        end();
      }
    }
  });

  $(document).keydown(function (e) {
    if (e.shiftKey) {
      $(upperKey).css("display", "block");
      $(lowerKey).css("display", "none");
      shiftDown = true;
    }
  });
  
  $(document).keyup((e) => {
    $(".highlight").removeClass("highlight");
    if (e.keyCode == 16) {
      $(upperKey).toggle();
      $(lowerKey).toggle();
    }
  });
});
