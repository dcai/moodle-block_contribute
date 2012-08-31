YUI().use('event', function(Y) {
    var equella_dropbox = document.getElementById('equella-dropbox');
    equella_dropbox.addEventListener('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        resetDropZone(e);
    }, false);
    equella_dropbox.addEventListener('dragenter', function(e) {
        e.stopPropagation();
        e.preventDefault();
        resetDropZone(e);
    }, false);
    equella_dropbox.addEventListener('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files;
        var count = files.length;
        if (count > 0) {
            handleFiles(files);
        }
    }, false);

    function handleFiles(files) {
        document.getElementById('droplabel').innerHTML = "Processing files";
        var length = files.length;
        for (i = 0; i<length; i++) {
            var file = files[i];
            var reader = new FileReader();
            reader.onload = handleReaderLoad;
            reader.readAsDataURL(file);
            uploadFile(file, i);
        }
    }

    function uploadFile(file, index) {
        var uri = M.cfg.wwwroot + '/blocks/equella_contribute/upload.php';
        Y.one('#droplabel').setHTML('Uploading');
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(e) {
            if (e.lengthComputable) {
                var percentage = Math.round((e.loaded * 100) / e.total);
            }
        }, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var items = JSON.parse(xhr.responseText);
                    if (items) {
                        if (items.error) {
                            alert(items.error);
                            return;
                        }
                        var item = items.pop();
                        var attachments = item['attachments'];
                        for (index in attachments) {
                            var filename = attachments[index].filename;
                            var description = attachments[index].description;
                            var thumbnail = '<img src="' + attachments[index].links.thumbnail + '" />';
                            var view = attachments[index].links.view;
                            var button = "<p><button id='equella-contribute-reset'>Clear</button></p>";
                            var html = '';
                            html += '<p><a target="_blank" href="' + view + '">' + filename + '</a></p>';
                            html += thumbnail;
                            html += button;
                            Y.one('#equella-dropbox').removeClass('equella-dnd').addClass('equella-result').setHTML(html);
                            Y.one('#equella-contribute-reset').on('click', function(e) {
                                resetDropZone(e);
                            });
                        }
                    }
                }
            }
        };
        var form = new FormData();
        form.append('dndfile-' + index, file);

        xhr.open('POST', uri, true);
        xhr.send(form);

    }

    function resetDropZone(e) {
        if (Y.one('#equella-dropbox').hasClass('equella-result')) {
            var html = '<p id="droplabel">Drop zone</p>';
            Y.one('#equella-dropbox').removeClass('equella-result').addClass('equella-dnd').setHTML(html);
        }
    }

    function handleReaderLoad(e) {
    }
});
