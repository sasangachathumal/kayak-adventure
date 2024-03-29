<?php use \App\Http\Controllers\HomeController; ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

  {{-- favicons --}}
    <link rel="shortcut icon" href="./assets/favicon.ico" type="image/x-icon">
    <link rel="icon" href="./assets/favicon.png">
    <link rel="icon" sizes="57x57" href="./assets/favicon-32x32.png">
    <link rel="icon" sizes="57x57" href="./assets/favicon-57x57.png">
    <link rel="icon" sizes="72x72" href="./assets/favicon-72x72.png">
    <link rel="icon" sizes="76x76" href="./assets/favicon-76x76.png">
    <link rel="icon" sizes="114x114" href="./assets/favicon-114x114.png">
    <link rel="icon" sizes="120x120" href="./assets/favicon-120x120.png">
    <link rel="icon" sizes="144x144" href="./assets/favicon-144x144.png">
    <link rel="icon" sizes="152x152" href="./assets/favicon-152x152.png">

    <meta name="msapplication-TileColor" content="#FFFFFF">
    <meta name="msapplication-TileImage" content="./assets/favicon-144x144.png">
    <meta name="application-name" content="Website Title">

  <title>
    KAYAK Adventure
  </title>
  <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons|Material+Icons+Outlined|Material+Icons+Round" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
  <!-- CSS Files -->
  <link href="{{ asset('css/material-kit.css') }}" rel="stylesheet">

  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>

</head>

