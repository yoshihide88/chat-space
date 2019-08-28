$(function(){
  function buildHTML(message){
    
    var image = message.image
    
    if(!image){
      var image = ("")
    }else{
      var image =  `<img src= "${image}", class= 'lower-message__image'/>`
    }
    
    var html = `<div class='contents__right'>
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
    console.log(url)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
  .done(function(data){
    console.log(data);
    var html = buildHTML(data);
    console.log(html)
    $('.contents-messages').append(html)
    $('.form__message').val('')
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