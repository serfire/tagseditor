(function($) {

  $.fn.makeTagsEditor = function(userOptions) {



    TagsEditor = function(self) {

      interfaceMarkup = function(id, settings) {
        var markup = '<div id="' + id + '-tags-editor" class="tagseditor"><div id="' + id + '-tags-wrapper"><span id="' + id + '-tags-header" /></div>';
        if (settings.interactive) {
          markup = markup + '<input id="' + id + '-input" value="" data-default="' + settings.defaultText + '" />';
        }
        markup = markup + '<div class="tags-clear"></div></div>';
        return markup;
      };

      appendTag = function(val) {
        addTag(val, $(data.tags_group_wrapper + ' > :last-child'));
      };

      addTagBefore = function(val, before) {
        var tagMark = '<span class="tag" >' + val + '</span>';
        if (before == undefined) {
          before = $(data.tag_header);
        }
        var tag = $(tagMark).insertBefore(before).on("click", data, tagSelect);
        // tag.on("click", data, tagSelect);
      };

      addTag = function(val, after) {

        var tagMark = '<span class="tag" >' + val + '</span>';
        if (after == undefined) {
          after = $(data.tag_header);
        }
        $(tagMark).insertAfter(after).on("click", data, tagSelect);
        // $(tagMark).on("click", data, tagSelect);
        // if (data.tags.length == 0) {
        //   $(data.tags_group_wrapper).prepend($(tagMark));
        // } else {
        //   if (after == undefined) {
        //     after = $(data.cursor);
        //   }
        //   $(tagMark).insertAfter(after);
        // }
        // data.tags.splice(data.cursor, 0, val);
      };

      addFakeInput = function(val, after) {
        if (after == undefined) {
          after = $(data.tags_group_wrapper + ' > :last-child');
        }
        if (val == undefined) {
          val = '';
        }
        var tagMark = '<span id="' + id + '-input"><input data-default="' + options.defaultText + '" value="' + val + '" /></span>';
        $(tagMark).insertAfter(after)


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
            appendTag(v)
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
        editor: '#' + id + '-tags-editor',
        tags_group_wrapper: '#' + id + '-tags-wrapper',
        tag_header: '#' + id + '-tags-header',
        tags_group: '#' + id + '-tags-wrapper' + '>.tag',
        // input_wrapper: '#' + id + '-addTag',
        fake_input: '#' + id + '-input > input',
        fake_input_wrapper: '#' + id + '-input',
      };

      tagSelect = function(e) {
        e.stopPropagation();
        $(data.fake_input).blur();
        var tag = $(this)
        tagSelected(tag);
      };

      bindEvents = function() {

        $(data.editor).on('click', function(e) {
          $(data.fake_input).focus();
        });
        $(data.fake_input).on('keypress', function(e) {
          if (String.fromCharCode(e.which) == (options.delemiter)) {
            e.preventDefault();
            addTagBefore($(data.fake_input).val().trim(), $(data.fake_input_wrapper));
            $(data.fake_input).val('');
          }
        });
        // $(data.tags_group).on('click', data, tagSelect);
      };


      init = function() {
        var value = $(data.real_input).val();
        $(interfaceMarkup(id, options)).insertAfter($('#' + id));
        if (value != undefined) {
          importTags(value);
        }
        console.log(data.cursor);
        addFakeInput();
        $(data.fake_input).focus();
        bindEvents();

      };

      init();

    };

    this.each(function() {
      var editor = new TagsEditor(this);
    });
  };

})(jQuery);