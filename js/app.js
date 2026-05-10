/**
 * APP - Main Application Logic
 * Handles UI, events, real-time updates, and tab switching
 */

const App = (() => {
    let updateDebounceTimer = null;
    const DEBOUNCE_DELAY = 300; // milliseconds

    /**
     * Build the monthly input rows in the Data tab
     */
    const buildMonthlyTable = () => {
        const tableBody = document.getElementById('monthsTableBody');
        const data = DataManager.loadData();
        const months = DataManager.getMonths();

        tableBody.innerHTML = ''; // Clear existing

        months.forEach((month, index) => {
            const monthData = data[month];
            const row = document.createElement('tr');

            row.innerHTML = `
                <td class="fw-bold text-gradient">${month}</td>
                <td>
                    <div class="currency-input-wrapper">
                        <span class="currency-symbol">$</span>
                        <input 
                            type="number" 
                            class="form-control currency-input income-input" 
                            data-month="${month}"
                            value="${monthData.income || ''}"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            max="999999.99"
                        >
                    </div>
                </td>
                <td>
                    <div class="currency-input-wrapper">
                        <span class="currency-symbol">$</span>
                        <input 
                            type="number" 
                            class="form-control currency-input expense-input" 
                            data-month="${month}"
                            value="${monthData.expenses || ''}"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            max="999999.99"
                        >
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });

        // Attach event listeners to input fields
        attachInputListeners();
    };

    /**
     * Attach event listeners to income/expense inputs for real-time updates
     */
    const attachInputListeners = () => {
        const inputs = document.querySelectorAll('.currency-input');

        inputs.forEach(input => {
            input.addEventListener('input', handleInputChange);
            input.addEventListener('blur', handleInputBlur);
        });
    };

    /**
     * Handle input changes with debouncing for real-time chart updates
     */
    const handleInputChange = (event) => {
        clearTimeout(updateDebounceTimer);

        updateDebounceTimer = setTimeout(() => {
            updateDataFromForm();
            ChartManager.updateChart();
            showFeedbackMessage('💾 Auto-saving...', 'info', 2000);
        }, DEBOUNCE_DELAY);
    };

    /**
     * Handle blur event - save immediately when user leaves field
     */
    const handleInputBlur = () => {
        clearTimeout(updateDebounceTimer);
        updateDataFromForm();
        ChartManager.updateChart();
    };

    /**
     * Read current form values and update DataManager
     */
    const updateDataFromForm = () => {
        const months = DataManager.getMonths();

        months.forEach(month => {
            const incomeInput = document.querySelector(`.income-input[data-month="${month}"]`);
            const expenseInput = document.querySelector(`.expense-input[data-month="${month}"]`);

            if (incomeInput && expenseInput) {
                const income = incomeInput.value || 0;
                const expenses = expenseInput.value || 0;

                DataManager.updateMonthData(month, income, expenses);
            }
        });
    };

    /**
     * Populate form fields from DataManager
     */
    const loadFormData = () => {
        const data = DataManager.loadData();
        const months = DataManager.getMonths();

        months.forEach(month => {
            const incomeInput = document.querySelector(`.income-input[data-month="${month}"]`);
            const expenseInput = document.querySelector(`.expense-input[data-month="${month}"]`);

            if (incomeInput && expenseInput) {
                incomeInput.value = data[month].income || '';
                expenseInput.value = data[month].expenses || '';
            }
        });
    };

    /**
     * Show feedback message to user
     */
    const showFeedbackMessage = (message, type = 'success', duration = 3000) => {
        const feedbackDiv = document.getElementById('feedbackMessage');

        feedbackDiv.className = `alert alert-${type}`;
        feedbackDiv.textContent = message;
        feedbackDiv.style.display = 'block';

        if (duration > 0) {
            setTimeout(() => {
                feedbackDiv.style.display = 'none';
            }, duration);
        }
    };

    /**
     * Handle Save button click
     */
    const handleSave = () => {
        updateDataFromForm();
        const result = DataManager.saveData(DataManager.loadData());
        showFeedbackMessage(result.message, result.success ? 'success' : 'danger');
        ChartManager.updateChart();
    };

    /**
     * Handle Clear All button click
     */
    const handleClear = () => {
        if (confirm('⚠️ Are you sure you want to clear all data? This cannot be undone!')) {
            DataManager.clearData();
            buildMonthlyTable();
            ChartManager.updateChart();
            showFeedbackMessage('✅ All data cleared!', 'success');
        }
    };

    /**
     * Initialize the application
     */
    const init = () => {
        console.log('🚀 Initializing Bucks2Bar...');

        // Build UI
        buildMonthlyTable();
        loadFormData();

        // Initialize Chart
        ChartManager.initChart();

        // Attach button event listeners
        const saveBtn = document.getElementById('saveBtn');
        const clearBtn = document.getElementById('clearBtn');
        const downloadChartBtn = document.getElementById('downloadChartBtn');

        if (saveBtn) {
            saveBtn.addEventListener('click', handleSave);
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', handleClear);
        }

        if (downloadChartBtn) {
            downloadChartBtn.addEventListener('click', () => {
                ChartManager.downloadChart();
                showFeedbackMessage('📊 Chart downloaded successfully!', 'success', 2000);
            });
        }

        // Handle tab switching
        const chartTab = document.getElementById('chart-tab');
        if (chartTab) {
            chartTab.addEventListener('shown.bs.tab', () => {
                // Trigger chart resize when tab becomes visible
                setTimeout(() => {
                    const chart = ChartManager.getChart();
                    if (chart) {
                        chart.resize();
                    }
                }, 100);
            });
        }

        console.log('✅ Bucks2Bar initialized successfully!');
    };

    /**
     * Reset application (useful for testing)
     */
    const reset = () => {
        clearTimeout(updateDebounceTimer);
        ChartManager.destroyChart();
        buildMonthlyTable();
        ChartManager.initChart();
    };

    // Public API
    return {
        init,
        reset,
        updateDataFromForm,
        loadFormData,
        showFeedbackMessage
    };
})();

/**
 * Initialize app when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

/**
 * Handle window resize for responsive chart
 */
window.addEventListener('resize', () => {
    const chart = ChartManager.getChart();
    if (chart) {
        chart.resize();
    }
});
