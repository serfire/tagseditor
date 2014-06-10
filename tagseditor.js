(function($) {

  $.fn.makeTagsEditor = function(userOptions) {

    

    TagsEditor = function(id) {

      interfaceMarkup = function(id, settings){
        var markup = '<div id="' + id + '-tags-editor" class="tagseditor"><div id="' + id + '-addTag">';
    if (settings.interactive) {
      markup = markup + '<input id="' + id + '-tag" value="" data-default="' + settings.defaultText + '" />';
    }
    markup = markup + '</div><div class="tags-clear"></div></div>';
    return markup;
      };

      addTag = function(val, index){
        if(index == undefined){
          index = data.cursor;
        }

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
        input_wrapper:'#' + id + '-addTag',
        fake_input: '#' + id + '-tag',
      };


            init = function(){
var value = $(data.real_input).val();
      $(interfaceMarkup(id, options)).insertAfter($('#' + id));
      if(value != undefined){
        importTags(value);
      }
      };

      init();

    };

  this.each(function() {
      var id = $(this).attr('id');
      var editor = new TagsEditor(id);
    });
  };

})(jQuery);