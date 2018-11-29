var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    var json = JSON.parse(xmlHttp.responseText);
    document.getElementById('order_id').innerHTML = sessionStorage.getItem('order_id');
    for (var i = 0; i < json.length; i++) {
      var row = document.createElement("div");
      row.className = "row item";
      row.id = json[i].model_id.toString();
      var col1 = document.createElement("div");
      col1.className = "col-4";
      col1.innerHTML = json[i].model_name;
      row.appendChild(col1);
      var col2 = document.createElement("div");
      col2.className = "col-3";
      var btn = document.createElement("button");
      btn.className = "btn btn-primary";
      btn.innerHTML = "VIEW";
      col2.appendChild(btn);
      row.appendChild(col2);
      var col3 = document.createElement("div");
      col3.className = "col-4";
      var input = document.createElement("input");
      input.type = "text";
      col3.appendChild(input);
      row.appendChild(col3);
      document.getElementById("orders").appendChild(row);
    }
  }
};
console.log(sessionStorage.getItem('order_id'))
var order_id = sessionStorage.getItem('order_id');
xmlHttp.open("GET", "/selectorder" + "?" + "orderId="+order_id, true); // true for asynchronous
var orderId = { order_id: order_id};
xmlHttp.send(null);


function confirmPrice() {
  // Lopp through models and send update price request
  var items = document.getElementsByClassName("item");
  var sumPrice = 0;
  for (var i = 0; i < items.length; i++) {
    var modelId = parseInt(items[i].id);
    var modelPrice = items[i].getElementsByTagName("input")[0].value;
    console.log(modelPrice);
    if(isNaN(modelPrice) || modelPrice === '') {
      alert("invalid input");
      return 
    }
    modelPrice = parseInt(modelPrice);
    sumPrice += modelPrice;
    sendPriceUpdateReq(modelId, modelPrice);
  }
  // Send order update request with sumPrice
  sendOrderUpdateReq(orderId.order_id, "JuilnwZa", sumPrice);
  // window.location.href = "/allorder";
  alert('Quotation sent!');
  window.location.href = "/allorder";
}

function sendPriceUpdateReq(modelId, modelPrice) {
  // Create new http post request
  var xhr = new XMLHttpRequest();
  var url = "/updateprice";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
    }
  };
  // Create and send data
  var obj = {
    model_id: modelId,
    model_price: modelPrice
  };
  var data = JSON.stringify(obj);
  xhr.send(data);
}

function sendOrderUpdateReq(orderId, adminUsername, quoPrice) {
  // Create new http post request
  var xhr = new XMLHttpRequest();
  var url = "/update";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
    }
  };
  // Create and send data
  var obj = {
    order_id: orderId,
    admin_username: adminUsername,
    quo_price: quoPrice
  };
  var data = JSON.stringify(obj);
  xhr.send(data);
}
