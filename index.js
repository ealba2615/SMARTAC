    var aboutText = "";
    var aboutArray;
    
    function readTextFile(file)
    {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                aboutText = allText;
            }
        }
    }
    rawFile.send(null);
    }

    function splitText(text){
        var textArray = text.split("\n");
        return textArray;
    }

    readTextFile("/copies/about.txt");
    aboutArray = splitText(aboutText);

    var line1Text = aboutArray[0];
    var line2Text = aboutArray[3];
    var line3Text = aboutArray[6];
    var line4Text = aboutArray[9];
    
    var factsJson = (function() {
        var json = null;
        $.ajax({
          'async': false,
          'global': false,
          'url': "/copies/facts.json",
          'dataType': "json",
          'success': function(data) {
            json = data;
          }
        });
        return json;
      })();

    var factsTextList = "";

    function readFactsList(){
        for(let i = 0; i < factsJson.facts.length; i++){
            factsTextList += "<li>";
            factsTextList += factsJson.facts[i];
            factsTextList += "</li><br>";
        }
    };

    readFactsList();

    console.log(factsTextList);
    
    const About = {
        template : '<div class="aboutSection">' + 
        '<img src="assets/tx-seal.png" class="txSeal">'
        + '<br><h1 class="aboutHeader">About Texas</h1> \n' + 
        '<div class="flagBlock"><img src="assets/tx-flag.png" class="txFlag"><br>'
        + line1Text + '<br><br><br>' + line2Text + '</div><br><br><br>' +  
        '<div class="flagMap"><img src="assets/tx-map.jpg" class="txMap"><br>'
        + line3Text + '<br><br><br>' + line4Text + '</div><br><br><br>'
        + '</div>'
    }
    const Facts = {
         template: `<div><h1 class="factsHeader">Fun Facts About Texas</h1> 
        <ul id="txFactsList"> 
        ${factsTextList}</ul></div>`
    }
    
    const routes = [
      { path: '/', component: About },  
      { path: '/about', component: About },
      { path: '/facts', component: Facts }
    ]
    
    const router = new VueRouter({
      routes
    })
    
    const app = new Vue({
      router
    }).$mount('#app');
    