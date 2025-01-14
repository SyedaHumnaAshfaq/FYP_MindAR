
// //new for virtual try on


// document.addEventListener("DOMContentLoaded", function () {
//     const list = ["earring", "earring1","earring2","earring3","nosepin","noserings","glasses","glasses1","glasses2","glasses3"];
//     const visibles = [false, true];
//     const setVisible = (button, entities, visible) => {
//         if (visible) {
//             button.classList.add("selected");
//         } else {
//             button.classList.remove("selected");
//         }
//         entities.forEach((entity) => {
//             entity.setAttribute("visible", visible);
//         });
//     }
//     list.forEach((item, index) => {
//         const button = document.querySelector("#" + item);
//         const entities = document.querySelectorAll("." + item + "-entity");
//         setVisible(button, entities, visibles[index]);
//         button.addEventListener('click', () => {
//             visibles[index] = !visibles[index];
//             setVisible(button, entities, visibles[index]);
//         });
//     });
//     {
//         const elements = document.querySelectorAll('.animate');
//         elements.forEach((element, index) => {
//             setTimeout(() => {
//                 element.classList.add('visible');
//             }, index * 2000); // Delay each element by 2 seconds
//         });
//     }

// });
const EarringCards = document.querySelectorAll('.earring-card');

EarringCards.forEach(card => {
    let modelVisible = true; // Track visibility state for each card

    card.addEventListener('click', () => {
        const productId = card.dataset.productId;
        const productCategory = card.dataset.productCategory;
        // Check if the clicked card is already selected
        if (card.classList.contains('selected')) {
            // If selected, remove the "selected" class and remove the model
            card.classList.remove('selected');
            removeExistingModel(productCategory); // Remove the model for this category
            return; // Stop further execution
        }

        console.log("Card clicked! Category:", productCategory);

        // Remove existing model of the same category before adding a new one
       

        // Remove the "selected" class from all other cards in the same category
        EarringCards.forEach(otherCard => {
            if (otherCard.dataset.productCategory === productCategory) {
                otherCard.classList.remove('selected');
                removeExistingModel(productCategory);
            }
        });

        // Add the "selected" class to the clicked card
        card.classList.add('selected');
        

        // Load the new model for the selected product
        loadModel(productId, productCategory);
    });
});
function removeExistingModel(category) {
    // Use data-category attribute to remove only the selected model of the category
    const selectedModels = document.querySelectorAll(`.earring-entity[data-category="${category}"]`);
    console.log("Selected Models:", selectedModels);
    
    // Loop through all matching models and remove them
    selectedModels.forEach(model => model.remove());
}
function loadModel(productId, productCategory) {
    if (productId === null) {
        // Remove all model entities
        // $(".earring-entity").remove();
        removeExistingModel(productCategory);
        return;
    }
    else {
        // Make an AJAX request to get the product details based on productId
        $.ajax({
            url: `/get-product/${productId}`,  // Backend route to get product details
            method: 'GET',
            success: function (response) {
                if (response.success) {
                    const product = response.product; // Access the product data
                    console.log("Product data fetched:", product);
                    console.log("Model Rotation Left:", product.model_rotation_left);
                    console.log("Model Rotation right:", product.model_rotation_right);
                    console.log("Model Position right:", product.model_position_right);

                    console.log("model scale", product.model_scale);

                    // Remove any existing model entities
                    // $(".earring-entity").remove();

                    // Create new model entities dynamically
                    if (productCategory == "earing") {
                        const leftEntity = `
          <a-entity mindar-face-target="anchorIndex: 127"  >
            <a-gltf-model rotation="${product.model_rotation_left.x} ${product.model_rotation_left.y} ${product.model_rotation_left.z}"
                          position="${product.model_position_left.x} ${product.model_position_left.y} ${product.model_position_left.z}"
                          scale="${product.model_scale.x} ${product.model_scale.y} ${product.model_scale.z}"
                          src="#${product._id}"
                          class="earring-entity" data-category="${productCategory}" 
                      data-selected="true" visible="true"></a-gltf-model>
          </a-entity>`;

                        const rightEntity = `
          <a-entity mindar-face-target="anchorIndex: 356"  >
            <a-gltf-model rotation="${product.model_rotation_right.x} ${product.model_rotation_right.y} ${product.model_rotation_right.z}"
                          position="${product.model_position_right.x} ${product.model_position_right.y} ${product.model_position_right.z}"
                          scale="${product.model_scale.x} ${product.model_scale.y} ${product.model_scale.z}"
                          src="#${product._id}"
                          class="earring-entity" data-category="${productCategory}" 
                      data-selected="true" visible="true"></a-gltf-model>
          </a-entity>`;
                        document.querySelector('a-scene').insertAdjacentHTML('beforeend', leftEntity);
                        document.querySelector('a-scene').insertAdjacentHTML('beforeend', rightEntity);
                    }
                    else if (productCategory == "eyewear") {
                        const glassesentity = `
          <a-entity mindar-face-target="anchorIndex: 168"  >
            <a-gltf-model rotation="${product.model_rotation_glasses.x} ${product.model_rotation_glasses.y}"
                          position="${product.model_position_glasses.x} ${product.model_position_glasses.y} ${product.model_position_glasses.z}"
                          scale="${product.model_scale.x} ${product.model_scale.y} ${product.model_scale.z}"
                          src="#${product._id}"
                          class="earring-entity" visible="true" data-category="${productCategory}" 
                      data-selected="true"></a-gltf-model>
          </a-entity>`;
                        document.querySelector('a-scene').insertAdjacentHTML('beforeend', glassesentity);
                    }
                    else if (productCategory == "nosepin") {
                        const nosepinentity = `
                        <a-entity mindar-face-target="anchorIndex: 1"  >
                          <a-gltf-model rotation="${product.model_rotation_nosepin.x} ${product.model_rotation_nosepin.y} ${product.model_rotation_nosepin.z}"
                                        position="${product.model_position_nosepin.x} ${product.model_position_nosepin.y} ${product.model_position_nosepin.z}"
                                        scale="${product.model_scale.x} ${product.model_scale.y} ${product.model_scale.z}"
                                        src="#${product._id}"
                                        class="earring-entity" data-category="${productCategory}" 
                      data-selected="true" visible="true"></a-gltf-model>
                        </a-entity>`;
                        document.querySelector('a-scene').insertAdjacentHTML('beforeend', nosepinentity);

                    }

                    // Append the new models to the scene


                }

            },
            error: function (err) {
                console.log("Error fetching product data:", err);
            }

        });
    }
}
$(document).ready(function () {
    const productId = sessionStorage.getItem('productId');
    const productCategory = sessionStorage.getItem('productCategory');

    if (productId && productCategory) {
        console.log('Product ID:', productId);
        console.log('Product Category:', productCategory);

        // Trigger the logic to load the selected product model
        loadModel(productId, productCategory);
        EarringCards.forEach(card => {
            card.classList.remove('selected');
            if (card.dataset.productId === productId) {
                card.classList.add('selected');
            }
        });

        // Optionally, clear session storage after use
        sessionStorage.removeItem('productId');
        sessionStorage.removeItem('productCategory');
    }
});
