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
                    <li class="nav-item">
                        <a class="btn btn-info btn-raised btn-round" rel="tooltip" title="" data-placement="bottom" href="https://www.facebook.com/share/15Tf7YNeJC/" target="_blank" data-original-title="Like us on Facebook" rel="nofollow">
                            <i class="fa fa-facebook-square"></i>
                            Facebook
                            <div class="ripple-container"></div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="main">
        <div class="section home-gallery" id="gallerySection" style="background: white; background-image: url('./assets/img/bg/main-bg-2.png'); background-size:contain; background-repeat: repeat-y;">
            <div class="container">
                <div class="row mb-4">
                    <div class="col-12 ml-auto mr-auto banner-info-container">
                        <div class="info-container d-flex justify-content-center align-items-center">
                            <h1>The <span>Adventure</span> Gallery</h1>
                        </div>
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
                        // $images = array_slice($images, 0, 20);
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
</body>

</html>