<body class="sidebar-collapse">
    {{-- Navigation --}}
  <nav class="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg main-navbar" color-on-scroll="100" id="sectionsNav">
    <div class="container">
      <div class="navbar-translate">
        <a class="navbar-brand" href="http://kayakadventure.lk">
            <img src="./assets/img/logo-text-w.svg" width="100%" height="100%" alt="logo">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="sr-only">Toggle navigation</span>
          <span class="navbar-toggler-icon"></span>
          <span class="navbar-toggler-icon"></span>
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" onclick="scrollToTop()">
                Home
                <div class="ripple-container"></div>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" onclick="scrollToAbout()">
                About
                <div class="ripple-container"></div>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" onclick="scrollToGallery()">
                Gallery
                <div class="ripple-container"></div>
            </a>
          </li>
          {{-- <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" onclick="scrollToContact()">
                Contact
                <div class="ripple-container"></div>
            </a>
          </li> --}}
          <li class="nav-item">
            <a class="nav-link" rel="tooltip" title="" data-placement="bottom" href="https://www.facebook.com/KAYAK-Adventure-Rathgama-LAKE-100909892311542" target="_blank" data-original-title="Like us on Facebook" rel="nofollow">
              <i class="fa fa-facebook-square"></i>
              Facebook
              <div class="ripple-container"></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  {{-- banner --}}
  <div class="page-header header-filter" data-parallax="true" style="background-image: url('./assets/img/bg/bg1.jpeg');">
    <div class="container">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <div class="brand">
            {{-- <h1 class="text-bold">KAYAK ADVENTURE</h1> --}}
            <img src="./assets/img/w-logo-with-text.svg" width="70%" height="70%" alt="logo">
            <h3>It is now time for some adventure and admire beauty of the nature</h3>
            <a class="btn btn-info btn-round btn-leran-more" href="javascript:void(0)" onclick="scrollToAbout()">LEARN MORE</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="main">
    <div class="section section-about" id="aboutSection">
        <div class="container">
            <div class="cd-section">
                <div class="row">
                    <div class="col-md-5 mx-auto">
                        <img src="./assets/img/about.jpeg" alt="Raised Image" class="img-raised rounded img-fluid">
                    </div>
                    <div class="col-md-7 mx-auto">
                        <div class="title">
                            <h2 class="">ABOUT US</h2>
                        </div>
                        <div class="note">
                            <p class="">
                                <strong>Kayak adventure</strong> is one of the few places you can get <strong>best kayaking experience in Sri Lanka.</strong>
                                We are located in katudampe, rathgama, southern province, facing beautiful rathgama lake.
                                With kayak adventure, you are not just kayaking around the lake, You can explore and experience wild life around the lake and can enjoy sunset.
                                Also we have we'll experienced instructors for taking you around the lake. Also we constantly improving ourself to provide you better experience and make your trip memorable.
                                Contact us through <strong>Facebook or through contact number</strong> and book you’r kayaking experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section section-whyus" id="whyusSection">
      <div class="container">
        <div class="cd-section">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="row justify-content-start">
                <div class="col-md-6 feature">
                  <div class="info">
                    <i class="material-icons text-3xl text-gradient text-info mb-3">health_and_safety</i>
                    <h5>Safety</h5>
                    <p>Our first priority is you safety, we always want you to be safe during the trip and before and after </p>
                  </div>
                </div>
                <div class="col-md-6 feature">
                  <div class="info">
                    <i class="material-icons text-3xl text-gradient text-info mb-3">support</i>
                    <h5>Support</h5>
                    <p>We have well experienced and amazing team to support you, while providing the things you need</p>
                  </div>
                </div>
              </div>
              <div class="row justify-content-start mt-4">
                <div class="col-md-6 feature">
                  <div class="info">
                    <i class="material-icons text-3xl text-gradient text-info mb-3">route</i>
                    <h5>Custom Routes</h5>
                    <p>We didn't have fixed routes and we always open to what customer requests. If you want custom route we can provide it</p>
                  </div>
                </div>
                <div class="col-md-6 feature">
                  <div class="info">
                    <i class="material-icons text-3xl text-gradient text-info mb-3">kayaking</i>
                    <h5>Best in the Country</h5>
                    <p>We are one of the best company in the country that provide amazing and memarable kayaking experience</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 full-feature-list">
                <div class="feature-container">
                    <div class="row justify-content-start feature">
                        <div class="col-md-1 icon-col">
                            <i class="material-icons text-3xl text-gradient text-info mb-3">local_bar</i>
                        </div>
                        <div class="col-md-10 text-col">
                            <h5>Welcome Drink</h5>
                        </div>
                    </div>

                    <div class="row justify-content-start feature">
                        <div class="col-md-1 icon-col">
                            <i class="material-icons text-3xl text-gradient text-info mb-3">local_parking</i>
                        </div>
                        <div class="col-md-10 text-col">
                            <h5>Car Parking</h5>
                        </div>
                    </div>

                    <div class="row justify-content-start feature">
                        <div class="col-md-1 icon-col">
                            <i class="material-icons text-3xl text-gradient text-info mb-3">checkroom</i>
                        </div>
                        <div class="col-md-10 text-col">
                            <h5>Changing Facilities</h5>
                        </div>
                    </div>

                    <div class="row justify-content-start feature">
                        <div class="col-md-1 icon-col">
                            <i class="material-icons text-3xl text-gradient text-info mb-3">shower</i>
                        </div>
                        <div class="col-md-10 text-col">
                            <h5>Bathroom</h5>
                        </div>
                    </div>

                    <div class="row justify-content-start feature">
                        <div class="col-md-1 icon-col">
                            <img src="./assets/img/life-jacket.png" alt="life-jacket">
                        </div>
                        <div class="col-md-10 text-col">
                            <h5>Life Jacket</h5>
                        </div>
                    </div>

                    <div class="row justify-content-start feature">
                        <div class="col-md-1 icon-col">
                            <img src="./assets/img/sunset.png" alt="sun-set">
                        </div>
                        <div class="col-md-10 text-col">
                            <h5>Watch Sunset</h5>
                        </div>
                    </div>

                    <div class="row justify-content-start feature">
                        <div class="col-md-1 icon-col">
                            <img src="./assets/img/bird.png" alt="bird-watching">
                        </div>
                        <div class="col-md-10 text-col">
                            <h5>Bird Watching</h5>
                        </div>
                    </div>

                    <div class="row justify-content-start feature">
                        <div class="col-md-1 icon-col">
                            <img src="./assets/img/harbour.png" alt="harbour access">
                        </div>
                        <div class="col-md-10 text-col">
                            <h5>Visit Dodanduwa Harbour</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>

    {{-- team section --}}
    <div class="section section-gallery" id="gallerySection">
        <div class="container">
            <div class="cd-section">
                <div class="title text-center">
                    <h2 class="">Gallery</h2>
                </div>
                <div class="gallery">
                <?php $postList = HomeController::getPost(); ?>
                @foreach ($postList as $post)
                    <div class="gallery-item">
                            <img class="gallery-image" src="{{ asset('/images/').'/'.$post->image_url }}" alt="Card image">
                        </div>
                @endforeach
                </div>
            </div>
        </div>
    </div>

    {{-- <div class="section section-contact" id="contactSection">
        <div class="container">
            <div class="cd-section">
                <div class="title text-center">
                    <h2 class="">Get In Touch</h2>
                </div>
                <div class="discription">
                    <p class="bmd-help">We'll never share your details with anyone else.</p>
                </div>

                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <form name="ajax-contact-form" id="ajax-contact-form" method="post" action="javascript:void(0)">
                            @csrf
                             <div class="form-group">
                               <label for="exampleInputEmail1" class="bmd-label-floating">Name</label>
                               <input type="text" id="name" name="name" class="form-control">
                             </div>
                              <div class="form-group">
                               <label for="exampleInputEmail1" class="bmd-label-floating">Email</label>
                               <input type="email" id="email" name="email" class="form-control">
                             </div>
                             <div class="form-group">
                               <label for="exampleInputEmail1" class="bmd-label-floating">Description</label>
                               <textarea name="description" id="description" class="form-control"></textarea>
                             </div>
                             <button type="submit" class="btn btn-primary" id="submit">Submit</button>
                           </form>
                    </div>
                </div>
            </div>
        </div>
    </div> --}}
  </div>

  <footer class="footer" data-background-color="black">
    <div class="container">
      <div class="copyright">
        build by SMSC
        &copy;
        <script>
          document.write(new Date().getFullYear())
        </script>
        KAYAK Adventure
      </div>
    </div>
  </footer>

  <!--   Core JS Files   -->
  <script src="{{ asset('js/core/jquery.min.js') }}" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>
  <script src="{{ asset('js/core/popper.min.js') }}" defer></script>
  <script src="{{ asset('js/core/bootstrap-material-design.min.js') }}" defer></script>
  <script src="{{ asset('js/plugins/moment.min.js') }}" defer></script>
  <!--	Plugin for the Datepicker, full documentation here: https://github.com/Eonasdan/bootstrap-datetimepicker -->
  <script src="{{ asset('js/plugins/bootstrap-datetimepicker.js') }}" defer></script>
  <!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
  <script src="{{ asset('js/plugins/nouislider.min.js') }}" defer></script>
  <!--  Google Maps Plugin    -->
  <!-- Control Center for Material Kit: parallax effects, scripts for the example pages etc -->
  <script src="{{ asset('js/material-kit.js') }}" defer></script>
  <script>
    $(document).ready(function() {
      //init DateTimePickers
      materialKit.initFormExtendedDatetimepickers();

      // Sliders Init
      materialKit.initSliders();
    });

    function scrollToTop() {
      if ($('.page-header').length != 0) {
        $("html, body").animate({
          scrollTop: 0
        }, 1000);
      }
    };service

    function scrollToAbout() {
      if ($('.section-about').length != 0) {
        $("html, body").animate({
          scrollTop: $('.section-about').offset().top
        }, 1000);
      }
    };

    function scrollToGallery() {
      if ($('.section-gallery').length != 0) {
        $("html, body").animate({
          scrollTop: $('.section-gallery').offset().top
        }, 1000);
      }
    };

    function scrollToContact() {
      if ($('.section-contact').length != 0) {
        $("html, body").animate({
          scrollTop: $('.section-contact').offset().top
        }, 1000);
      }
    };
  </script>
  <script>
    if ($("#ajax-contact-form").length > 0) {
    $("#ajax-contact-form").validate({
      rules: {
        name: {
        required: true,
        maxlength: 50
      },
      email: {
        required: true,
        maxlength: 50,
        email: true,
      },
      description: {
        required: true,
        maxlength: 300
      },
      },
      messages: {
      name: {
        required: "Please enter name",
        maxlength: "Your name maxlength should be 50 characters long."
      },
      email: {
        required: "Please enter valid email",
        email: "Please enter valid email",
        maxlength: "The email name should less than or equal to 50 characters",
      },
      description: {
        required: "Please enter description",
        maxlength: "Your description name maxlength should be 300 characters long."
      },
      },
      submitHandler: function(form) {
      $.ajaxSetup({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      $('#submit').html('Please Wait...');
      $("#submit"). attr("disabled", true);

      var nameInput = $('#name').val();
      var emailInput = $('#email').val();
      var descriptionInput = $('#description').val();

      console.log(nameInput, emailInput, descriptionInput);

      $.ajax({
        url: "{{url('sendEmail')}}",
        type: "POST",
        data: {name: nameInput, email: emailInput, message: descriptionInput},
        success: function( response ) {
          $('#submit').html('Submit');
          $("#submit"). attr("disabled", false);
          alert('Ajax form has been submitted successfully');
          document.getElementById("ajax-contact-form").reset();
        }
       });
      }
      })
    }
    </script>
</body>

</html>
