(function($) {

  $.fn.makeTagsEditor = function(userOptions) {

    

    TagsEditor = function(id) {

      addTag = function(val){
        alert(val)
      };

      importTags = function(vals){
        var values = vals.split(options.delemiter)
        if(values != undefined){
          values.forEach(function(v){
            addTag(v)
          })
        }
      };

      var $self = this,
        inputs = new Array(),
        options,
        data,
        defaultOptions,
        cursor = 0;
      defaultOptions = {
        width: '300px',
        height: '100px',
        delemiter: ',',
      };
      options = $.extend(true, {}, defaultOptions, userOptions);
      data = {
        cursor: 0,
        tags: new Array(),
        pid: id,
        real_input:'#' + id,
        tag_wraper
      };
      var value = $(data.real_input).val();
      if(value != undefined){
        importTags(value);
      }

      



    };

this.each(function() {
      var id = $(this).attr('id');
      var editor = new TagsEditor(id);
    });
  };

})(jQuery);