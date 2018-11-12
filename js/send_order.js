function addItem() {
    var row = document.createElement("div");
    row.className = "row";

    var modelName = document.createElement("div");
    modelName.className = "col-5 col";
    var input1 = document.createElement("input");
    input1.type = "text";
    input1.name = "ModelName";
    modelName.appendChild(input1);
    row.appendChild(modelName);

    var blueprint = document.createElement("div");
    blueprint.className = "col-3 col";
    var input2 = document.createElement("input");
    input2.type = "text";
    input2.name = "Blueprint";
    blueprint.appendChild(input2);
    row.appendChild(blueprint);

    var quantity = document.createElement("div");
    quantity.className = "col-1 col";
    var input3 = document.createElement("input");
    input3.type = "text";
    input3.name = "Quantity";
    quantity.appendChild(input3);
    row.appendChild(quantity);

    document.getElementById("items").appendChild(row);
}

function sendOrder() {
    console.log("TEST")
}