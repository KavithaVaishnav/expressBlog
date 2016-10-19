$(document).ready(function(){
   
   $.get('data.json',function(data){
        alert(1);
   	 data.forEach(function(value,key) {
      var mainDiv = $('<div class="blog"></div>');
        var titles =  $('<h2 class="title col-xs-12">'+value.title+'</h2>')
          $(mainDiv).append(titles);
          var img = $('<img class="col-xs-3" src="'+value.img+'" />');
           $(mainDiv).append(img);
          var p= $('<p class="postContent col-xs-8">'+value.postContent+'</p>');
           $(mainDiv).append(p);
           var date=$('<span class="date pull-left">'+value.date+'</span>');
            $(mainDiv).append(date);
           var author=$('<span class="author pull-right">'+value.author+'</span>');
           $(mainDiv).append(author);
           $(mainDiv).append('<div class"clearfix"></div>');
           $('.posts').append(mainDiv);
   	 });
   })
});

