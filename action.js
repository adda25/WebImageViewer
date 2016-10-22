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
            Pics.nextPic();
        } else {
            Pics.previousPic();
        }
    });
});

/**
    If the user click on the thumbImages,
    than the selected thumb is show
    in the imageView.
*/
$(document).on('click', '.thumbView', function (event) {
    Pics.setAtThumbViewId(event.target.id);
});

/**
    The main pure JS class for manage
    the pics system.
    Call the setup for load the images to show.
    This class automatically detects the number
    of thumbViews presents.
*/
var Pics = { 
  index: 0,
  images: [],
  mainView: "",
  _thumbs: [],   /* Should be private */
  _lastThIdx: 0, /* Private */
  _lastOp: 1,    /* Private */
  _imgNum: 0,    /* Private */
  _thuNum: 0,    /* Private */
  _thuPop: 0,    /* Private */

  nextThumbnail: function(currentIndex) {
    // Check if currentIndex position is in the
    // last thumbnail show
    if (currentIndex == this.calcMaxIndex() - 1) {
      // How many remains?
      var rem = this._imgNum - this.calcMaxIndex();
      if (rem >= this._thuNum) {
        // If number of remaining pics is greater the thumbs
        // window capacity
        this._thuPop += this._thuNum;
        this.createThumbs(this._thuPop, this._thuNum + this._thuPop);
      } else {
        this._thuPop += (rem)
        this.createThumbs(this._thuPop, this._thuPop + this._thuNum);
      }
    } else if (currentIndex == this.calcMinIndex() && currentIndex != 0) {
      // How many remains?
      var rem = this.calcMinIndex();
      if (rem >= this._thuNum) {
        // If number of remaining pics is greater the thumbs
        // window capacity
        this._thuPop -= this._thuNum;
        this.createThumbs(this._thuPop, this._thuNum + this._thuPop);
      } else {
        this._thuPop -= (rem)
        this.createThumbs(this._thuPop, this._thuPop + this._thuNum);
      }
    }
    var k = 0;
    this._thumbs.forEach(item => {
        document.getElementById(this._thumbs[k]).style.opacity = 0.5;
        if (k == (currentIndex - this._thuPop)) {
          document.getElementById(this._thumbs[k]).style.opacity = 1.0;
        }
        k++;
    });
  },

  calcMinIndex: function() {
    return this._thuPop;
  },

  calcMaxIndex: function() {
    if (this._thuNum + this._thuPop <= this._imgNum) {
      return this._thuNum + this._thuPop;
    } else {
      return this._imgNum;
    }
  },

  setAtThumbViewId: function(thumbId) {
    var k = 0;
    this._thumbs.forEach(item => {
        if (item == thumbId) {
            this.index = k + this._thuPop;
            this.nextThumbnail(this.index);  
            document.getElementById(this.mainView).style.backgroundImage = "url('" + this.images[this.index] + "')";
        }
        k++;
    })
  },

  setAtIndex: function(index) {
    this.nextThumbnail(index);  
    document.getElementById(this.mainView).style.backgroundImage = "url('" + this.images[index] + "')";
  },

  nextPic: function() {
    if (this.index >= this._imgNum - 1) { return; }
    this.index++;
    this.setAtIndex(this.index);
    if (this.index == this._imgNum) { this.index--; }
  },

  previousPic: function() {
    if (this.index == 0) { return; }
    this.index--;
    this.setAtIndex(this.index);
  },

  createThumbs: function(min, max) {
    var k = 0;
    for (var i = min; i < max; i++) {
        if (i >= this._imgNum) { break; }
        document.getElementById(this._thumbs[k]).style.backgroundImage = "url('" + this.images[i] + "')";
        k++;
    }
  },

  setup: function() {
    var nt = [];
    this.index = 0;
    this._thumbs = document.querySelectorAll('[id^="thumbView"]');
    this._thuNum = 0;
    this._imgNum = 0;
    this._thuPop = 0;
    this._thumbs.forEach(item => {
        nt.push(item.id);
        this._thuNum++;
    })
    this._thumbs = nt
    this.images.forEach(item => { this._imgNum++; })
    this.setAtIndex(0);
    this.createThumbs(0, this._thuNum);
  }
};

