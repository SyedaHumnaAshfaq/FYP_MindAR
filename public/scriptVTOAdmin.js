
$(document).ready(function () {
  // Get model URL from query string
  const urlParams = new URLSearchParams(window.location.search);
  const modelUrl = urlParams.get('modelUrl');
  console.log('Model URL:', modelUrl);
  // Set the model URL in A-Frame along with initial rotation, position, and scale
  function addAssetItem(modelURL, assetId) {
    const assetItem = document.createElement('a-asset-item');
    assetItem.setAttribute('src', modelURL);
    console.log(assetItem.id);
    assetItem.setAttribute('id', assetId);
    $('a-assets').append(assetItem);
    console.log("adding asset item");
  }
  if (modelUrl) {
    // Add the asset item for the model URL
    addAssetItem(modelUrl, 'earringModelAsset');

    // Set the model URL in A-Frame along with initial rotation, position, and scale
    const gltfModel1 = $('a-scene > a-entity > #earringEntityleft'); // Select the a-gltf-model inside earringEntity
    console.log("tag set to left gltf model", gltfModel1);
    gltfModel1.attr({
      'src': '#earringModelAsset', // Reference the asset by ID
      'rotation': '0 -15 0',           // Initial rotation (adjust as needed)
      'position': '-0.02 -0.43 -0.1',  // Initial position (adjust as needed)
      'scale': '0.07 0.07 0.07'        // Initial scale (adjust as needed)
    });
    const gltfModel2 = $('#earringEntityright'); // Select the a-gltf-model inside earringEntity
    console.log("tag set to right gltf model", gltfModel2);
    gltfModel2.attr({
      'src': '#earringModelAsset', // Reference the asset by ID
      'rotation': '0 15 0',           // Initial rotation (adjust as needed)
      'position': '0.02 -0.43 -0.1',  // Initial position (adjust as needed)
      'scale': '0.07 0.07 0.07'        // Initial scale (adjust as needed)

    });

  } else {
    console.error('Model URL not found in query string');
  }

  // Set mindar-face-target on a-entity (if not already set)
  // $('#earringEntity').attr('mindar-face-target', 'anchorIndex: 127');
});

$(document).ready(function () {
  // Left earring controls
  // Left earring controls
  $('#left-rotation-x, #left-rotation-y, #left-rotation-z').on('input', function () {
    const rotationX = parseFloat($('#left-rotation-x').val()) || 0; // Parse to float, fallback to 0
    const rotationY = parseFloat($('#left-rotation-y').val()) || 0;
    const rotationZ = parseFloat($('#left-rotation-z').val()) || 0;
    console.log("rotationX", rotationX);
    $('#earringEntityleft').attr('rotation', `${rotationX} ${rotationY} ${rotationZ}`);
  });

  $('#left-position-x, #left-position-y, #left-position-z').on('input', function () {
    const positionX = parseFloat($('#left-position-x').val()) || 0; // Parse to float, fallback to 0
    const positionY = parseFloat($('#left-position-y').val()) || 0;
    const positionZ = parseFloat($('#left-position-z').val()) || 0;
    $('#earringEntityleft').attr('position', `${positionX} ${positionY} ${positionZ}`);
  });

  // Right earring controls
  $('#right-rotation-x, #right-rotation-y, #right-rotation-z').on('input', function () {
    const rotationX = parseFloat($('#right-rotation-x').val()) || 0; // Parse to float, fallback to 0
    const rotationY = parseFloat($('#right-rotation-y').val()) || 0;
    const rotationZ = parseFloat($('#right-rotation-z').val()) || 0;
    $('#earringEntityright').attr('rotation', `${rotationX} ${rotationY} ${rotationZ}`);
  });

  $('#right-position-x, #right-position-y, #right-position-z').on('input', function () {
    const positionX = parseFloat($('#right-position-x').val()) || 0; // Parse to float, fallback to 0
    const positionY = parseFloat($('#right-position-y').val()) || 0;
    const positionZ = parseFloat($('#right-position-z').val()) || 0;
    $('#earringEntityright').attr('position', `${positionX} ${positionY} ${positionZ}`);
  });

  // Scale controls
  $('#scale-slider').on('input', function () {
    var scaleValue = parseFloat($(this).val()) || 1; // Parse to float, fallback to 1
    $('#earringEntityleft').attr('scale', `${scaleValue} ${scaleValue} ${scaleValue}`);
    $('#earringEntityright').attr('scale', `${scaleValue} ${scaleValue} ${scaleValue}`);
  });


  // Call the setProduct function when the button is clicked


});


$(document).ready(function () {
  // Function to get query parameters
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Add click event listener to your set product button
  $('#set-product').on('click', function () {
    console.log('Set product button clicked');
    const productId = getQueryParam('product_id'); // Get product ID from query string

    // Check if productId is retrieved successfully
    if (!productId) {
      alert('Product ID not found in the URL.');
      return;
    }

    // Now you can use the productId for your update functionality
    const rotationXL = parseFloat($('#left-rotation-x').val()) || 0;
    const rotationYL = parseFloat($('#left-rotation-y').val()) || 0;
    const rotationZL = parseFloat($('#left-rotation-z').val()) || 0;
    console.log("rotationXL", rotationXL);

    const positionXL = parseFloat($('#left-position-x').val()) || 0;
    console.log("positionXL", positionXL);
    const positionYL = parseFloat($('#left-position-y').val()) || 0;
    const positionZL = parseFloat($('#left-position-z').val()) || 0;

    const scaleValue = parseFloat($('#scale-slider').val()) || 1;
    const rotationXR = parseFloat($('#left-rotation-x').val()) || 0;
    const rotationYR = parseFloat($('#left-rotation-y').val()) || 0;
    const rotationZR = parseFloat($('#left-rotation-z').val()) || 0;
    console.log("rotationXR", rotationXL);

    const positionXR = parseFloat($('#left-position-x').val()) || 0;
    console.log("positionXR", positionXR);
    const positionYR = parseFloat($('#left-position-y').val()) || 0;
    const positionZR = parseFloat($('#left-position-z').val()) || 0;

   

    // Prepare the data to send to the server
    const data = {
      model_rotation_left: `${rotationXL} ${rotationYL} ${rotationZL}`,
      model_position_left: `${positionXL} ${positionYL} ${positionZL}`,
      model_rotation_right: `${rotationXR} ${rotationYR} ${rotationZR}`,
      model_position_right: `${positionXR} ${positionYR} ${positionZR}`,
      model_scale: `${scaleValue} ${scaleValue} ${scaleValue}`
    };

    // Send the update request
    $.ajax({
      url: `/products/update/${productId}`, // Use the retrieved product ID
      method: 'PUT', // Use PUT for updates
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (response) {
        console.log('Product updated successfully:', response);
      },
      error: function (error) {
        console.error('Error updating product:', error);
      }
    });
  });

});