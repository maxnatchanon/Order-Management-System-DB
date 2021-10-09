function addItem() {
  // Create new row
  var row = document.createElement("div");
  row.className = "row item-data";

  // Create model name text input then append to row
  var modelName = document.createElement("div");
  modelName.className = "col-5";
  var input1 = document.createElement("input");
  input1.type = "text";
  input1.name = "ModelName";
  input1.className = "modelName";
  modelName.appendChild(input1);
  row.appendChild(modelName);

  // Create quantity text input then append to row
  var quantity = document.createElement("div");
  quantity.className = "col-2";
  var input2 = document.createElement("input");
  input2.type = "text";
  input2.name = "Quantity";
  input2.className = "quantity";
  quantity.appendChild(input2);
  row.appendChild(quantity);

  // Create blueprint picture input then append to row
  var blueprint = document.createElement("div");
  blueprint.className = "col-5";
  var input3 = document.createElement("input");
  input3.type = "file";
  input3.name = "Blueprint";
  input3.accept = "image/*";
  input3.className = "blueprint";
  blueprint.appendChild(input3);
  row.appendChild(blueprint);

  // Append row to container
  document.getElementById("items").appendChild(row);
}

function sendOrder() {
  // Create new http post request
  var xhr = new XMLHttpRequest();
  var url = "/insert";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      //var json = JSON.parse(xhr.responseText);
      console.log("sent");
      window.location.href = '/delete_order';
    }
  };
  // Create and send data
  var itemList = createObj();
  if(itemList === false) {
    alert("invalid input")
    return;
  }
  var data = JSON.stringify(itemList);
  xhr.send(data);
}

function createObj() {
  // Create empty item list with cus_id
  var itemList = {
    cus_id: "1", // TODO: Add cus_id
    items: []
  };

  // Get all item-data elements then loop through each element
  var itemData = document.getElementsByClassName("item-data");
  for (var i = 0; i < itemData.length; i++) {
    // Create item data from each element then append to itemList
    var item = {
      model_name: itemData.item(i).getElementsByClassName("modelName")[0].value,
      blueprint: itemData.item(i).getElementsByClassName("blueprint")[0].value,
      amount: itemData.item(i).getElementsByClassName("quantity")[0].value
    };
    if (isNaN(item.amount)||item.amount==='') return false;
    if (item.model_name === '') return false;
    
    // getImageBinary(
    //   itemData.item(i).getElementsByClassName("blueprint")[0],
    //   itemData.item(i).getElementsByClassName("modelName")[0].value
    // );
    itemList.items.push(item);
  }

  return itemList;
}

function getImageBinary(input, model_name) {
  var fReader = new FileReader();
  fReader.readAsBinaryString(input.files[0]);
  fReader.onloadend = function(event) {
    //console.log(event.target.result);
    if (typeof model_name != "undefined") {
      sendBlueprintReq(model_name, event.target.result);
      //console.log({mn: model_name, blueprint: event.target.result});
    }
    //img.src = 'data:image/jpeg;base64,' + btoa(event.target.result);
  };
}

function sendBlueprintReq(modelName, blueprintBin) {
  // Create new http post request
  var xhr = new XMLHttpRequest();
  var url = "/updateblueprint";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
    }
  };
  // Create and send data
  var item = { model_name: modelName, blueprint: blueprintBin };
  var data = JSON.stringify(item);
  xhr.send(data);
}
