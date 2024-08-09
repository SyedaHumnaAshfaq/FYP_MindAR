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
    $('.filter-by-category').on('click', function (e) {
        e.preventDefault();

        selectedCategory = $(this).data('value');
        $('.currentCategory').text(selectedCategory || 'Category');
        applyFilters();

    });

    $('#searchCustomerName').on('keyup', function () {
        applyFilters();
    });
    $('.reset').on('click', function () {
        $('#searchCustomerName').val('');
        $('.currentCategory').text('Category');
        selectedCategory = null;
        
        applyFilters();
    });

    function applyFilters() {
        const searchText = $('#searchCustomerName').val().toLowerCase();

        $('tbody tr').each(function () {
            const productName = $(this).find('.productName').text().toLowerCase();
            const rowCategory = $(this).find('.category').text().toLowerCase();
            // const now = new Date();
            
            let isVisible = true;
    
            if (searchText && !productName.includes(searchText) ) {
                isVisible = false;
            }
            if (selectedCategory && !rowCategory.includes(selectedCategory)) { 
                isVisible = false;
            }

            if (isVisible) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    
});