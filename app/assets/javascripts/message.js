$(function() {
  //省略

  var buildMessageHTML = function(message) {
      //data-idが反映されるようにしている
      var addImage = message.image? `<img src=${message.image} class="lower-message__image" > ` : ""; 
  
      var html = `<div class="message" data-id=${ message.id }>
        div class="upper-message"> 
          <div class="upper-message__user-name">
            ${message.username }
          </div>
          <div class="upper-message__date">
           ${ message.created_at }
          </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
            ${message.content }
            </p>
          ${addImage}
        </div>
       </div>`
   
    return html;
  };
    var reloadMessages = function() {
      if (window.location.href.match(/groups\/\d+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $(".contents__right").last().attr("data-id");
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id},
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildMessageHTML(message);
          $(".contents-messages").append(insertHTML);
        })
        $(".contents-messages").animate({scrollTop: $(".contents-messages")[0].scrollHeight},500);
      })
      .fail(function() {
        alert('error');
      });
    };
  };
    setInterval(reloadMessages, 5000);
 });

