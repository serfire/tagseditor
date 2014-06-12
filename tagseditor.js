(function($) {

  $.fn.makeTagsEditor = function(userOptions) {



    TagsEditor = function(self) {

      interfaceMarkup = function(id, settings) {
        var markup = '<div id="' + id + '-tags-editor" class="tagseditor"><div id="' + id + '-addTag">';
        if (settings.interactive) {
          markup = markup + '<input id="' + id + '-input" value="" data-default="' + settings.defaultText + '" />';
        }
        markup = markup + '</div><div class="tags-clear"></div></div>';
        return markup;
      };

      addTag = function(val, after) {

        var tagMark = '<span class="tag">' + val + '</span>';
        if (data.tags.length == 0) {
          $(data.tags_group_wrapper).prepend($(tagMark));
        } else {
          if (after == undefined) {
            after = $(data.cursor);
          }
          $(tagMark).insertAfter(after);
        }
        // data.tags.splice(data.cursor, 0, val);
      };

      addFakeInput = function(val, after) {
        if (index != undefined) {
          data.cursor = index;
        }
        if (val == undefined) {
          val = '';
        }
        var tagMark = '<span ><input id="' + id + '-input" data-default="' + options.defaultText + '" value="' + val + '" /></span>';
        $(tagMark).insertAfter($(data.tags_group)[data.cursor])
        $(data.fake_input).on('keypress', function(e) {
          if (String.fromCharCode(e.which) == (options.delemiter)) {
            e.preventDefault();
            addTag($(data.fake_input).val().trim());
            $(data.fake_input).val('');
          }
        });
      };

      tagSelected = function(tag) {
        var selected = tag.attr('data-selected');
        $(data.tags_group).each(function(index, elem) {
          if ($(this).is(tag)) {
            data.cursor = $(this).attr('id');
            if (selected == undefined) {
              $(this).attr('data-selected', true);
              $(this).addClass('data-selected');
            } else {
              $(this).removeAttr('data-selected');
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
          values.forEach(function(v, index) {
            addTag(v, index)
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
        defaultText: 'input tag',
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
        fake_input: '#' + id + '-input',
      };


      init = function() {
        var value = $(data.real_input).val();
        $(interfaceMarkup(id, options)).insertAfter($('#' + id));
        if (value != undefined) {
          importTags(value);
        }
        console.log(data.cursor);
        addFakeInput();

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