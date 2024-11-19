
$(document).ready(function () {
  // Get model URL from query string
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('Product_category');
  const productId = urlParams.get('product_id');

  if (!productId) {
    console.error('Product ID not found in query string');
    return;
  }
  console.log('Category:', category);
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
    $.ajax({
      url: `/get-product/${productId}`, // API endpoint to fetch product data
      method: 'GET',
      success: function (response) {
        if (response.success) {
          console.log('Product found:', response.product); // Log the product details
          console.log("modelposition", response.product.model_position_left);
          const product = response.product;
          console.log("product", product);
          $('#left-position-x').val(product.model_position_left.x);
          $('#left-position-y').val(product.model_position_left.y);
          $('#left-position-z').val(product.model_position_left.z);
          $('#left-rotation-x').val(product.model_rotation_left.x);
          $('#left-rotation-y').val(product.model_rotation_left.y);
          $('#left-rotation-z').val(product.model_rotation_left.z);
          $('#right-position-x').val(product.model_position_right.x);
          $('#right-position-y').val(product.model_position_right.y);
          $('#right-position-z').val(product.model_position_right.z);
          $('#right-rotation-x').val(product.model_rotation_right.x);
          $('#right-rotation-y').val(product.model_rotation_right.y);
          $('#right-rotation-z').val(product.model_rotation_right.z);
          $('#glasses-position-x').val(product.model_position_glasses.x);
          $('#glasses-position-y').val(product.model_position_glasses.y);
          $('#glasses-position-z').val(product.model_position_glasses.z);
          $('#glasses-rotation-x').val(product.model_rotation_glasses.x);
          $('#glasses-rotation-y').val(product.model_rotation_glasses.y);

          $('#scale-slider').val(product.model_scale.x);

          console.log("modelpositionleft", product.model_position_left.x);
          console.log($('#left-position-x').val());
        
          // Add the asset item for the model URL
          addAssetItem(modelUrl, 'earringModelAsset');
        
          if (category == "earing") {
            // Set the model URL in A-Frame along with initial rotation, position, and scale
            const gltfModel1 = $('a-scene > a-entity > #earringEntityleft'); // Select the a-gltf-model inside earringEntity
            console.log("tag set to left gltf model", gltfModel1);
            gltfModel1.attr({
              'src': '#earringModelAsset', // Reference the asset by ID
              position: `${product.model_position_left.x} ${product.model_position_left.y} ${product.model_position_left.z}`,
              rotation: `${product.model_rotation_left.x} ${product.model_rotation_left.y} ${product.model_rotation_left.z}`,
              scale: `${product.model_scale.x} ${product.model_scale.y} ${product.model_scale.z}`
            });
        
            const gltfModel2 = $('#earringEntityright'); // Select the a-gltf-model inside earringEntity
            console.log("tag set to right gltf model", gltfModel2);
            gltfModel2.attr({
              'src': '#earringModelAsset', // Reference the asset by ID
              position: `${product.model_position_right.x} ${product.model_position_right.y} ${product.model_position_right.z}`,
              rotation: `${product.model_rotation_right.x} ${product.model_rotation_right.y} ${product.model_rotation_right.z}`,
              scale: `${product.model_scale.x} ${product.model_scale.y} ${product.model_scale.z}`
              // 'rotation': '0 15 0',        // Initial rotation (adjust as needed)
              // 'position': '0.02 -0.43 -0.1', // Initial position (adjust as needed)
              // 'scale': '0.07 0.07 0.07'    // Initial scale (adjust as needed)
            });
        
          } else if (category == "eyewear") {
            console.log("inside eyewear");
            const gltfModel3 = $('#glassesmodel');
            console.log("tag set to glasses gltf model", gltfModel3);
            gltfModel3.attr({
              'src':'#earringModelAsset',
              position: `${product.model_position_glasses.x} ${product.model_position_glasses.y} ${product.model_position_glasses.z}`,
              rotation: `${product.model_rotation_glasses.x} ${product.model_rotation_glasses.y}`,
              scale: `${product.model_scale.x} ${product.model_scale.y} ${product.model_scale.z}`
            });
          }
        
        } else {
          console.error('Model URL not found in query string');
        }
        
        // Set mindar-face-target on a-entity (if not already set)
        // $('#earringEntity').attr('mindar-face-target', 'anchorIndex: 127');
      },
      error: function (error) {
        console.error('Error fetching product:', error);
      }
    });


  }
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
  // for glasses
  $('#glasses-position-x, #glasses-position-y, #glasses-position-z').on('input', function () {
    const positionX = parseFloat($('#glasses-position-x').val()) || 0; // Parse to float, fallback to 0
    const positionY = parseFloat($('#glasses-position-y').val()) || 0;
    const positionZ = parseFloat($('#glasses-position-z').val()) || 0;
    $('#glassesmodel').attr('position', `${positionX} ${positionY} ${positionZ}`);
  });
  $('#glasses-rotation-x, #glasses-rotation-y').on('input', function () {
    const rotationX = parseFloat($('#glasses-rotation-x').val()) || 0; // Parse to float, fallback to 0
    const rotationY = parseFloat($('#glasses-rotation-y').val()) || 0;
    
    $('#glassesmodel').attr('rotation', `${rotationX} ${rotationY}`);
  });

  // Scale controls
  $('#scale-slider').on('input', function () {
    var scaleValue = parseFloat($(this).val()) || 1; // Parse to float, fallback to 1
    $('#earringEntityleft').attr('scale', `${scaleValue} ${scaleValue} ${scaleValue}`);
    $('#earringEntityright').attr('scale', `${scaleValue} ${scaleValue} ${scaleValue}`);
    $('#glassesmodel').attr('scale', `${scaleValue} ${scaleValue} ${scaleValue}`);
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

    // Now you can use the productId for your update functionality for earing
    const rotationXL = parseFloat($('#left-rotation-x').val()) || 0;
    const rotationYL = parseFloat($('#left-rotation-y').val()) || 0;
    const rotationZL = parseFloat($('#left-rotation-z').val()) || 0;
    console.log("rotationYL", rotationYL);

    const positionXL = parseFloat($('#left-position-x').val()) || 0;
    console.log("positionXL", positionXL);
    const positionYL = parseFloat($('#left-position-y').val()) || 0;
    const positionZL = parseFloat($('#left-position-z').val()) || 0;

    const scaleValue = parseFloat($('#scale-slider').val()) || 1;
    const rotationXR = parseFloat($('#right-rotation-x').val()) || 0;
    const rotationYR = parseFloat($('#right-rotation-y').val()) || 0;
    const rotationZR = parseFloat($('#right-rotation-z').val()) || 0;
    console.log("rotationYR", rotationYR);

    const positionXR = parseFloat($('#right-position-x').val()) || 0;
    console.log("positionXR", positionXR);
    const positionYR = parseFloat($('#right-position-y').val()) || 0;
    const positionZR = parseFloat($('#right-position-z').val()) || 0;

    //  for glasses
    const rotationX_glasses = parseFloat($('#glasses-rotation-x').val()) || 0;
    const rotationY_glasses = parseFloat($('#glasses-rotation-y').val()) || 0;

    const positionX_glasses = parseFloat($('#glasses-position-x').val()) || 0;
    const positionY_glasses = parseFloat($('#glasses-position-y').val()) || 0;
    const positionZ_glasses = parseFloat($('#glasses-position-z').val()) || 0;



    // Prepare the data to send to the server
    const data = {
      model_rotation_left: {
        x: rotationXL,
        y: rotationYL,
        z: rotationZL
      },
      model_position_left: {
        x: positionXL,
        y: positionYL,
        z: positionZL
      },
      model_rotation_right: {
        x: rotationXR,
        y: rotationYR,
        z: rotationZR
      },
      model_position_right: {
        x: positionXR,
        y: positionYR,
        z: positionZR
      },
      model_scale: {
        x: scaleValue,
        y: scaleValue,
        z: scaleValue
      },
      model_rotation_glasses: {
        x: rotationX_glasses,
        y: rotationY_glasses
      },
      model_position_glasses: {
        x: positionX_glasses,
        y: positionY_glasses,
        z: positionZ_glasses
      }
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