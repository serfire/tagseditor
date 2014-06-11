(function($) {

  $.fn.makeTagsEditor = function(userOptions) {



    TagsEditor = function(self) {

      interfaceMarkup = function(id, settings) {
        var markup = '<div id="' + id + '-tags-editor" class="tagseditor"><div id="' + id + '-addTag">';
        if (settings.interactive) {
          markup = markup + '<input id="' + id + '-tag" value="" data-default="' + settings.defaultText + '" />';
        }
        markup = markup + '</div><div class="tags-clear"></div></div>';
        return markup;
      };

      addTag = function(val, index) {
        if (index != undefined) {
          data.cursor = index;
        }
        var tagMark = '<span class="tag">' + val + '</span>';
        $(data.tags_group_wrapper).prepend($(tagMark));

        data.tags.splice(data.cursor, 0, val);
      };

      tagSelected = function(tag) {
        var selected = tag.attr('data-selected') || false;
        $(data.tags_group).each(function(index, elem) {
          if ($(this).is(tag)) {
            data.cursor = index;
            if (selected == undefined || selected == false) {
              $(this).attr('data-selected', true);
              $(this).addClass('data-selected');
            } else {
              $(this).attr('data-selected', false);
              $(this).removeClass('data-selected');

            }
          } else {
            $(this).removeClass('data-selected');
            $(this).removeAttr('data-selected');
          }
        });

      };

      importTags = function(vals) {
        var values = vals.split(options.delemiter)
        if (values != undefined) {
          values.forEach(function(v) {
            addTag(v)
          })
        }
      };



      var $self = this,
        inputs = new Array(),
        id = $(self).attr('id'),
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
        real_input: '#' + id,
        tags_group_wrapper: '#' + id + '-tags-editor',
        tags_group: '#' + id + '-tags-editor' + '>.tag',
        input_wrapper: '#' + id + '-addTag',
        fake_input: '#' + id + '-tag',
      };


      init = function() {
        var value = $(data.real_input).val();
        $(interfaceMarkup(id, options)).insertAfter($('#' + id));
        if (value != undefined) {
          importTags(value);
        }
        $(data.tags_group).on('click', data, function(e) {
          var tag = $(this)
          tagSelected(tag);
        });
      };

      init();

    };

    this.each(function() {
      var editor = new TagsEditor(this);
    });
  };

})(jQuery);