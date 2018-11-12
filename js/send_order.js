function addItem() {
    var row = document.createElement("div");
    row.className = "row item-data";

    var modelName = document.createElement("div");
    modelName.className = "col-5 col";
    var input1 = document.createElement("input");
    input1.type = "text";
    input1.name = "ModelName";
    input1.className = "modelName";
    modelName.appendChild(input1);
    row.appendChild(modelName);

    var quantity = document.createElement("div");
    quantity.className = "col-1 col";
    var input2 = document.createElement("input");
    input2.type = "text";
    input2.name = "Quantity";
    input2.className = "quantity";
    quantity.appendChild(input2);
    row.appendChild(quantity);

    var blueprint = document.createElement("div");
    blueprint.className = "col-4 col";
    var input3 = document.createElement("input");
    input3.type = "file";
    input3.name = "Blueprint";
    input3.accept = "image/*";
    input3.className = "blueprint";
    blueprint.appendChild(input3);
    row.appendChild(blueprint);



    document.getElementById("items").appendChild(row);
}

function sendOrder() {
    var xhr = new XMLHttpRequest();
    var url = "/insert";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    var itemList = createObj();
    var data = JSON.stringify(itemList);
    xhr.send(data);
}

function createObj() {
    var itemList = {
        cus_id: "", // TODO: Add cus_id
        items: []
    }
    var itemData = document.getElementsByClassName("item-data");
    for (var i = 0; i < itemData.length; i++) {
        var item = {
            model_name : "",
            blueprint : "", 
            amount : ""
        }
        item.model_name = itemData.item(i).getElementsByClassName("modelName")[0].value;
        item.blueprint = itemData.item(i).getElementsByClassName("blueprint")[0].value;
        item.amount = itemData.item(i).getElementsByClassName("quantity")[0].value;
        itemList.items.push(item);
    }
    return itemList;
}