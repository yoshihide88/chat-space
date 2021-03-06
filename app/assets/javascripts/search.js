$(function(){

var serch_list = $("#user-search-result")
function appendUsers(users){
   var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${users.name}</p>
               <div class="user-search-add  chat-group-user__btn  chat-group-user__btn--add" data-user-id="${users.id}"     data-user-name="${users.name}">追加</div>
               </div>`
   serch_list.append(html);
}

function appendErrUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p>${user}</p>
              </div>`

  serch_list.append(html);
}

  $('#user-search-field').on('keyup', function(e){
    var input = $("#user-search-field").val();

    var js = $(".js-user");
    var arr = [];
    js.each(function(i,ele)  {
      arr.push(ele.value);
    } )

    if (input.length == 0){
      $("#user-search-result").empty();
      return;
    }
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input,
              userid: arr },
      dataType: 'json'
    })
    
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {    
        users.forEach(function(user){
          appendUsers(user);
        });
      }
      else{
        appendErrUser("ユーザ検索に失敗しました");
      }
    })
  });
  $('#user-search-result').on('click','.user-search-add',function(){
   var id = $(this).data("user-id")
   var name =$(this).data('user-name')
   
   var user_list = $(".chat-group-users")

    var html2 = `<div class='chat-group-user'>
      <input name='group[user_ids][]' type='hidden' value='${id}' class='js-user'>
      <p class='chat-group-user__name'>${name}</p>
      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
    </div>`
   user_list.append(html2);
   $(this).parent().remove();
  })
  $(document).on('click','.user-search-remove', function(){
    
    $(this).parent().remove();
  
  });

});