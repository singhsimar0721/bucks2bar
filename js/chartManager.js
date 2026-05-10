/**
 * CHART MANAGER
 * Handles Chart.js initialization and updates
 */

const ChartManager = (() => {
    let chart = null;

    /**
     * Initialize the chart
     */
    const initChart = () => {
        const ctx = document.getElementById('incomeExpenseChart');
        if (!ctx) {
            console.error('Chart canvas not found');
            return null;
        }

        const chartData = DataManager.getChartData();

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: 'Income',
                        data: chartData.income,
                        backgroundColor: 'rgba(102, 126, 234, 0.8)',
                        borderColor: 'rgba(102, 126, 234, 1)',
                        borderWidth: 2,
                        borderRadius: 6,
                        borderSkipped: false,
                        tension: 0.3,
                        barPercentage: 0.8,
                        categoryPercentage: 0.85
                    },
                    {
                        label: 'Expenses',
                        data: chartData.expenses,
                        backgroundColor: 'rgba(245, 87, 108, 0.8)',
                        borderColor: 'rgba(245, 87, 108, 1)',
                        borderWidth: 2,
                        borderRadius: 6,
                        borderSkipped: false,
                        tension: 0.3,
                        barPercentage: 0.8,
                        categoryPercentage: 0.85
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                size: 14,
                                weight: 'bold',
                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                            },
                            color: '#2d3748',
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12,
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(102, 126, 234, 0.5)',
                        borderWidth: 1,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += DataManager.formatCurrency(context.parsed.y);
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false,
                            drawBorder: true
                        },
                        ticks: {
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            color: '#6b7280',
                            padding: 8
                        }
                    },
                    y: {
                        display: true,
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: true
                        },
                        ticks: {
                            font: {
                                size: 12,
                                color: '#6b7280'
                            },
                            color: '#6b7280',
                            padding: 8,
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        },
                        title: {
                            display: true,
                            text: 'Amount (USD)',
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            color: '#2d3748'
                        }
                    }
                },
                animation: {
                    duration: 750,
                    easing: 'easeInOutQuart'
                }
            }
        });

        return chart;
    };

    /**
     * Update chart with new data
     */
    const updateChart = () => {
        if (!chart) {
            console.warn('Chart not initialized');
            return;
        }

        const chartData = DataManager.getChartData();

        // Update datasets
        chart.data.datasets[0].data = chartData.income;
        chart.data.datasets[1].data = chartData.expenses;

        // Animate update
        chart.update('active');
    };

    /**
     * Destroy chart (cleanup)
     */
    const destroyChart = () => {
        if (chart) {
            chart.destroy();
            chart = null;
        }
    };

    /**
     * Get current chart instance
     */
    const getChart = () => {
        return chart;
    };

    // Public API
    return {
        initChart,
        updateChart,
        destroyChart,
        getChart
    };
})();
