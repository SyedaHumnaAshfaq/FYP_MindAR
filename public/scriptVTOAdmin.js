$(document).ready(function() {
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
        console.log("tag set to left gltf model",gltfModel1);
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
    $('#left-rotation-x, #left-rotation-y, #left-rotation-z').on('input', function () {
      const rotationX = $('#left-rotation-x').val();
      const rotationY = $('#left-rotation-y').val();
      const rotationZ = $('#left-rotation-z').val();
      $('#earringEntityleft').attr('rotation', `${rotationX} ${rotationY} ${rotationZ}`);
    });
  
    $('#left-position-x, #left-position-y, #left-position-z').on('input', function () {
      const positionX = $('#left-position-x').val();
      const positionY = $('#left-position-y').val();
      const positionZ = $('#left-position-z').val();
      $('#earringEntityleft').attr('position', `${positionX} ${positionY} ${positionZ}`);
    });
  
    $('#left-scale').on('input', function () {
      const scale = $('#left-scale').val();
      $('#earringEntityleft').attr('scale', `${scale} ${scale} ${scale}`);
    });
  
    // Right earring controls
    $('#right-rotation-x, #right-rotation-y, #right-rotation-z').on('input', function () {
      const rotationX = $('#right-rotation-x').val();
      const rotationY = $('#right-rotation-y').val();
      const rotationZ = $('#right-rotation-z').val();
      $('#earringEntityright').attr('rotation', `${rotationX} ${rotationY} ${rotationZ}`);
    });
  
    $('#right-position-x, #right-position-y, #right-position-z').on('input', function () {
      const positionX = $('#right-position-x').val();
      const positionY = $('#right-position-y').val();
      const positionZ = $('#right-position-z').val();
      $('#earringEntityright').attr('position', `${positionX} ${positionY} ${positionZ}`);
    });
  
    $('#right-scale').on('input', function () {
      const scale = $('#right-scale').val();
      $('#earringEntityright').attr('scale', `${scale} ${scale} ${scale}`);
    });

    $('#scale-slider').on('input', function() {
        var scaleValue = $(this).val();
        $('#earringEntityleft').attr('scale', `${scaleValue} ${scaleValue} ${scaleValue}`);
        $('#earringEntityright').attr('scale', `${scaleValue} ${scaleValue} ${scaleValue}`);
    });
    
  });
  