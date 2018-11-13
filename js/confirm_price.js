const Http = new XMLHttpRequest();
const url='/selectorder';
Http.open("GET", url);
Http.send();
Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var json = JSON.parse(Http.responseText);

        for (var i = 0; i < json.length; item++) {
            var row = document.createElement("div");
            row.className = "row item";
            row.id = i;
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