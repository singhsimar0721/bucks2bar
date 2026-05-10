/**
 * DATA MANAGER
 * Handles all data operations: storage, retrieval, validation, and formatting
 */

const DataManager = (() => {
    const STORAGE_KEY = 'bucks2bar_data';
    
    // Month names (abbreviated)
    const MONTHS = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    /**
     * Generate random number between min and max
     */
    const getRandomAmount = (min = 1500, max = 4000) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * Initialize default data structure with random values
     */
    const getDefaultData = () => {
        const data = {};
        MONTHS.forEach(month => {
            data[month] = {
                income: getRandomAmount(1500, 4000),
                expenses: getRandomAmount(1500, 4000)
            };
        });
        return data;
    };

    /**
     * Load data from LocalStorage, or return default if not found
     */
    const loadData = () => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                return JSON.parse(storedData);
            }
        } catch (error) {
            console.error('Error loading data from LocalStorage:', error);
        }
        return getDefaultData();
    };

    /**
     * Save data to LocalStorage
     */
    const saveData = (data) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return { success: true, message: '✅ Data saved successfully!' };
        } catch (error) {
            console.error('Error saving data to LocalStorage:', error);
            return { success: false, message: '❌ Error saving data. Please try again.' };
        }
    };

    /**
     * Clear all data from LocalStorage
     */
    const clearData = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { success: true, message: '✅ All data cleared!' };
        } catch (error) {
            console.error('Error clearing data:', error);
            return { success: false, message: '❌ Error clearing data.' };
        }
    };

    /**
     * Validate and parse numeric input
     */
    const parseAmount = (value) => {
        const parsed = parseFloat(value);
        if (isNaN(parsed) || parsed < 0) {
            return 0;
        }
        return Math.round(parsed * 100) / 100; // Round to 2 decimals
    };

    /**
     * Format value as USD currency string
     */
    const formatCurrency = (value) => {
        const number = parseAmount(value);
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    };

    /**
     * Get all months
     */
    const getMonths = () => {
        return [...MONTHS];
    };

    /**
     * Update a single month's data
     */
    const updateMonthData = (month, income, expenses) => {
        const data = loadData();
        if (data[month]) {
            data[month].income = parseAmount(income);
            data[month].expenses = parseAmount(expenses);
            saveData(data);
            return data;
        }
        return data;
    };

    /**
     * Get data formatted for Chart.js
     */
    const getChartData = () => {
        const data = loadData();
        const incomeValues = [];
        const expenseValues = [];

        MONTHS.forEach(month => {
            incomeValues.push(data[month].income);
            expenseValues.push(data[month].expenses);
        });

        return {
            labels: MONTHS,
            income: incomeValues,
            expenses: expenseValues
        };
    };

    /**
     * Get total income and expenses
     */
    const getTotals = () => {
        const data = loadData();
        let totalIncome = 0;
        let totalExpenses = 0;

        MONTHS.forEach(month => {
            totalIncome += data[month].income;
            totalExpenses += data[month].expenses;
        });

        return {
            income: totalIncome,
            expenses: totalExpenses,
            netProfit: totalIncome - totalExpenses
        };
    };

    // Public API
    return {
        loadData,
        saveData,
        clearData,
        parseAmount,
        formatCurrency,
        getMonths,
        updateMonthData,
        getChartData,
        getTotals,
        getDefaultData,
        STORAGE_KEY
    };
})();
