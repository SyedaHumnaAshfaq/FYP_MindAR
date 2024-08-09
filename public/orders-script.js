$(document).ready(function () {
    
    
    $('.status-option').on('click', function (e) {
        e.preventDefault();

        var newStatus = $(this).data('value');
        var orderId = $(this).closest('tr').data('order-id');

        $.ajax({
            url: '/update-order-status',  // Change this to your actual update URL
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ order_id: orderId, status: newStatus }),
            success: function (response) {
                $('tr[data-order-id="' + orderId + '"] .status').text(newStatus);
                alert('Order status updated to ' + newStatus);
            },
            error: function (xhr, status, error) {
                alert('Failed to update order status. Please try again.');
            }
        });
    });
    let selectedStatus = null;
    let selectedMethod = null;
    let selectedDateRange = null;
    let startDate = null;
    let endDate = null;



    $('.filter-by-status').on('click', function (e) {
        e.preventDefault();

        selectedStatus = $(this).data('value');
        $('.currentStatus').text(selectedStatus || 'Status');
        applyFilters();

    });
    $('.filter-by-method').on('click', function (e) {
        e.preventDefault();

        selectedMethod = $(this).data('value');
        $('.currentMethod').text(selectedMethod || 'Method');
        applyFilters();

    });
    $('.filter-by-date').on('click', function (e) {
        e.preventDefault();
        selectedDateRange = $(this).data('value');
        $('.currentDate').text(selectedDateRange || 'Date');
        applyFilters();
    });
    $('#searchCustomerName').on('keyup', function () {
        applyFilters();
    });
    $('.reset').on('click', function () {
        $('#searchCustomerName').val('');
        $('.currentStatus').text('Status');
        $('.currentMethod').text('Method');
        $('.currentDate').text('Date');
        $('#Startdate').val('');
        $('#Enddate').val('');
        selectedStatus = null;
        selectedMethod = null;
        selectedDateRange = null;
        startDate = null;
        endDate = null;
        applyFilters();
    });
    $('#Startdate').on('change', function () {
        startDate = new Date($(this).val());
        startDate.setHours(0, 0, 0, 0);
        applyFilters();
    });

    $('#Enddate').on('change', function () {
        endDate = new Date($(this).val());
        endDate.setHours(23, 59, 59, 999);
        applyFilters();
    });

    function applyFilters() {
        const searchText = $('#searchCustomerName').val().toLowerCase();
        const now = new Date();

        $('tbody tr').each(function () {
            const rowStatus = $(this).find('.status').text().trim();
            const rowMethod = $(this).find('.method').text().trim();  // Adjust if method is in a different column
            const customerName = $(this).find('.customerName').text().toLowerCase();
            // const now = new Date();
            const orderDateString = $(this).find('.Date').text().trim();
            const orderDate = new Date(orderDateString); // Parse the date string
            let isVisible = true;
            const dateRanges = {
                'Last 5 days Orders': 5,
                'Last 7 days Orders': 7,
                'Last 15 days Orders': 15,
                'Last 30 days Orders': 30
            }

            if (selectedStatus && rowStatus !== selectedStatus) {
                isVisible = false;
            }

            if (selectedMethod && rowMethod !== selectedMethod) {
                isVisible = false;
            }

            if (searchText && !customerName.includes(searchText) ) {
                isVisible = false;
            }

            if (selectedDateRange) {
                const days = dateRanges[selectedDateRange];
                const pastDate = new Date(now);
                pastDate.setDate(now.getDate() - days);
                if (orderDate < pastDate) {
                    isVisible = false;
                }
            }
            if (startDate && orderDate < startDate) {
                isVisible = false;
            }

            if (endDate && orderDate > endDate) {
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


