$(document).ready(function () { 
    $('.customer-action').on('click', function (event) {
        event.preventDefault();
        console.log("customer delete clicked");
        
        const action = $(this).data('value');
        console.log(action);
        const customerRow = $(this).closest('tr');
        const customerId = customerRow.data('customer-id');

        if (action === 'delete') {
            if (confirm('Are you sure you want to delete this customer?')) {
                $.ajax({
                    url: '/customers/delete/' + customerId,
                    type: 'DELETE',
                    success: function (response) {
                        if (response.success) {
                            customerRow.remove();
                            alert('Customer deleted successfully.');
                        } else {
                            alert('Error: ' + response.message);
                        }
                    },
                    error: function (err) {
                        alert('Failed to delete customer.');
                    }
                });
            }
        }
    });

    $('#searchCustomerName').on('keyup', function () {
        applyFilters();
    });
    $('.reset').on('click', function () {
        $('#searchCustomerName').val('');
        applyFilters();
    });

    function applyFilters() {
        const searchText = $('#searchCustomerName').val().toLowerCase();

        $('tbody tr').each(function () {
            const customerName = $(this).find('.customerName').text().toLowerCase();
            const customerEmail = $(this).find('.customerEmail').text().toLowerCase();
            // const now = new Date();
            
            let isVisible = true;
    
            if (searchText && !customerName.includes(searchText) && !customerEmail.includes(searchText)) {
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