//Declare Variables//
let todayDate = moment().format("MMMM Do YYYY");

let timeNow = moment().format("H A");

//display todayDate on page using jquery with id of #currentDay
$("#currentDay").text(todayDate);

//Creating a variable call "dailyWork" in array of objects"
const dailyWork = [
  { time: "9 A.M.", event: "" },
  { time: "10 A.M.", event: "" },
  { time: "11 A.M.", event: "" },
  { time: "12 P.M.", event: "" },
  { time: "1 P.M.", event: "" },
  { time: "2 P.M.", event: "" },
  { time: "3 P.M.", event: "" },
  { time: "4 P.M.", event: "" },
  { time: "5 P.M.", event: "" },
  { time: "6 P.M.", event: "" },
];

//get local storage by parsing//
let workEl = JSON.parse(localStorage.getItem("work"));
if (workEl === true) {
  dailyWork = workEl;
}

//Create rows on the webpage COPIED NEED TO CHANGE IT BACK
dailyWork.forEach(function (helloTime, index, array) {
  let labelMyTime = helloTime.time;
  let blockColor = colorfulRows(labelMyTime);
  let row =
    '<div class="time-block" id="' +
    index +
    '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
    labelMyTime +
    '</div><textarea class="form-control ' +
    blockColor +
    '">' +
    helloTime.event +
    '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

  //Make the rows append to the webpage
  $(".container").append(row);
});

function colorfulRows(time) {
  let planYourSchedule = moment(timeNow, "H A");
  let planYourEntry = moment(time, "H A");
  if (planYourSchedule.isBefore(planYourEntry) === true) {
    return "future";
  } else if (planYourSchedule.isAfter(planYourEntry) === true) {
    return "past";
  } else {
    return "present";
  }
}

//Save events on the click of a button and setItem on local storage
$(".saveBtn").on("click", function () {
  let blockOfId = parseInt($(this).closest(".time-block").attr("id"));
  let userInput = $.trim($(this).parent().siblings("textarea").val());

  dailyWork[blockOfId].event = userInput;

  //set local storage in this function
  localStorage.setItem("work", JSON.stringify(dailyWork));
});
