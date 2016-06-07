(function App() {

   var items = [];
   var index = 0;

   function init() {
      $('body').append('<div class="top-controls"></div>');
      $('.top-controls').append('<div><input class="checker-all" type="checkbox">Check all</div>');
      $('.top-controls').append('<div><button class="del-checked">Delete checked</button></div>');
      $('.top-controls').append('<textarea class="input-box" placeholder="enter new item"></textarea>');
      $('.top-controls').append('<div><ul class="item-list"></ul></div>');


      $('.checker-all').change(function(){ checkAll(); });

      $('.input-box').keypress(function() {
         if (event.keyCode == 13) {
            event.preventDefault();
            addEntry();
         }
      });

      $('.del-checked').click(function(){ deleteChecked();});
   }


   function addEntry() {
      items.push({
                  key : index,
                  value : $('.input-box')[0].value,
                  marked : false
                  });
      
      console.log(items);

      var html = '<li id="'+index+'"><input class="checker" type="checkbox"><span state="show" class="text">'
      +$('.input-box')[0].value +'</span><button class="del-btn" hidden>del</button></li>';
      var id = '#'+index;
      $('.item-list').append(html); 

      $(id).find('.text').dblclick(function(){ beginEdit(event);});

      $(id).find('.checker').change(function(){checkEntry(event);});

      $(id).find('.del-btn').click(function(){deleteEntry(event);});

      $(id).mouseenter(function(){
         $(id).find('.del-btn').toggle();
      });

      $(id).mouseleave(function(){
         $(id).find('.del-btn').toggle();
      });

      $('.input-box')[0].value = '';
      index++;
   }

   function beginEdit(event) {
      var id = event.target.parentElement.id;
      var el = $('#'+id).find('.text');

      if(el.attr('state')=='show') {
         el.html('<textarea>'+el[0].textContent+'</textarea>');
         el.attr('state','edit');

         // handling 'enter' and 'esc' when editing entries
         $('#'+id).find('.text').find('textarea').keydown(function(e){ 
            if(e.keyCode == 13){
               e.preventDefault();
               var item = items.filter(function(i){return i.key  == id;})[0]; 
               item.value = el.children()[0].value;
               el.attr('state','show');
               el.html(el.children()[0].value);
            }
            if(e.keyCode == 27){
               e.preventDefault(); 
               el.attr('state','show');
               el.html(el[0].textContent);
            }
         });
      }
   }

   function checkEntry(event){
         var id = event.target.parentElement.id;
         var item = items.filter(function(i){return i.key  == id;})[0];
         var el = $('#'+id).find('.text');
         if(item.marked){
            item.marked = false;
            el.attr('style', '');
            $('.check-all').prop('checked',false);
         } else {
            item.marked = true;
            el.attr('style', 'text-decoration:line-through;opacity:0.6;');
         } 
   }

   function deleteEntry(event){
      var id = event.target.parentElement.id;
      var item = items.filter(function(i){return i.key  == id;})[0];
      items.splice(items.indexOf(item),1);
      $('#'+id).remove();
   }

   function checkAll(){
      if($('.checker-all').prop('checked')){
         items.forEach(function(el){
            el.marked = true;
            $('#'+el.key).find('.text').attr('style', 'text-decoration:line-through;opacity:0.6;');
            $('#'+el.key).find('.checker').prop('checked',true);
         });
      } else {
            items.forEach(function(el){
            el.marked = false;
            $('#'+el.key).find('.text').attr('style', '');
            $('#'+el.key).find('.checker').prop('checked',false);
         });
      }
   }

   function deleteChecked(){
      for(var i = 0; i < items.length; i++){
         if(items[i].marked){
            $('#'+items[i].key).remove();
            items.splice(items[i],1);
            i--;
         }
      }
   }

   $(document).ready(init);

})();