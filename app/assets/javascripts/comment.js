$(function(){
  function buildHTML(message){
    
    var image = message.image == null ?  "" : `<img src= "${message.image}", class= 'lower-message__image'/>`
   
    
    var html = `<div class='contents__right' data-id=${ message.id }>
                  <div class='contents__right__text'>
                    <li>
                    ${message.user_name}
                    </li>
                    <li class='fff'>
                    ${message.created_at}
                    </li>
                  </div>
                  <div class='contents__right__text-details'>
                    <p class='contents__right__text-details__a'>
                    ${message.text}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.contents-messages').append(html)
    $('.new_message')[0].reset();
    $('.contents-messages').animate({scrollTop: $('.contents-messages')[0].scrollHeight})
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
    $('.form__submit').prop("disabled", false);
    });
  })
})