/*
 ___                          __     ___               
|_ _|_ __ ___   __ _  __ _  __\ \   / (_) _____      __
 | || '_ ` _ \ / _` |/ _` |/ _ \ \ / /| |/ _ \ \ /\ / /
 | || | | | | | (_| | (_| |  __/\ V / | |  __/\ V  V / 
|___|_| |_| |_|\__,_|\__, |\___| \_/  |_|\___| \_/\_/  
                     |___/                             

The MIT License (MIT)

Copyright (c) 2016 Amedeo Setti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

/**
    Control the imageView pic
    when the user click on the imageView.
    If the touch point is greater than the 
    half width, than the next image is 
    presented, and viceversa.
*/
$(document).ready(function() {
    $("#imageView1").click(function(e) {
        var offset_t = $(this).offset().top - $(window).scrollTop();
        var offset_l = $(this).offset().left - $(window).scrollLeft();
        var left = Math.round( (e.clientX - offset_l) );
        var right = -left + e.clientX;
        var top = Math.round( (e.clientY - offset_t) );
        if (left >= right) {
            ImageGallery.userWantsNext();
        } else {
            ImageGallery.userWantsPrevius();
        }
    });
});

/**
    If the user click on the thumbImages,
    than the selected thumb is show
    in the imageView.
*/
$(document).on('click', '.thumbView', function (event) {
    ImageGallery.userWantsThumbId(event.target.id);
});


var ImageGallery = {
  images: [],
  thumbs: [],
  mainView: "",
  imagesNum: 0,
  thumbsNum: 0,
  imIndex: 0,
  thumbsStartIndexVal: 0,

  setup: function() {
    this.imagesNum = 0;
    this.thumbsNum = 0;
    this.imIndex   = 0;
    this.thumbsStartIndexVal = 0;
    var nt = [];
    this.thumbs = document.querySelectorAll('[id^="thumbView"]');
    this.thumbs.forEach(item => {
        nt.push(item.id);
        this.thumbsNum++;
    })
    this.thumbs = nt
    this.images.forEach(item => { this.imagesNum++; })
    this.loadThumbsFromImageIndexTo(0, this.thumbsEndIndex());
    this.setImageAtIndex(0);
  },

  userWantsNext: function() {
    if (this.imagesNum == this.imIndex) { return; }
    this.imIndex++;
    this.setImageAtIndex(this.imIndex);
  },

  userWantsPrevius: function() {
    if (this.imIndex == 0) { return; }
    this.imIndex--;
    this.setImageAtIndex(this.imIndex);
  },

  userWantsThumbId: function(thumbId) {
    var k = 0;
    this.thumbs.forEach(item => {
      if (item == thumbId) {
        var startIndex = this.thumbsStartIndex();
        this.setImageAtIndex(k + startIndex);
      }
      k++;
    })
  },

  setImageAtIndex: function(index) {
    if (index > (this.imagesNum - 1)) { return; }
    if (index < 0) { return; }
    if (this.imagesNum == 0) { return; }
    this.imIndex = index;
    document.getElementById(this.mainView).style.backgroundImage = "url('" + this.images[index] + "')";
    if (this.thumbsNum == 0) {
      return;
    } else if (this.thumbsNum == 1) {
      this.loadThumbsFromImageIndexTo(this.imIndex, this.imIndex + 1);
      this.setSelectedThumbWithThumbIndex(0);
    } else if (this.thumbsNum == 2) {
      this.loadThumbsFromImageIndexTo(this.imIndex, this.imIndex + 2);
      this.setSelectedThumbWithThumbIndex(0);
    } else { 
      this.manageThumbsScroll();
      var selectedThumbIndex = this.thumbIndexFromImIndex();
      this.unselectAllThumbs();
      this.setSelectedThumbWithThumbIndex(selectedThumbIndex);
    }
  },

  manageThumbsScroll: function() {
    // Convert imIndex in thumbsIndex
    var currentThumbIndex = this.thumbIndexFromImIndex();
    var thumbsSize = this.thumbsNum;
    if (currentThumbIndex == (thumbsSize - 1) ) {
      if (this.imIndex == (this.imagesNum - 1) ) { 
        return; 
      }
      // Go on
      this.thumbsStartIndexVal += 1;
      this.loadThumbsFromImageIndexTo(this.thumbsStartIndexVal, this.thumbsEndIndex());
    } else if (currentThumbIndex == 0 && this.imIndex != 0) {
      // Go back
      this.thumbsStartIndexVal -= 1;
      this.loadThumbsFromImageIndexTo(this.thumbsStartIndexVal, this.thumbsEndIndex());
    }
  },

  loadThumbsFromImageIndexTo: function(min, max) {
    var imgIdx = min;
    if (imgIdx < 0 || this.imagesNum == 0) { return; }
    for (var i = 0; i < this.thumbsNum; i++) {
      if (imgIdx > (this.imagesNum - 1)) { return; }
      if (imgIdx == max) { return; }
      document.getElementById(this.thumbs[i]).style.backgroundImage = "url('" + this.images[imgIdx] + "')";
      imgIdx++;
    }
  },

  setSelectedThumbWithThumbIndex: function(thumbIndex) {
    document.getElementById(this.thumbs[thumbIndex]).style.opacity = 1.0;
  },

  unselectAllThumbs: function() {
    for (var i = 0; i < this.thumbsNum; i++) {
      document.getElementById(this.thumbs[i]).style.opacity = 0.5;
    }
  },

  thumbsStartIndex: function() {
    return this.thumbsStartIndexVal;
  },

  thumbsEndIndex: function() {
    return (this.thumbsStartIndexVal + this.thumbsNum);
  },

  thumbIndexFromImIndex: function() {
    return this.imIndex - this.thumbsStartIndex(); 
  }

}; 


