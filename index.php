<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

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

    <!--     Fonts and icons     -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">

    <!-- CSS Files -->
    <link href="./css/material-kit.css" rel="stylesheet">

</head>

<body class="sidebar-collapse">
    <nav class="navbar navbar-default fixed-top navbar-expand-lg main-navbar" color-on-scroll="100" id="sectionsNav">
        <div class="container">
            <div class="navbar-translate">
                <a class="navbar-brand" href="http://kayakadventure.lk">
                    <img src="./assets/img/text-logo-B.png" width="100%" height="100%" alt="logo">
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
                        <a class="nav-link" href="./index.php">
                            Home
                            <div class="ripple-container"></div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./gallery.php">
                            Gallery
                            <div class="ripple-container"></div>
                        </a>
                    </li>
                    <li class="nav-item mx-1">
                        <a class="btn btn-success btn-raised btn-round btn-block" rel="tooltip" title="" data-placement="bottom" href="https://wa.me/94761122261" target="_blank" data-original-title="Contact us on Whatsapp" rel="nofollow">
                            <i class="fa fa-whatsapp mr-2"></i>
                            Whatsapp
                        </a>
                    </li>
                    <li class="nav-item mx-1">
                        <a class="btn btn-info btn-raised btn-round btn-block" rel="tooltip" title="" data-placement="bottom" href="https://www.facebook.com/share/15Tf7YNeJC/" target="_blank" data-original-title="Like us on Facebook" rel="nofollow">
                            <i class="fa fa-facebook-square mr-2"></i>
                            Facebook
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="page-header" data-parallax="true" style="background: white; background-image: url('./assets/img/bg/main-bg-1.png'); background-size:cover;">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-12 col-lg-6 ml-auto mr-auto d-flex justify-content-center align-items-center banner-info-container">
                    <div class="info-container">
                        <!-- <h1 class="text-bold">KAYAK ADVENTURE</h1> -->
                        <p class="badge badge-pill badge-info badge-1">Explore the nature <span class="material-symbols-outlined mx-2">globe_asia</span></p>
                        <h1>Enjoy your <span>vacation</span> with <span>adventuries</span> in <span>nature</span>.</h1>
                        <a class="btn btn-info btn-round btn-leran-more" href="javascript:void(0)" onclick="scrollToFeatured()">LEARN MORE</a>
                    </div>
                    <div class="logo-badge-container p-2">
                        <img src="./assets/img/color-logo-with-text.svg" alt="logo">
                    </div>
                </div>
                <div class="col-md-7 col-lg-6 ml-auto mr-auto d-flex align-items-stretch flex-row banner-img-container">
                    <div class="d-flex align-items-stretch flex-column align-content-stretch first">
                        <div class="d-flex p-2 justify-content-center align-items-center img-container">
                            <img class="m-auto" src="./gallery-images/img29.jpeg">
                        </div>
                        <div class="d-flex p-2 justify-content-center align-items-center img-container">
                            <img class="m-auto" src="./gallery-images/img40.jpeg">
                        </div>
                    </div>
                    <div class="d-flex p-2 justify-content-center align-items-center second">
                        <img src="./gallery-images/img67.jpeg">
                    </div>
                    <p class="badge badge-pill badge-info badge-2">Best in the country <span class="material-symbols-outlined mx-2">kayaking</span></p>
                </div>
            </div>
        </div>
    </div>
    <div class="main">
        <div class="section section-featured" id="featuredSection">
            <div class="container">
                <div class="cd-section">
                    <div class="row align-items-center">
                        <div class="col-lg-12">
                            <div class="row justify-content-center">
                                <div class="col-md-3 featured text-center p-2">
                                    <div class="p-3 content">
                                        <i class="material-symbols-outlined text-gradient text-info">health_and_safety</i>
                                        <h3>Safety</h3>
                                        <p>Our first priority is you safety, we always want you to be safe during the trip and before and after </p>
                                    </div>
                                </div>
                                <div class="col-md-3 featured text-center p-2">
                                    <div class="p-3 content">
                                        <i class="material-symbols-outlined text-gradient text-info">support</i>
                                        <h3>Support</h3>
                                        <p>We have well experienced and amazing team to support you, while providing the things you need</p>
                                    </div>
                                </div>
                                <div class="col-md-3 featured text-center p-2">
                                    <div class="p-3 content">
                                        <i class="material-symbols-outlined text-gradient text-info">route</i>
                                        <h3>Custom Routes</h3>
                                        <p>We didn't have fixed routes and we always open to what you requests. If you want custom route we can provide</p>
                                    </div>
                                </div>
                                <div class="col-md-3 featured text-center p-2">
                                    <div class="p-3 content">
                                        <i class="material-symbols-outlined text-gradient text-info">kayaking</i>
                                        <h3>Best in the Country</h3>
                                        <p>We are one of the best company in the country that provide amazing and memarable kayaking experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section section-about" id="aboutSection">
            <div class="container">
                <div class="">
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
                                    <strong>Kayak adventure</strong> is one of the best place you can get <strong>best kayaking experience in Sri Lanka.</strong>
                                    We are located in katudampe, rathgama, southern province, facing beautiful rathgama lake.
                                    With kayak adventure, you are not just kayaking around the lake, You can explore and experience wild life around the lake and can enjoy sunset.
                                    Also we have we'll experienced instructors for taking you around the lake. Also we constantly improving ourself to provide you better experience and make your trip memorable.
                                    Contact us through 
                                    <strong><a class="face mx-3" href="https://www.facebook.com/share/15Tf7YNeJC/" target="_blank"><i class="fa fa-facebook-square mr-1"></i>Facebook</a></strong> or 
                                    <strong><a class="what mx-3" href="https://wa.me/94761122261" target="_blank"><i class="fa fa-whatsapp mr-1"></i>Whatsapp</a></strong> or 
                                    <strong><a class="contact mx-3" href="tel:+94761122261"><i class="fa fa-phone-square mr-1"></i> Contact Number</a></strong> and book you’r kayaking experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="" id="whyusSection">
            <div class="container">
                <div class="d-flex flex-row flex-wrap justify-content-center">
                    <div class="service-container text-center d-flex justify-content-center">
                        <div class="p-4 icon-col">
                            <img src="./assets/img/cocktails.png" alt="life-jacket">
                        </div>
                        <h5>Welcome Drink</h5>
                    </div>
                    <div class="service-container text-center d-flex justify-content-center">
                        <div class="p-4 icon-col">
                            <img src="./assets/img/parking.png" alt="life-jacket">
                        </div>
                        <h5>Car Parking</h5>
                    </div>
                    <div class="service-container text-center d-flex justify-content-center">
                        <div class="p-4 icon-col">
                            <img src="./assets/img/changing-room.png" alt="life-jacket">
                        </div>
                        <h5>Changing Facilities</h5>
                    </div>
                    <div class="service-container text-center d-flex justify-content-center">
                        <div class="p-4 icon-col">
                            <img src="./assets/img/bathroom.png" alt="life-jacket">
                        </div>
                        <h5>Bathroom</h5>
                    </div>
                    <div class="service-container text-center d-flex justify-content-center">
                        <div class="p-4 icon-col">
                            <img src="./assets/img/life-jacket.png" alt="life-jacket">
                        </div>
                        <h5>Life Jacket</h5>
                    </div>
                    <div class="service-container text-center d-flex justify-content-center">
                        <div class="p-4 icon-col">
                            <img src="./assets/img/sunset.png" alt="sun-set">
                        </div>
                        <h5>Watch Sunset</h5>
                    </div>
                    <div class="service-container text-center d-flex justify-content-center">
                        <div class="p-4 icon-col">
                            <img src="./assets/img/bird.png" alt="bird-watching">
                        </div>
                        <h5>Bird Watching</h5>
                    </div>
                    <div class="service-container text-center d-flex justify-content-center">
                        <div class="p-4 icon-col">
                            <img src="./assets/img/harbour.png" alt="harbour access">
                        </div>
                        <h5>Visit Harbour</h5>
                    </div>
                    <div class="service-container text-center d-flex justify-content-center">
                        <div class="p-4 icon-col">
                            <img src="./assets/img/waterproof.png" alt="waterproof case">
                        </div>
                        <h5>Waterproof Phone Cover</h5>
                    </div>
                    <div class="service-container text-center d-flex justify-content-center">
                        <div class="p-4 icon-col">
                            <img src="./assets/img/dry-bag.png" alt="dry bag">
                        </div>
                        <h5>Waterproof Bag</h5>
                    </div>
                </div>
            </div>
        </div>

        <div class="section home-gallery" id="gallerySection">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-6 p-0 pb-3 d-flex justify-content-center">
                        <a class="btn btn-info btn-round btn-block" href="./gallery.php">
                            Explore the Adventures gallery
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mr-auto ml-auto masonry-container">
                        <?php
                        $imageFolder = 'gallery-images/';
                        $images = glob($imageFolder . '*.{jpg,jpeg,png}', GLOB_BRACE);
                        natsort($images);
                        $images = array_values($images);
                        $images = array_reverse($images);
                        $images = array_slice($images, 0, 20);
                        if (!empty($images)) {
                            foreach ($images as $image) {
                        ?>
                                <div class="masonry-item pt-1 pb-1">
                                    <img class="" src="<?php echo $image ?>" alt="Card image">
                                </div>
                        <?php
                            }
                        }
                        ?>
                    </div>
                </div>
                <div class="row d-flex justify-content-center">
                    <div class="col-md-6 p-0 pb-3 d-flex justify-content-center">
                        <a class="btn btn-info btn-round btn-block" href="./gallery.php">
                            Explore the Adventures gallery
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
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
    </div>
    <!--   Core JS Files   -->
    <script src="./js/core/jquery.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>
    <script src="./js/core/popper.min.js" defer></script>
    <script src="./js/core/bootstrap-material-design.min.js" defer></script>
    <!-- Control Center for Material Kit: parallax effects, scripts for the example pages etc -->
    <script src="./js/material-kit.js" defer></script>
    <script>
        document.addEventListener("contextmenu", (event) => {
            event.preventDefault(); // Prevent the context menu from appearing
        });
        document.addEventListener("keydown", (e) => {
            // Ctrl+Shift+I 
            if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
                disabledEvent(e);
            }
            // Ctrl+Shift+J 
            if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
                disabledEvent(e);
            }
            // Ctrl+S 
            if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                disabledEvent(e);
            }
            // Ctrl + U 
            if (e.ctrlKey && e.keyCode == 85) {
                disabledEvent(e);
            }
            // F12
            if (event.keyCode == 123) {
                disabledEvent(e);
            }
        });
    </script>
    <script>
        function scrollToTop() {
            if ($('.page-header').length != 0) {
                $("html, body").animate({
                    scrollTop: 0
                }, 1000);
            }
        };

        function scrollToFeatured() {
            if ($('.section-featured').length != 0) {
                $("html, body").animate({
                    scrollTop: $('.section-featured').offset().top
                }, 1000);
            }
        };

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