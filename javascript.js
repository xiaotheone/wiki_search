
// title, description,pageURL;
var results = [];

$(document).ready(function(){
  
  $("button").click(function(){
    var userInput = $("#input").val();
    if(userInput ==""){
     $(".content").html("");
     $(".content").append("<h1>"+"Please type some texts in the search box"+"</h1>");
      return;
      }
    else{
   searchWiki(userInput);
      }
    
  })
});

function display(){
  
    
  $(".content").html("");
  
  for(var i = 0 ; i < results.length; i++){
    
    var title = "<h3>"+results[i].title+"</h3>";
    var description = "<p>"+results[i].description+"</p>";
    var content = '<div class = "wiki-content">' +title+description +'</div>';
    var link = "<a class = 'wiki-link' href ="+'"'+results[i].pageURL+'"'+'target = "blank"'+">"+content+"</a>";
    
    
     $(".content").append(link);
   
    
    //$(".content").append("</div>");
    
  }
}
function searchWiki(term){
   //empty array after each call
  results = [];
 
  $.ajax({
    headers: { 'Access-Control-Allow-Origin': 'Example/1.0' },
    dataType: 'jsonp',
    url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+term,
    type: 'GET',
    success: function(data) {
      
        if(data.query==null)
           {$(".content").html("");
           $(".content").append("<h1>"+"No Relevant Wiki Entry Found"+"</h1>");
            return;
          }
       var gotData = data.query.pages;
       var pagelink = 'https://en.wikipedia.org/?curid=';
      //loop through data got from api call and store them in results[] array 
      
   Object.keys(gotData).forEach(key => {
  results.push({title:gotData[key].title,description:truncate(gotData[key].extract),pageURL:  pagelink+gotData[key].pageid});
     });
      display();
       }
     })

   
};
function truncate(data){
  var newdate
  if(data.length>150)
    {
    return data.substring(0,150) + "..."
    }
  else
    {
      return data;
    }
}

  
  



