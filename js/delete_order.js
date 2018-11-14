const Http = new XMLHttpRequest();
const url='/select';
Http.open("GET", url);
var cusId = {cus_id_orders: 1} // TODO: Edit cus_id
Http.send(cusId);
Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var json = JSON.parse(Http.responseText);
        
        for (var item = 0; item < json.length; item++) {
            var row = document.createElement("div");
            row.className = "row item";
            var col = [];
            for (var i = 0; i < 4; i++) col.push(document.createElement("div"));
            col[0].className = "col-2";
            col[0].id = "order_id";
            col[0].innerHTML = json[item].order_id;
            col[1].className = "col-2";
            col[1].innerHTML = json[item].order_date;
            col[2].className = "col-3";
            col[2].innerHTML = json[item].order_status;
            col[3].className = "col-5";
            var btn1 = document.createElement("button");
            btn1.type = "button";
            btn1.className = "btn btn-primary";
            btn1.innerHTML = "DETAIL";
            col[3].appendChild(btn1);
            if (json[item].order_status === "Quotation sent" || json[item].order_status === "New order") {
                var btn2 = document.createElement("button");
                btn2.type = "button";
                btn2.className = "btn btn-danger";
                btn2.innerHTML = "CANCEL";
                btn2.onclick = "cancelOrder(" + item + ")";
                col[3].appendChild(btn2);
            }
            else {
                btn1.style = "margin-right: 105px";
            }
            for (var i = 0; i < 4; i++) row.appendChild(col[i]);
            document.getElementById("orders").appendChild(row);
        }
    }
}

function cancelOrder(idx) {
    if (confirm("Cancel order #" + idx + "?")) {
        // Create new http post request
        var xhr = new XMLHttpRequest();
        var url = "/delete";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
            }
        };
        // Create and send data
        var items = document.getElementsByClassName("item");
        var orderId = items[idx].getElementById("order_id").innerHTML;
        var obj = {
            order_id: orderId
        }
        var data = JSON.stringify(obj);
        xhr.send(data);
    }

}