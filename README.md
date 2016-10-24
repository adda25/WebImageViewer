#WebImageViewer

A simple but flexible image gallery for websites.
Substantially, **is an Javascript object** that manage for 
you the logic of an image gallery.

Main features:

* One main image view
* A variable number of your choice of thumb images [not mandatory]
* WebGallery automatically creates thumbs images for you, if no other
  thumbs is present.
* No buttons in order to go through images:
  * Click on the right of the main image for present the next image
  * Click on the left of the main image for come back to the last image
  * Click on the thumb that you want to see
* Automatic thumbs update
* Animations on change [If you use the provided styles]


**There is not a predefined layout; this is up to you.**
This provide a lot of customization possibilites.
Anyway, I have developed some layouts, some of them uses 
Bootstrap. 

Currently, the images are show in the *background-image* CSS property.
I'm developing the classic <img> HTML version.

## Online examples
You can observe some examples of the ImageGallery
in this webpage:

* [My personal webpage](http://amedeosetti.com)

## Usage
* Include the *action.js* and the *style.css* in your HTML page where
  you want to display the image gallery.
* Set a target main view, whith class *web-gallery-view*
* [Optional] Create some thumb images or create a container for the thumbs.
* At the end of the html, load the images.

This is the generic syntax:

```html
<body>
<!-- ... your stuff ... -->
<!-- Create a container for 6 thumb images -->
<div class="your-class-1 web-gallery-thumbs" data-web-gallery-thumbs="6" style="padding: 1px 5px 1px 5px;"></div>
<div class="your-class-2" style="padding: 1px 5px 1px 1px;">
  <!-- Create the class for the main view -->
  <div class="web-gallery-view"></div>
</div>
<!-- ... your stuff ... -->
<script>
WebGallery.setup(['imageOne.jpg', 'im2.png', 'and so on']);
</script>
</body>
```

If you don't provide the *data-web-gallery-thumbs="quantity"* you should
provide yourself the thumbs, as showed in the *Totally custom thumbs example* below.

## WebGallery API
The WebGallery has only few methods that you can use.

* setup(list_of_images);
* next(); 
* previus();
* set_at_thumb_id(thumb_id);

You need to use only the setup methods, the others are
handled directly from two jQuery functions.


## Vertical thumbs
#### classic-example.html

```html
<div class="col-lg-12 col-md-12 col-xs-12" style="padding: 5px 1px 5px 1px; background-color: rgba(245,245,245,1.0)">
  <div class="col-lg-1 col-md-1 col-xs-2 web-gallery-thumbs" data-web-gallery-thumbs="6" style="padding: 1px 5px 1px 5px;"></div>
  <div class="col-lg-11 col-md-11 col-xs-10" style="padding: 1px 5px 1px 1px;">
    <div class="web-gallery-view"></div>
  </div>
</div>
```
We load the images with the following script:

```javascript
<script type="text/javascript">
  WebGallery.setup(['images/t1.JPG', 'images/t2.jpg', 'images/t3.JPG', 
                    'images/t4.JPG', 'images/t5.jpg', 'images/t6.JPG', 
                    'images/t7.JPG', 'images/t8.JPG', 'images/t1.JPG', 
                    'images/t2.jpg', 'images/t3.JPG', 'images/t4.JPG', 
                    'images/t5.jpg', 'images/t6.JPG', 'images/t7.JPG', 
                    'images/t8.JPG']);
</script>
```

This is the default layout: we create a main view and
we specify a container for the thumb images, adding the class *web-gallery-thumbs*
to the container *col-lg-1 col-md-1 col-xs-2*. The thumb images are automatically
created and appended for you in the container. We specify the number of thumbs
with the *data-web-gallery-thumbs="6"*.
This number of thumbs is only the number of displayed thumbs: you can load 
a greater number of images, in this example we loaded 16 images. 
You can see the results in the following image:

![First example](vertical-example.png)


## Horizontal thumbs
#### horizontal-example.html
This is how to create an horizontal thumbs gallery.

```html
<!-- Create a full width main image -->
<div class="col-lg-12 col-md-12 col-xs-12" style="padding: 1px 5px 5px 1px;">
  <div class="web-gallery-view"></div>
</div>
<!-- Override the default thumbs style -->
<style>
  .web-gallery-thumbs div {
    width: 16%;
    float: left;
    margin-right: 5px;
  }
</style>
<!-- Create the container fof the thumbs -->
<row class="web-gallery-thumbs" data-web-gallery-thumbs="6"> </row>
```

The loading part is the same as the first example.
The results is the following:

![Second example](horizontal-example.png)

## Totally custom thumbs example
#### custom-thumbs-positions-example-html


```html
<div class="col-lg-12 col-md-12 col-xs-12" style="padding: 5px 30px 5px 30px;">
  <div class="col-lg-12 col-md-12 col-xs-12"> 
    <div class="col-lg-2 col-md-2 col-xs-2 web-gallery-thumbs-div web-gallery-thumbs" style="width: 16%;"> </div>
    <div class="col-lg-2 col-md-2 col-xs-2 web-gallery-thumbs-div web-gallery-thumbs" style="width: 16%;"> </div>
    <div class="col-lg-2 col-md-2 col-xs-2 web-gallery-thumbs-div web-gallery-thumbs" style="width: 16%;"> </div>
    <div class="col-lg-2 col-md-2 col-xs-2 web-gallery-thumbs-div web-gallery-thumbs" style="width: 16%;"> </div>
    <div class="col-lg-2 col-md-2 col-xs-2 web-gallery-thumbs-div web-gallery-thumbs" style="width: 16%;"> </div>
    <div class="col-lg-2 col-md-2 col-xs-2 web-gallery-thumbs-div web-gallery-thumbs" style="width: 16%;"> </div>
  </div>
  <div class="col-lg-12 col-md-12 col-xs-12" style="padding: 1px 5px 5px 1px;">
    <div class="web-gallery-view"></div>
  </div>
  <div class="col-lg-12 col-md-12 col-xs-12"> 
    <div class="col-lg-2 col-md-2 col-xs-2 web-gallery-thumbs-div web-gallery-thumbs" style="width: 16%;"> </div>
    <div class="col-lg-2 col-md-2 col-xs-2 web-gallery-thumbs-div web-gallery-thumbs" style="width: 16%;"> </div>
    <div class="col-lg-2 col-md-2 col-xs-2 web-gallery-thumbs-div web-gallery-thumbs" style="width: 16%;"> </div>
    <div class="col-lg-2 col-md-2 col-xs-2 web-gallery-thumbs-div web-gallery-thumbs" style="width: 16%;"> </div>
    <div class="col-lg-2 col-md-2 col-xs-2 web-gallery-thumbs-div web-gallery-thumbs" style="width: 16%;"> </div>
    <div class="col-lg-2 col-md-2 col-xs-2 web-gallery-thumbs-div web-gallery-thumbs" style="width: 16%;"> </div>
  </div>
</div>
```

The loading part is the same as the first and second example.
As you can see, you need to set the class *web-gallery-thumbs* for every element that
you want to be a thumb. The class *web-gallery-thumbs-div* is only for convenience:
you can replace this class with your favorite one.

The results is the following:

![Second example](custom-example-1.png)


## Dependencies
The ImageGallery uses jQuery in order to detect the touch points
in the images, so you need jQuery in order to go through the images.

Bootstrap is optional.

## TODO
I'm working on:

* Set the images in the <img> tag.
* Add animations
* Add timers for carusel

## License
All the files here presented are provided under the MIT License (MIT).
See the file LICENSE.txt for the details.


