$(document).ready(function() {
    // Get model URL from query string
    const urlParams = new URLSearchParams(window.location.search);
    const modelUrl = urlParams.get('modelUrl');
    console.log('Model URL:', modelUrl);
    // Set the model URL in A-Frame along with initial rotation, position, and scale
    // function addAssetItem(modelURL, assetId) {
    //     const assetItem = document.createElement('a-asset-item');
    //     assetItem.setAttribute('src', modelURL);
    //     assetItem.setAttribute('id', assetId);
    //     console.log("adding asset item");
    // }
    if (modelUrl) {
        // Add the asset item for the model URL
        // addAssetItem(modelUrl, 'earringModelAsset');

        // Set the model URL in A-Frame along with initial rotation, position, and scale
        const gltfModel = $('#earringEntity > a-gltf-model'); // Select the a-gltf-model inside earringEntity
        console.log("tag set to gltf model",gltfModel);
        gltfModel.attr({
            'src': modelUrl, // Reference the asset by ID
            'rotation': '0 0 0',           // Initial rotation (adjust as needed)
            'position': '0 -0.48 -0.0',  // Initial position (adjust as needed)
            'scale': '0.2 0.2 0.2'        // Initial scale (adjust as needed)
        });
    } else {
        console.error('Model URL not found in query string');
    }

    // Set mindar-face-target on a-entity (if not already set)
    // $('#earringEntity').attr('mindar-face-target', 'anchorIndex: 127');
});
