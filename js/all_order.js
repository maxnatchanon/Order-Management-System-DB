const Http = new XMLHttpRequest();
const url='/select';
Http.open("GET", url);
Http.send();
Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        console.log(JSON.stringify(Http.responseText));

        // TODO: Add order list to html
    }
}

