const Http = new XMLHttpRequest();
const url = "/selectadmin";
Http.open("GET", url);
Http.send();
Http.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var json = JSON.parse(Http.responseText);
    console.log(json[0].order_date);
    for (var item = 0; item < json.length; item++) {
      var row = document.createElement("div");
      row.className = "row item";
      var col = [];
      for (var i = 0; i < 5; i++) col.push(document.createElement("div"));
      col[0].className = "col";
      col[0].innerHTML = json[item].order_id;
      col[1].className = "col-2";
      //edit date
      var isoDate = new Date(json[item].order_date).toLocaleDateString()
      var date = isoDate.slice(3,6) + isoDate.slice(0,3) + isoDate.slice(6,10)
      col[1].innerHTML = date
      col[2].className = "col-3";
      col[2].innerHTML = json[item].order_status;
      col[3].className = "col-3";
      col[3].innerHTML = json[item].cus_name;
      col[4].className = "col-3";
      if (json[item].order_status === "New order") {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-primary";
        btn.innerHTML = "CONFIRM";
		    btn.setAttribute("onclick", "goToConfirm("+json[item].order_id+")");
        col[4].appendChild(btn);
      }
      for (var i = 0; i < 5; i++) row.appendChild(col[i]);
      document.getElementById("orders").appendChild(row);
    }
  }
};

/* TEST DATA */
// json = [
//   {order_id: 1, order_date: "21/11/18", order_status: "Sent quotation", cus_name: "Mobile BNK48"},
//   {order_id: 2, order_date: "21/11/18", order_status: "New order", cus_name: "Mobile BNK48"},
//   {order_id: 3, order_date: "21/11/18", order_status: "Delivered", cus_name: "Mobile BNK48"}
// ]
// for (var item = 0; item < json.length; item++) {
//   var row = document.createElement("div");
//   row.className = "row item";
//   var col = [];
//   for (var i = 0; i < 5; i++) col.push(document.createElement("div"));
//   col[0].className = "col";
//   col[0].innerHTML = json[item].order_id;
//   col[1].className = "col-2";
//   col[1].innerHTML = json[item].order_date;
//   col[2].className = "col-3";
//   col[2].innerHTML = json[item].order_status;
//   col[3].className = "col-3";
//   col[3].innerHTML = json[item].cus_name;
//   col[4].className = "col-3";
//   if (json[item].order_status === "New order") {
//     var btn = document.createElement("button");
//     btn.type = "button";
//     btn.className = "btn btn-primary";
//     btn.innerHTML = "CONFIRM";
//     btn.setAttribute("onclick", "goToConfirm()");
//     col[4].appendChild(btn);
//   }
//   for (var i = 0; i < 5; i++) row.appendChild(col[i]);
//   document.getElementById("orders").appendChild(row);
// }

function goToConfirm(idx) {
  if (confirm("Cancel order #" + idx + "?")) {
    sessionStorage.setItem("order_id",idx);
    window.location.href = "/confirm_price"
  }
}
