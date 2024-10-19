
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
        card.addEventListener('click', () => {
            console.log("Card clicked!"); // Log to see if the click is detected
            // console.log($(this).data('product-id'));
  
            // const productId = $(this).data('product-id'); // Replace with dynamic product ID
            const productId = card.dataset.productId;
            console.log("Product ID:", productId);
            loadModel(productId);
        });
  });
function loadModel(productId) {
    // Make an AJAX request to get the product details based on productId
    $.ajax({
        url: `/get-product/${productId}`,  // Backend route to get product details
        method: 'GET',
        success: function (response) {
            if (response.success) {
                const product = response.product; // Access the product data
                console.log("Product data fetched:", product);
                console.log("Model Rotation Left:", product.model_rotation_left);
                console.log("model scale", product.model_scale);
            
                // Remove any existing model entities
                // $(".earring-entity").remove();

                // Create new model entities dynamically
                const leftEntity = `
          <a-entity mindar-face-target="anchorIndex: 127">
            <a-gltf-model rotation="${product.model_rotation_left.x} ${product.model_rotation_left.y} ${product.model_rotation_left.z}"
                          position="${product.model_position_left.x} ${product.model_position_left.y} ${product.model_position_left.z}"
                          scale="${product.model_scale.x} ${product.model_scale.y} ${product.model_scale.z}"
                          src="#${product._id}"
                          class="earring-entity" visible="true"></a-gltf-model>
          </a-entity>`;

                const rightEntity = `
          <a-entity mindar-face-target="anchorIndex: 356">
            <a-gltf-model rotation="${product.model_rotation_right.x} ${product.model_rotation_right.y} ${product.model_rotation_right.z}"
                          position="${product.model_position_right.x} ${product.model_position_right.y} ${product.model_position_right.z}"
                          scale="${product.model_scale.x} ${product.model_scale.y} ${product.model_scale.z}"
                          src="#${product._id}"
                          class="earring-entity" visible="true"></a-gltf-model>
          </a-entity>`;

                // Append the new models to the scene
                document.querySelector('a-scene').insertAdjacentHTML('beforeend', leftEntity);
                document.querySelector('a-scene').insertAdjacentHTML('beforeend', rightEntity);
            }

        },
        error: function (err) {
            console.log("Error fetching product data:", err);
        }
    });
}