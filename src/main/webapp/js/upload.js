function setupReviewer() {
  $("#reviewerDiv").fadeIn();

  var fileSelecters = $("#pdf-file");
  var fileSelecter = $("#pdf-file")[0];
  var uploadBtn = $("#upload");

  uploadBtn.attr("disabled", true);

  // Show that the file has been changed.
  fileSelecters.on("change", function() {
    if($(this)[0].files[0] != null) {
      var selected = $(this)[0].files[0].name;
      showAlert("info", selected + " has been selected to upload.");
      uploadBtn.attr("disabled", false);
    }
    else {
      showAlert("warning", "The file to upload has been deselected.");
      uploadBtn.attr("disabled", true);
    }
  });

  setDownloadBtnLink(getQueryParams("writer"), getQueryParams("repoName"), getQueryParams("paper"));

  uploadBtn.on("click", function(e) {
    e.preventDefault();

    // Get data and be sure everything is there before it is sent.
    var file = fileSelecter.files[0];
    
    if(file == null) {
      showAlert("danger", "Be sure to select a file.");
      return;
    }

    var repoName = getQueryParams("repoName");
    if(repoName == null) {
      showAlert("danger", "No repository specified, be sure your link is correct.");
      return;
    }

    var writer = getQueryParams("writer");
    if(writer == null) {
      showAlert("danger", "No writer specified, be sure your link is correct.");
    }

    // Show that data is being sent.
    uploadBtn.val("Uploading...")
    uploadBtn.attr("disabled", true)

    // Attach the file to the request data.
    var formData = new FormData();
    formData.append("file", file);

    // Send data
    $.ajax("/review?access_token=" + accessToken + "&repoName=" + escape(repoName) + "&writer=" + escape(writer), {
      type: "POST",
      processData: false,
      contentType: false,
      data: formData 
    })
    .done(function(data) {
      var pdfUrl = "https://github.com/" + writer + "/" + repoName + "/blob/master/" + data;
      showAlert("success", "<strong>Success!</strong> Your PDF has been processed. Click <a href=" + pdfUrl + ">here</a> view it.");
    })
    .fail(function() {
      showAlert("danger", "<strong>Uh oh!</strong> There has been an error submitting your review.");
    })
    .always(function() {
      uploadBtn.val("Upload");
      uploadBtn.attr("disabled", false);
    })

  });
}

function setDownloadBtnLink(writer, repoName, paper) {
  if(writer == null || repoName == null || paper == null) {
    $("#downloadPaper").hide();
    return;
  }

  var url = "https://github.com/" + writer + "/" + repoName + "/raw/master/" + paper;
  console.log(url);
  $("#downloadPaper").attr("href", url);
}