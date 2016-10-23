#WebImageViewer

A simple but flexible image gallery for websites.

Main features:

* One main image view
* A variable number of your choice of thumb images [not mandatory]
* No buttons in order to go on or go back through images:
  * Click on the right of the main image for present the next image
  * Click on the left of the main image for come back to the last image
  * Click on the thumb that you want to see


There is not a predefined layout; this is up to you.
This provide a lot of customization possibilites.
Anyway, I have developed some layouts, some of them uses 
Bootstrap. 

Currently, the images are show in the *background-image* CSS property.
I'm developing the classic *<img>* HTML version.

## Online examples
You can observe some examples of the ImageGallery
in this webpage:

* [My personal webpage](http://amedeosetti.com)

## Usage
* Include the *action.js* and the *style.css* in your HTML page where
  you want to display the image gallery.
* Set a target main view, whith a html id of your choice -> *exampleId*
* [Optional] Create some thumb images; the html id must start with *thumbView*.
* At the end of the html, load the images.

```html
<body>
<!-- ... your stuff ... -->
<div class="imageView" id="exampleId"> </div>
<row>
  <div class="thumbView" id="thumbView0"></div>
  <div class="thumbView" id="thumbView4isBetter"></div>
  <div class="thumbView" id="thumbViewPunkIsNotDead"></div>
</row>
<!-- ... your stuff ... -->
<script>
WebGallery.setup('exampleId', ['imageOne.jpg', 'im2.png', 'and so on']);
</script>
</body>
```

## WebGallery API
The WebGallery has only few methods that you should use.

* setup(image_view_id, list_of_images);
* next(); 
* previus();
* set_at_thumb_id(thumb_id);

You need to use only the setup methods, the others are
handled directly from two jQuery functions.


## The first example 
#### index.html

```html
<!-- Set the main image -->
<div class="imageView" id="imageView1"> </div>
<div class="container-fluid" style="padding-top: 50px; padding-bottom: 25px; text-align: center;">
<row>
  <!-- Set the thumb images -->
  <div class="thumbView" id="thumbView0"></div>
  <div class="thumbView" id="thumbView1"></div>
  <div class="thumbView" id="thumbView2"></div>
</row>
```
We load the images with the following script:

```javascript
<script type="text/javascript">
  WebGallery.setup('imageView1', ['images/t1.JPG', 'images/t2.jpg', 'images/t3.JPG', 'images/t4.JPG', 'images/t5.jpg', 'images/t6.JPG', 'images/t7.JPG', 'images/t8.JPG', 'images/t1.JPG', 'images/t2.jpg', 'images/t3.JPG', 'images/t4.JPG', 'images/t5.jpg', 'images/t6.JPG', 'images/t7.JPG', 'images/t8.JPG']);
</script>
```

In this example we set the main image, of the class named *imageView*,
and we set an id for this main image.
We also created three thumbs images, with the class *thumbView*.
You can show the results in the following image:

![First example](t1.png)


## The second example
#### bootstrap-example-1.html
In this example we use Bootstrap in order to layout
the thumbs and main image positions.

```html
<div class="col-lg-12 col-md-12 col-xs-12" style="background-color: rgba(200,200,200,1.0)">
      <div class="container-fluid">
      </br>
        <div class="imageView" id="imageView1"></div>
        <div class="container-fluid" style="padding-top: 50px; padding-bottom: 25px; text-align: center;">
          <row>
            <div class="col-lg-2 col-md-2 col-xs-2">
              <div class="thumbView" id="thumbView0"></div>
            </div>
            <div class="col-lg-2 col-md-2 col-xs-2">
              <div class="thumbView" id="thumbView1"></div>
            </div>
            <div class="col-lg-2 col-md-2 col-xs-2">
              <div class="thumbView" id="thumbView2"></div>
            </div>
            <div class="col-lg-2 col-md-2 col-xs-2">
              <div class="thumbView" id="thumbView3"></div>
            </div>
            <div class="col-lg-2 col-md-2 col-xs-2">
              <div class="thumbView" id="thumbView4"></div>
            </div>
            <div class="col-lg-2 col-md-2 col-xs-2">
              <div class="thumbView" id="thumbView5"></div>
            </div>
          </row>
        </div>
      </div>
    </div>
```

The loading part is the same as the first example.
The results is the following:

![Second example](t2.png)

##Dependencies
The ImageGallery uses jQuery in order to detect the touch points
in the images, so you need jQuery in order to go through the images.

Bootstrap is optional.
