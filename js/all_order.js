const Http = new XMLHttpRequest();
const url='/select';
Http.open("GET", url);
Http.send();
Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var json = JSON.stringify(Http.responseText);
        
        for (var item = 0; item < json.length; item++) {
            var row = document.createElement("div");
            row.className = "row item";
            var col = [];
            for (var i = 0; i < 5; i++) col.push(document.createElement("div"));
            col[0].className = "col-2";
            col[0].innerHTML = json[item].order_id;
            col[1].className = "col-2";
            col[1].innerHTML = json[item].order_date;
            col[2].className = "col-2";
            col[2].innerHTML = json[item].order_status;
            col[3].className = "col-3";
            col[3].innerHTML = json[item].cus_name;
            col[4].className = "col-3";
            if (json[item].order_status === "New order") {
                var btn = document.createElement("button");
                btn.type = "button";
                btn.className = "btn btn-primary";
                btn.innerHTML = "CONFIRM";
                col[4].appendChild(btn);
            }
            for (var i = 0; i < 5; i++) row.appendChild(col[i]);
            document.getElementById("orders").appendChild(row);
        }
    }
}

// var json = [{
//     order_id: "0001",
//     order_date: "25/11/18",
//     order_status: "Quotation sent",
//     cus_name: "Siam Usha"
// }, {
//     order_id: "0002",
//     order_date: "31/11/18",
//     order_status: "New order",
//     cus_name: "Yoss Company"
// }]
// for (var item = 0; item < json.length; item++) {
//     var row = document.createElement("div");
//     row.className = "row item";
//     var col = [];
//     for (var i = 0; i < 5; i++) col.push(document.createElement("div"));
//     col[0].className = "col-2";
//     col[0].innerHTML = json[item].order_id;
//     col[1].className = "col-2";
//     col[1].innerHTML = json[item].order_date;
//     col[2].className = "col-2";
//     col[2].innerHTML = json[item].order_status;
//     col[3].className = "col-3";
//     col[3].innerHTML = json[item].cus_name;
//     col[4].className = "col-3";
//     if (json[item].order_status === "New order") {
//         var btn = document.createElement("button");
//         btn.type = "button";
//         btn.className = "btn btn-primary";
//         btn.innerHTML = "CONFIRM";
//         col[4].appendChild(btn);
//     }
//     for (var i = 0; i < 5; i++) row.appendChild(col[i]);
//     document.getElementById("orders").appendChild(row);
// }