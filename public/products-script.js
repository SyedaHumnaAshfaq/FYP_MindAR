

$(document).ready(function () {
    $('.product-action').on('click', function (event) {
        event.preventDefault();
        console.log("product delete clicked");

        const action = $(this).data('value');
        console.log(action);
        const productRow = $(this).closest('tr');
        const productId = productRow.data('product-id');

        if (action === 'delete') {
            if (confirm('Are you sure you want to delete this product?')) {
                $.ajax({
                    url: '/products/delete/' + productId,
                    type: 'DELETE',
                    success: function (response) {
                        if (response.success) {
                            productRow.remove();
                            alert('Product deleted successfully.');
                        } else {
                            alert('Error: ' + response.message);
                        }
                    },
                    error: function (err) {
                        alert('Failed to delete product.');
                    }
                });
            }
        }
    });
    selectedCategory = null;
    selectedOther = null;
    let originalOrder = $('tbody').html();
    $('.filter-by-category').on('click', function (e) {
        e.preventDefault();

        selectedCategory = $(this).data('value');
        $('.currentCategory').text(selectedCategory || 'Category');
        applyFilters();

    });
    $('.filter-by-other').on('click', function (e) {
        e.preventDefault();
        selectedOther = $(this).data('value');
        $('.currentOther').text(selectedOther || 'Other');
        if (selectedOther === "Low to High Price") {
            applyFilters(true, false);
        }
        if (selectedOther === "High to Low Price") {
            applyFilters(false, true);
        }
        if (selectedOther === "Status-Out of Stock") {
            applyFilters(false, false);
        }
        if (selectedOther === "Status-Selling") {
            applyFilters(false, false);
        }
        if (selectedOther === "Published") {
            applyFilters(false, false);
        }
        if(selectedOther==="Unpublished"){
            applyFilters(false,false);
        }
    });

    $('#searchCustomerName').on('keyup', function () {
        applyFilters();
    });
    $('.reset').on('click', function () {
        $('#searchCustomerName').val('');
        $('.currentCategory').text('Category');
        $('.currentOther').text('Other');
        selectedCategory = null;
        selectedOther = null;

        $('tbody').html(originalOrder);
        // applyFilters();
    });

    function applyFilters(sortByPriceASC = false,sortByPriceDESC = false) {
        const searchText = $('#searchCustomerName').val().toLowerCase();
        let rows = $('tbody tr');
    
        rows.each(function () {
            const productName = $(this).find('.productName').text().toLowerCase();
            const rowCategory = $(this).find('.category').text().toLowerCase();
            const price = parseFloat($(this).find('.price').text());
            const status = $(this).find('.status').text().trim().toLowerCase();
            const publish = $(this).find('.toggle-publish').is(':checked');

            console.log(status);            
            let isVisible = true;

            if (searchText && !productName.includes(searchText)) {
                isVisible = false;
            }
            if (selectedCategory && !rowCategory.includes(selectedCategory)) {
                isVisible = false;
            }
            if (selectedOther === "Status-Out of Stock" && status !== "out of stock") {
                isVisible = false;
            }
            if (selectedOther === "Status-Selling" && status !== "selling") { 
                isVisible = false;
            }
            if (selectedOther === "Published" && !publish) {
                isVisible = false;
            }
            if (selectedOther === "Unpublished" && publish) {
                isVisible = false;
            }

            if (isVisible) {
                $(this).show().data('price', price);
                // $(this).show();
            } else {
                $(this).hide();
            }
            if (sortByPriceASC) {

                rows = rows.filter(':visible').sort(function (a, b) {
                    return $(a).data('price') - $(b).data('price');
                });

                $('tbody').append(rows); // Reorder the rows based on price
            }
            if (sortByPriceDESC) {

                rows = rows.filter(':visible').sort(function (a, b) {
                    return $(b).data('price') - $(a).data('price');
                });

                $('tbody').append(rows); // Reorder the rows based on price
            }
        });
    }
    $('.toggle-publish').on('change', function () {
        const productId = $(this).data('id');
        const isPublished = $(this).is(':checked');

        $.ajax({
            url: '/products/update-publish-status/' + productId,
            type: 'POST',
            data: { isPublished: isPublished },
            success: function (response) {
                if (response.success) {
                    alert('Publish status updated successfully.');
                } else {
                    alert('Failed to update publish status.');
                }
            },
            error: function (err) {
                alert('Error updating publish status.');
            }
        });
    });

    // Slide in the form when the button is clicked
    $('.add-product').on('click', function () {
        $('#productFormContainer').css('left', '0');
        $('#addProductForm').find('h2').text('Add Product');
        $('#addProductBtn').text('Add Product');
        // $('#addProductForm').data('product-id', null);
        $('#productName').val('');
        $('#productPrice').val('');
        $('#productImageURL').val('');
        $('#productDescription').val('');
        $('#productCategory').val('');
        $('#productStock').val('');
        $('#productRating').val('');
        $('#productModelURL').val('');

    });
    $(document).on('click', '#updateBTN', function (event) {
        event.preventDefault(); // Prevent the default anchor behavior

        // Change the form title and button text for updating
        $('#addProductForm').find('h2').text('Update Product');
        $('#addProductBtn').text('Update Product');

        // Display the form by sliding it into view
        $('#productFormContainer').css('left', '0');


        // Get the product ID from the closest tr element
        const productId = $(this).closest('tr').data('product-id');

        // Fetch the product data using AJAX
        $.ajax({
            url: '/products/update/' + productId,
            type: 'GET',
            success: function (response) {
                if (response.success) {
                    console.log(response.product);
                    // Populate the form fields with the product data
                    $('#productName').val(response.product.Product_name);
                    // $('#productPrice').val(response.product.Product_price);
                    // $('#productPrice').val(parseFloat(response.product.Product_price).toFixed(2));
                    $('#productPrice').val(parseFloat(response.product.Product_price.$numberDecimal));
                    $('#productImageURL').val(response.product.Product_image_url);
                    $('#productDescription').val(response.product.Product_description);
                    $('#productCategory').val(response.product.Product_category);
                    $('#productStock').val(response.product.Product_stock);
                    $('#productRating').val(response.product.Product_rating);
                    $('#productModelURL').val(response.product.Product_model_url);
                    // $('#productIsPublished').prop('checked', response.product.is_Published);

                    // Store the product ID in the form as a data attribute
                    $('#addProductForm').data('product-id', productId);
                } else {
                    alert('Failed to load product data.');
                }
            },
            error: function () {
                alert('Error fetching product data.');
            }
        });
    });
    // Slide out the form when the cancel button is clicked
    $('#cancelBtn').on('click', function () {
        $('#productFormContainer').css('left', '-100%');
    });

    // Handle form submission
    $('#addProductForm').on('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(document.getElementById('addProductForm'));
        // console.log(formData);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        const productId = $('#addProductForm').data('product-id');
        const isUpdate = Boolean(productId);
        console.log(isUpdate);

        if (isUpdate) {
            $.ajax({
                url: '/products/update/' + productId,
                type: 'PUT',
                data: formData,
                contentType: false,  // Important: do not set content-type, let jQuery handle it
                processData: false, // Important: do not process the data, let jQuery handle it
                success: function (response) {
                    if (response.success) {
                        alert('Product updated successfully!');
                        refreshTable();
                        $('#productFormContainer').css('left', '-100%');
                        // window.location.reload();
                    } else {
                        alert('Failed to update product.');
                    }
                },
            });
        }
        else {
            $.ajax({
                url: '/products/add',
                type: 'POST',
                data: formData,
                contentType: false,  // Important: do not set content-type, let jQuery handle it
                processData: false, // Important: do not process the data, let jQuery handle it
                success: function (response) {
                    if (response.success) {
                        // alert('Product added successfully!');
                        refreshTable();
                        window.location.href = `/VTOAdmin?modelUrl=${encodeURIComponent(response.modelUrl)}`;

                        $('#productFormContainer').css('left', '-100%'); // Slide out after successful submission

                    } else {
                        alert('Failed to add product.');
                    }
                },
                error: function () {
                    alert('Error adding product.');
                }
            });
        }
    });

    function refreshTable() {
        $.ajax({
            url: '/product/getAll', // Adjust this URL to match your endpoint
            type: 'GET',
            success: function (response) {
                if (response.success) {
                    const products = response.products;
                    let tableBody = '';

                    products.forEach(product => {
                        tableBody += `
                            <tr data-product-id="${product._id}">
                                <td class="productName">${product.Product_name}</td>
                                <td class="category">${product.Product_category}</td>
                               <td class="price">${product.Product_price.$numberDecimal}</td>
                                <td class="stock">${product.Product_stock}</td>
                                <td class="status">${product.Product_stock === 0 ? 'Out of Stock' : 'Selling'}</td>
                                <td class="view">
                                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                                </td>
                                <td class="published">
                                    <label class="switch">
                                        <input type="checkbox" class="toggle-publish" data-id="${product._id}" ${product.is_Published ? 'checked' : ''}>
                                        <span class="slider"></span>
                                    </label>
                                </td>
                                <td>
                                    <div class="dropdown">
                                        <div class="Action">Action</div>
                                        <div class="dropdown-contentforaction">
                                            <a href="#" data-value="delete" class="status-option product-action">Delete</a>
                                            <a href="#" data-value="update" class="status-option" id="updateBTN">Update</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        `;
                    });

                    $('.table-div tbody').html(tableBody);
                } else {
                    alert('Failed to fetch products.');
                }
            },
            error: function () {
                alert('Error fetching products.');
            }
        });
    }
    
    $('.close-button').on('click', function() {
        $('#productModal').hide();
    });


    $('.view').on('click', function() {
        const productId = $(this).closest('tr').data('product-id');

        // Fetch product details from the server
        $.ajax({
            url: '/products/update/' + productId, // Assuming you have this endpoint
            method: 'GET',
            success: function(response) {
                if (response.success) {
                    openProductModal(response.product);
                } else {
                    alert('Failed to load product details.');
                }
            },
            error: function() {
                alert('An error occurred while fetching the product details.');
            }
        });
    });
    function openProductModal(product) {
        console.log(product);
        $('.prodName').text(product.Product_name);
        $('.productImage').attr('src', product.Product_image_url);
        $('.productPrice').text(product.Product_price.$numberDecimal);
        $('.productDescription').text(product.Product_description);
        $('.productRating').text(product.Product_rating);
        $
        console.log(product.Product_price);
        // $('#productStatus').text(product.Product_status);
        $('#productModal').show(); // Show the modal
    }


});