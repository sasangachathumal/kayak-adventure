<!--
=========================================================
Material Kit - v2.0.7
=========================================================

Product Page: https://www.creative-tim.com/product/material-kit
Copyright 2020 Creative Tim (https://www.creative-tim.com/)

Coded by Creative Tim

=========================================================

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="apple-touch-icon" sizes="76x76" href="./assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="./assets/img/favicon.png">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>
    KAYAK Adventure
  </title>
  <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons|Material+Icons+Outlined|Material+Icons+Round" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
  <!-- CSS Files -->
  <link href="{{ asset('css/material-kit.css') }}" rel="stylesheet">
</head>

<body class="sidebar-collapse">
    {{-- Navigation --}}
  <nav class="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg main-navbar" color-on-scroll="100" id="sectionsNav">
    <div class="container">
      <div class="navbar-translate">
        <a class="navbar-brand" href="http://kayakadventure.lk">
          KAYAK Adventure</a>
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
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" onclick="scrollToContact()">
                Contact
                <div class="ripple-container"></div>
            </a>
          </li>
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
            <h1 class="text-bold">KAYAK ADVENTURE</h1>
            <h3>It is now time for some adventure and feel the beauty of the nature</h3>
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
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
                {{-- <div class="row">
                    <div class="col-md-4 mx-auto">
                        <div class="card bg-dark text-white memory-card">
                            <img class="card-img" alt="" src="{{ asset('./assets/img/bg.jpg') }}">
                            <div class="card-img-overlay">
                                <h4 class="card-title">Card title</h4>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mx-auto">
                        <div class="card bg-dark text-white memory-card">
                            <img class="card-img" alt="" src="{{ asset('./assets/img/bg2.jpg') }}">
                            <div class="card-img-overlay">
                                <h4 class="card-title">Card title</h4>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mx-auto">
                        <div class="card bg-dark text-white memory-card">
                            <img class="card-img" alt="" src="{{ asset('./assets/img/bg7.jpg') }}">
                            <div class="card-img-overlay">
                                <h4 class="card-title">Card title</h4>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mx-auto">
                        <div class="card bg-dark text-white memory-card">
                            <img class="card-img" alt="" src="{{ asset('./assets/img/bg3.jpg') }}">
                            <div class="card-img-overlay">
                                <h4 class="card-title">Card title</h4>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mx-auto">
                        <div class="card bg-dark text-white memory-card">
                            <img class="card-img" alt="" src="{{ asset('./assets/img/bg.jpg') }}">
                            <div class="card-img-overlay">
                                <h4 class="card-title">Card title</h4>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mx-auto">
                        <div class="card bg-dark text-white memory-card">
                            <img class="card-img" alt="" src="{{ asset('./assets/img/bg2.jpg') }}">
                            <div class="card-img-overlay">
                                <h4 class="card-title">Card title</h4>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                </div> --}}
                <div class="card-columns">
                    <div class="card memory-card single-img-post">
                      <img class="card-img-top" src="{{ asset('./assets/img/bg.jpg') }}" alt="Card image cap">
                      <div class="card-body">
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                    <div class="card p-3 memory-card content-post">
                      <blockquote class="blockquote mb-0 card-body">
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </blockquote>
                    </div>
                    <div class="card memory-card multi-img-post">
                      <img class="card-img-top" src="{{ asset('./assets/img/bg2.jpg') }}" alt="Card image cap">
                      <div class="card-body">
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                    <div class="card memory-card video-post">
                        <img class="card-img" src="{{ asset('./assets/img/bg7.jpg') }}" alt="Card image">
                    </div>
                    <div class="card text-center memory-card">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                    <div class="card p-3 text-right memory-card">
                      <blockquote class="blockquote mb-0">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                        <footer class="blockquote-footer">
                          <small class="text-muted">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                          </small>
                        </footer>
                      </blockquote>
                    </div>
                    <div class="card memory-card">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                    <div class="card memory-card video-post">
                        <img class="card-img" src="{{ asset('./assets/img/bg7.jpg') }}" alt="Card image">
                    </div>
                    <div class="card memory-card video-post">
                        <img class="card-img" src="{{ asset('./assets/img/bg3.jpg') }}" alt="Card image">
                    </div>
                  </div>
            </div>
        </div>
    </div>

    <div class="section section-contact" id="contactSection">
        <div class="container">
            <div class="cd-section">
                <div class="title text-center">
                    <h2 class="">Get In Touch</h2>
                </div>
                {{-- <div class="discription">
                    <p class="bmd-help">We'll never share your details with anyone else.</p>
                </div> --}}
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <form>
                            <div class="form-group">
                                <label for="nameInput" class="bmd-label-floating">Name</label>
                                <input type="text" class="form-control" id="nameInput">
                            </div>
                            <div class="form-group">
                                <label for="emailInput" class="bmd-label-floating">Email</label>
                                <input type="email" class="form-control" id="emailInput">
                            </div>
                            <div class="form-group">
                                <label for="messageInput" class="bmd-label-floating">Message</label>
                                <textarea class="form-control" name="message" id="messageInput" cols="30" rows="4"></textarea>
                            </div>
                            <div class="text-center">
                                <button class="btn btn-info btn-lg btn-round">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
</body>

</html>
