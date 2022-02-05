@extends('layouts.app')

@section('content')
{{-- <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    {{ __('You are logged in!') }}
                </div>
            </div>
        </div>
    </div>
</div> --}}
<div class="container">

    @if (count($errors) > 0)
        <div class="alert alert-danger">
            <strong>Whoops!</strong> There were some problems with your input.<br><br>
            <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
    @endif

    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <!-- Upload Area -->
    <div id="uploadArea" class="upload-area">
        <!-- Header -->
        <div class="upload-area__header">
            <h1 class="upload-area__title">Upload your file</h1>
            <p class="upload-area__paragraph">File should be an image
                <strong class="upload-area__tooltip">Like
                    <span class="upload-area__tooltip-data"></span> <!-- Data Will be Comes From Js -->
                </strong>and less than 2MB.
            </p>
        </div>
        <!-- End Header -->

        <!-- Drop Zoon -->
        <div id="dropZoon" class="upload-area__drop-zoon drop-zoon">
            <span class="drop-zoon__icon">
                <i class="material-icons">cloud_upload</i>
            </span>
            <p class="drop-zoon__paragraph">Drop your file here or Click to browse</p>
            <span id="loadingText" class="drop-zoon__loading-text">Please Wait</span>
        </div>

        <form id="submitform" method="post" action="{{url('post')}}" enctype="multipart/form-data">
            {{csrf_field()}}
            <input type="file" id="fileInput" class="drop-zoon__file-input" name="filename[]" accept="image/*">
            <button type="submit" class="btn btn-info btn-round" style="margin-top:30px; width: 250px;">Upload</button> <br>
        </form>

    </div>
    <!-- End Upload Area -->

</div>
<script type="text/javascript">

    // Select Upload-Area
    const uploadArea = document.querySelector('#uploadArea');

    // Select Drop-Zoon Area
    const dropZoon = document.querySelector('#dropZoon');

    // Loading Text
    const loadingText = document.querySelector('#loadingText');

    // Slect File Input
    const fileInput = document.querySelector('#fileInput');

    // ToolTip Data
    const toolTipData = document.querySelector('.upload-area__tooltip-data');

    // form Input
    const submitform = document.querySelector('#submitform');

    // Images Types
    const imagesTypes = [
        "jpeg",
        "png",
        "svg",
        "gif"
    ];

    let fileArray = [];

    // Append Images Types Array Inisde Tooltip Data
    toolTipData.innerHTML = [...imagesTypes].join(', .');

    // When (drop-zoon) has (dragover) Event
    dropZoon.addEventListener('dragover', function (event) {
        // Prevent Default Behavior
        event.preventDefault();

        // Add Class (drop-zoon--over) On (drop-zoon)
        dropZoon.classList.add('drop-zoon--over');
    });

    // When (drop-zoon) has (dragleave) Event
    dropZoon.addEventListener('dragleave', function (event) {
        // Remove Class (drop-zoon--over) from (drop-zoon)
        dropZoon.classList.remove('drop-zoon--over');
    });

    // When (drop-zoon) has (drop) Event
    dropZoon.addEventListener('drop', function (event) {
        // Prevent Default Behavior
        event.preventDefault();

        // Remove Class (drop-zoon--over) from (drop-zoon)
        dropZoon.classList.remove('drop-zoon--over');
        // Call Function uploadFile(), And Send To Her The Dropped File :)
        uploadFile(event);
    });

    // When (drop-zoon) has (click) Event
    dropZoon.addEventListener('click', function (event) {
        // Click The (fileInput)
        fileInput.click();
    });

    // When (fileInput) has (change) Event
    fileInput.addEventListener('change', function (event) {
        // Call Function uploadFile(), And Send To Her The Chosen File :)
        uploadFile(event);
    });

    // Upload File Function
    function uploadFile(event) {
        // Select The Chosen File
        const file = event.target.files[0];
        // FileReader()
        const fileReader = new FileReader();
        // File Type
        const fileType = file.type;
        // File Size
        const fileSize = file.size;

        // If File Is Passed from the (File Validation) Function
        if (fileValidate(fileType, fileSize)) {
            // Add Class (drop-zoon--Uploaded) on (drop-zoon)
            dropZoon.classList.add('drop-zoon--Uploaded');

            // Show Loading-text
            loadingText.style.display = "block";

            // After File Reader Loaded
            fileReader.addEventListener('load', function () {
                // After Half Second
                setTimeout(function () {
                    // Hide Loading-text (please-wait) Element
                    loadingText.style.display = "none";

                    createPreview(fileReader.result, file.name);
                }, 500); // 0.5s
            });
            // Read (file) As Data Url
            fileReader.readAsDataURL(file);
        } else { // Else
            this; // (this) Represent The fileValidate(fileType, fileSize) Function
        };
    };

    /**
    *  <img src="" alt="Preview Image" id="previewImage" class="drop-zoon__preview-image" draggable="false">v>
    **/
    function createPreview(filedata, filename) {
        const imageEL = document.createElement('img');
        imageEL.setAttribute('alt', 'Preview Image');
        imageEL.setAttribute('id', 'previewImage');
        imageEL.setAttribute('draggable', 'false');
        imageEL.classList.add('drop-zoon__preview-image');
        imageEL.setAttribute('src', filedata);

        dropZoon.appendChild(imageEL);
    }

    // Simple File Validate Function
    function fileValidate(fileType, fileSize) {
        // File Type Validation
        let isImage = imagesTypes.filter((type) => fileType.indexOf(`image/${type}`) !== -1);

        // If The Uploaded File Is An Image
        if (isImage.length !== 0) {
            // Check, If File Size Is 2MB or Less
            if (fileSize <= 2000000) { // 2MB :)
                return true;
            } else { // Else File Size
                return alert('Please Your File Should be 2 Megabytes or Less');
            };
        } else { // Else File Type
            return alert('Please make sure to upload An Image File Type');
        };
    };
</script>
@endsection
