(function($) {

  $.fn.makeTagsEditor = function(userOptions) {

    this.each(function() {

      var editor = new TagsEditor();
    });

    TagsEditor = function() {

      var $self = this,
        id = this.attr('id'),
        inputs = new Array(),
        options,
        data,
        defaultOptions,
        cursor = 0;
      defaultOptions = {
        width: '300px',
        height: '100px',
      };
      options = $.extend(true, {}, defaultOptions, userOptions);
      data = {
        cursor: 0,
        tags: new Array(),
        real_input:
      };

    };


  };

})(jQuery);