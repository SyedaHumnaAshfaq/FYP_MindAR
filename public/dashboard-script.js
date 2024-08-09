$(document).ready(function () { 
    function initializeChart() {
        const salesData = $('#weekly-sales-data').data('sales');
        const weeklySalesData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Weekly Sales',
                data: salesData,
                borderColor: 'rgba(255, 165, 0, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0.1
            }]
        };
        const config = {
            type: 'line',
            data: weeklySalesData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        const ctx = document.getElementById('weeklySalesChart').getContext('2d');
        new Chart(ctx, config);

        const productDataElement = $('#best-selling-products-data');
    console.log('Product Data Element:', productDataElement);

    const productNamesRaw = productDataElement.attr('data-products');
    const productSalesRaw = productDataElement.attr('data-sales');
    
    console.log('Product Names Raw:', productNamesRaw);
    console.log('Product Sales Raw:', productSalesRaw);

    // Debugging: Check if the attributes are being read as strings
    console.log('Type of Product Names Raw:', typeof productNamesRaw);
    console.log('Type of Product Sales Raw:', typeof productSalesRaw);

    // Parse the data only if it's not empty
    let productNames = [];
    let productSalesData = [];
    
    try {
        if (productNamesRaw) {
            productNames = JSON.parse(productNamesRaw);
        }
        if (productSalesRaw) {
            productSalesData = JSON.parse(productSalesRaw);
        }
    } catch (e) {
        console.error('Error parsing JSON:', e);
    }

    console.log('Parsed Product Names:', productNames);
    console.log('Parsed Product Sales Data:', productSalesData);

            // Create the pie chart
            if (productNames.length && productSalesData.length) {
                const ctx = document.getElementById('bestSellingProductsChart').getContext('2d');
        
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: productNames,
                        datasets: [{
                            label: 'Best Selling Products',
                            data: productSalesData,
                            backgroundColor: [
                                'rgba(255, 159, 64, 1)', // Dark Orange
                                'rgba(255, 99, 132, 1)', // Red
                                'rgba(54, 162, 235, 1)', // Blue
                                'rgba(75, 192, 192, 1)', // Green
                                'rgba(153, 102, 255, 1)', // Purple
                                'rgba(255, 206, 86, 1)'  // Yellow
                            ],
                            borderColor: [
                          
                                'rgba(255,255,255,1)'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false, 
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return tooltipItem.label + ': ' + tooltipItem.raw;
                                    }
                                }
                            }
                        }
                        
                    },
                    layout: {
                        padding: {
                            top: 20,
                            bottom: 20,
                            left: 20,
                            right: 20
                        }
                    }
                });
                    
                
            } else {
                console.log('No data available for chart');
            }
    }
    initializeChart();
    
    
});