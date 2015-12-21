$(document).ready(function(){
    
    var x = document.getElementById("from")
    var y = document.getElementById("to")
    var maxWeight    
    
        var duck = function (d){
          var location = d.rsp.locations
            for (var index in location) {
                var item = location[index];
                var name = item.name;
                var value = item.value;
                var option1 = new Option(name.toLowerCase(), value)
                var option2 = new Option(name.toLowerCase(), value); 
                                
                x.add (option1)
                y.add (option2)
        }
}
        $.ajax({
            url: 'http://emspost.ru/api/rest/?method=ems.get.locations&type=russia&plain=true',
            dataType: "jsonp",
            success: duck      
        })
               
        var cat = function (e){maxWeight = e.rsp.max_weight}
        $.ajax({
            url: 'http://emspost.ru/api/rest/?method=ems.get.max.weight&plain=true',
            dataType: "jsonp",
            success: cat     
            
        })
        
        
         var input = document.getElementById('weight');
         
         
        $('#ems').on( 'submit' , function() {
          $.ajax({
            url: 'http://emspost.ru/api/rest/?method=ems.calculate&from='+x.value+'&to='+y.value+'&weight='+input.value+'&plain=true',
            dataType: "jsonp",
            success: result 
        })
            return false;
        })
        
        var result = function (u){
            price = u.rsp.price
            termMin = u.rsp.term.min
            termMax = u.rsp.term.max
            
            $('#price').text(price)
            $('#term').text(termMin+' - '+termMax)
            $('#result').show()
        }


    
    $("select").select2({
        placeholder: "Выберете регион или город",
        formatNoMatches : function(term) {       
        return "нет совпадений";
    }
    })
        
    $("#ems").validate({
        
       ignore: [],

       rules:{
           
            weight:{
                required: true,
                min: 0,
                max: 31.5
            }
       },
       messages:{

            weight:{
                required: "Это поле обязательно для заполнения",
                min: "Введите корректное значение веса",
                max: "Максимальный возможный вес 31.5кг"
            }
       }
    })
    $("select, input").on("keyup blur change", function(){
      if ($("#ems").valid()) {
        
        $("#button").prop("disabled", false)
        
        $("#button").stop().animate({
              backgroundColor: "#fff)",
          }, 1200)
        }
      else {
        $("#button").prop("disabled", "disabled")
        
        $("#button").stop().animate({
              backgroundColor: "#ffffff",
          }, 1200)
    }
})
})
