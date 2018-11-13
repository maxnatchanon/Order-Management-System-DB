const Http = new XMLHttpRequest();
const url='/selectorder';
Http.open("GET", url);
var orderId = {order_id: 1}
Http.send(orderId);
Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var json = JSON.parse(Http.responseText);

        for (var i = 0; i < json.length; item++) {
            var row = document.createElement("div");
            row.className = "row item";
            row.id = (json[i].model_id).toString();
            var col1 = document.createElement("div");
            col1.className = "col-3";
            col1.innerHTML = json[i].model_name;
            row.appendChild(col1);
            var col2 = document.createElement("div");
            col2.className = "col-2";
            var btn = document.createElement("button");
            btn.className = "btn btn-primary";
            btn.innerHTML = "VIEW";
            col2.appendChild(btn);
            row.appendChild(col2);
            var col3 = document.createElement("div");
            col3.className = "col-2";
            var input = document.createElement("input");
            input.type = "text";
            col3.appendChild(input);
            row.appendChild(col3);
            document.getElementById("orders").appendChild(row);
        }
    }
}

function confirmPrice() {

    // Lopp through models and send update price request
    var items = document.getElementsByClassName("item");
    var sumPrice = 0;
    for (var i = 0; i < items.length; i++) {
        var modelId = parseInt(items[i].id);
        var modelPrice = items[i].getElementsByTagName("input")[0].value;
        modelPrice = parseInt(modelPrice);
        sumPrice += modelPrice;
        sendPriceUpdateReq(modelId, modelPrice)
    }
    // Send order update request with sumPrice
    sendOrderUpdateReq(orderId.order_id, "JuilnwZa", sumPrice);
    
}

function sendPriceUpdateReq(modelId, modelPrice) {

    // Create new http post request
    var xhr = new XMLHttpRequest();
    var url = "/updateprice";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    // Create and send data
    var obj = {
        model_id: modelId,
        model_price: modelPrice
    }
    var data = JSON.stringify(obj);
    xhr.send(data);

}

function sendOrderUpdateReq(orderId, adminUsername, quoPrice) {

    // Create new http post request
    var xhr = new XMLHttpRequest();
    var url = "/update";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    // Create and send data
    var obj = {
        order_id : orderId,
        admin_username : adminUsername,
        quo_price : quoPrice
    }
    var data = JSON.stringify(obj);
    xhr.send(data);

}