// The MIT License (MIT)
// 
// Copyright (c) 2016 Amedeo Setti
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.



////    _  ___                        
////   (_)/ _ \ _   _  ___ _ __ _   _ 
////   | | | | | | | |/ _ \ '__| | | |
////   | | |_| | |_| |  __/ |  | |_| |
////  _/ |\__\_\\__,_|\___|_|   \__, |
//// |__/                       |___/ 
//// 


$(document).ready(function() {
  /**
    Control the imageView pic
    when the user click on the imageView.
    If the touch point is greater than the 
    half width, than the next image is 
    presented, and viceversa.
  */
  $('#' + WebGallery.data.get_main_view_id()).click(function (e) { 
    var offset_l = $(this).offset().left - $(window).scrollLeft();
    var left = Math.round( (e.clientX - offset_l) );
    var div_width = $(this).width();
    if (left > (div_width * 0.5)) {
      WebGallery.next();
    } else {
      WebGallery.previus();
    }
  });

  /**
    If the user click on the thumbImages,
    than the selected thumb is show
    in the imageView.
  */
  $(document).on('click', '.thumbView', function (event) {
    WebGallery.set_at_thumb_id(event.target.id);
  });
});



//// __        __   _      ____       _ _                  
//// \ \      / /__| |__  / ___| __ _| | | ___ _ __ _   _  
////  \ \ /\ / / _ \ '_ \| |  _ / _` | | |/ _ \ '__| | | | 
////   \ V  V /  __/ |_) | |_| | (_| | | |  __/ |  | |_| | 
////    \_/\_/ \___|_.__/ \____|\__,_|_|_|\___|_|   \__, | 
////                                                |___/  

var WebGallery = {
  /*
   ___       _             __                
  |_ _|_ __ | |_ ___ _ __ / _| __ _  ___ ___ 
   | || '_ \| __/ _ \ '__| |_ / _` |/ __/ _ \
   | || | | | ||  __/ |  |  _| (_| | (_|  __/
  |___|_| |_|\__\___|_|  |_|  \__,_|\___\___|
                                           
  */

  setup: function(main_view_id, images_to_load) {
    this.data.setup(main_view_id, images_to_load);
  },

  next: function() {
    this.data.next();
  },

  previus: function() {
    this.data.previus();
  },

  set_at_thumb_id: function(thumb_id) {
    this.data.set_at_thumb_id(thumb_id);
  },


  /*
   ____             _     ____  _     _      
  |  _ \  __ _ _ __| | __/ ___|(_) __| | ___ 
  | | | |/ _` | '__| |/ /\___ \| |/ _` |/ _ \
  | |_| | (_| | |  |   <  ___) | | (_| |  __/
  |____/ \__,_|_|  |_|\_\|____/|_|\__,_|\___|
                                           
  */

  data: (function() {
    var images = [];
    var thumbs = [];
    var main_view = "";
    var images_size = 0;
    var thumbs_size = 0;
    var image_index = 0;
    var thumbs_start_index_val = 0; 

    var set_image_at_index = function(index) {
      if (index > (images_size - 1)) { return; }
      if (index < 0) { return; }
      if (images_size === 0) { return; }
      image_index = index;
      document.getElementById(main_view).style.backgroundImage = "url('" + images[index] + "')";
      if (thumbs_size === 0) {
        return;
      } else if (thumbs_size === 1) {
        load_thumbs_from_image_index_to(image_index, image_index + 1);
        set_selected_thumb_with_thumb_index(0);
      } else if (thumbs_size === 2) {
        load_thumbs_from_image_index_to(image_index, image_index + 2);
        set_selected_thumb_with_thumb_index(0);
      } else { 
        manage_thumbs_scroll();
        var selected_thumb_index = thumb_index_from_image_index();
        unselect_all_thumbs();
        set_selected_thumb_with_thumb_index(selected_thumb_index);
      }
    };

    var manage_thumbs_scroll = function() {
      // Convert imIndex in thumbsIndex
      var current_thumb_index = thumb_index_from_image_index();
      if (current_thumb_index === (thumbs_size - 1) ) {
        if (image_index === (images_size - 1)) { 
          return; 
        }
        // Go on
        thumbs_start_index_val += 1;
        load_thumbs_from_image_index_to(thumbs_start_index_val, thumbs_end_index());
      } else if (current_thumb_index === 0 && image_index !== 0) {
        // Go back
        thumbs_start_index_val -= 1;
        load_thumbs_from_image_index_to(thumbs_start_index_val, thumbs_end_index());
      }
    };

    var load_thumbs_from_image_index_to = function(min, max) {
      var img_idx = min;
      if (img_idx < 0 || images_size === 0) { return; }
      for (var i = 0; i < thumbs_size; i++) {
        if (img_idx > (images_size - 1)) { return; }
        if (img_idx === max) { return; }
        document.getElementById(thumbs[i]).style.backgroundImage = "url('" + images[img_idx] + "')";
        img_idx++;
      }
    };

    var set_selected_thumb_with_thumb_index = function(thumb_index) {
      document.getElementById(thumbs[thumb_index]).style.opacity = 1.0;
    };

    var unselect_all_thumbs = function() {
      for (var i = 0; i < thumbs_size; i++) {
        document.getElementById(thumbs[i]).style.opacity = 0.5;
      }
    };

    var thumbs_start_index = function() {
      return thumbs_start_index_val;
    };

    var thumbs_end_index = function() {
      return (thumbs_start_index_val + thumbs_size);
    };

    var thumb_index_from_image_index = function() {
      return image_index - thumbs_start_index(); 
    };

    return { 

      get_main_view_id: function() {
        return main_view;
      },

      setup: function(main_view_id, images_to_load) {
        main_view = main_view_id;
        images = images_to_load;
        images_size = 0;
        thumbsNum = 0;
        image_index = 0;
        thumbs_start_index_val = 0;
        var nt = [];
        thumbs = document.querySelectorAll('[id^="thumbView"]');
        thumbs.forEach(item => {
            nt.push(item.id);
            thumbs_size++;
        })
        thumbs = nt
        images.forEach(item => { images_size++; })
        load_thumbs_from_image_index_to(0, thumbs_end_index());
        set_image_at_index(0);
        return this;
      },

      next: function() {
        if (images_size === image_index) { return; }
        image_index++;
        set_image_at_index(image_index);
      },

      previus: function() {
        if (image_index === 0) { return; }
        image_index--;
        set_image_at_index(image_index);
      },

      set_at_thumb_id: function(thumb_id) {
        var k = 0;
        thumbs.forEach(item => {
          if (item === thumb_id) {
            var start_index = thumbs_start_index();
            set_image_at_index(k + start_index);
          }
          k++;
        })
      }
    }; // End return
  }()) // End data

}; // End ImageGallery


