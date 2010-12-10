(function($){

  $.fn.makeGravatars = function() {
    $(this).each(function(el) {
      var username = $(this).text().replace(' ','.').toLowerCase();
      var email = username + "@factorylabs.com";
      var email_hash = MD5(email);
      var gravatar = 'http://www.gravatar.com/avatar/' + email_hash + '.jpg?s=60&d=http://factorylabs.github.com/images/gravatar_default.jpg';

      $(this).parents('div.post').prepend("<div class='avatar'><img src='" + gravatar + "' /></div>");
    });
  };

})(jQuery);
