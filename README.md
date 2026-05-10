# 💰 Bucks2Bar - Income & Expense Tracker

A lightweight, responsive static HTML application for tracking monthly income and expenses with real-time visualization. No backend required, all data stored locally in your browser using LocalStorage.

## ✨ Features

- **📊 Data Tab**: Input income and expenses for all 12 months (Jan-Dec)
- **📈 Chart Tab**: Real-time bar chart visualization comparing income vs. expenses
- **💾 LocalStorage**: All data persists automatically and survives browser refresh
- **🎨 Vibrant UI**: Modern, colorful design with smooth animations
- **📱 Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **⚡ Real-Time Updates**: Chart updates instantly as you type (debounced for performance)
- **💵 USD Currency**: All values formatted as USD with $ symbol and 2 decimal places
- **🔄 Data Management**: Clear all data with confirmation, save data manually

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Bootstrap 5 + custom vibrant styles
- **JavaScript (Vanilla)** — No dependencies, no build step
- **Chart.js** — Lightweight bar charting library
- **LocalStorage API** — Client-side data persistence

## 📂 Project Structure

```
bucks2bar/
├── index.html              # Main HTML file with tab structure
├── css/
│   └── style.css          # Custom vibrant color scheme and animations
├── js/
│   ├── dataManager.js     # LocalStorage handling and data validation
│   ├── chartManager.js    # Chart.js initialization and updates
│   └── app.js             # Main app logic and event handlers
└── README.md              # This file
```

## 🚀 Getting Started

### Installation

1. **Download or Clone**
   ```bash
   git clone https://github.com/yourusername/bucks2bar.git
   cd bucks2bar
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - No server or build process required!

### Usage

#### Data Tab
1. Enter your **Income** for each month (Jan-Dec)
2. Enter your **Expenses** for each month
3. Values update the chart in real-time as you type
4. Click **Save Data** to ensure data is persisted to LocalStorage
5. Click **Clear All** to reset everything (with confirmation)

#### Chart Tab
1. Click the **Chart** tab to view your data visualization
2. See a side-by-side comparison of income (blue) vs. expenses (red)
3. Hover over bars to see exact values in USD
4. Chart updates automatically as you modify data in the Data tab

#### Data Persistence
- Your data is automatically saved to your browser's LocalStorage
- Data persists even after closing the browser
- Clear browser data/cookies to reset (or use the **Clear All** button)

## 🎨 Design Highlights

- **Color Scheme**: Vibrant gradients (purple-to-pink primary, red accent)
- **Animations**: Smooth tab transitions, button hover effects, chart animations
- **Typography**: Modern, clean fonts with proper hierarchy
- **Spacing**: Generous padding and margins for mobile-first responsive design
- **Accessibility**: Semantic HTML, proper contrast, keyboard navigation

## 📊 Chart Details

- **X-Axis**: Month labels (Jan-Dec)
- **Y-Axis**: USD values (automatically scaled)
- **Datasets**: 
  - Income (Blue - `#667eea`)
  - Expenses (Red - `#f5576c`)
- **Interactions**: Hover tooltips show exact values
- **Responsive**: Chart resizes based on screen size

## 💾 Data Storage

All data is stored in your browser's **LocalStorage** under the key: `bucks2bar_data`

### LocalStorage Structure
```json
{
  "Jan": { "income": 5000, "expenses": 2000 },
  "Feb": { "income": 5500, "expenses": 2200 },
  ...
  "Dec": { "income": 6000, "expenses": 2500 }
}
```

To view stored data:
1. Open browser DevTools (F12 or Cmd+Option+I)
2. Go to **Application** > **LocalStorage**
3. Look for `bucks2bar_data` entry

## 🔧 Customization

### Change Currency
Edit `dataManager.js` - modify the `formatCurrency()` function:
```javascript
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', // Change to 'EUR', 'GBP', etc.
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
};
```

### Change Colors
Edit `css/style.css` - modify the `:root` CSS variables:
```css
:root {
    --accent-color-1: #667eea;  /* Primary blue */
    --accent-color-4: #f5576c;  /* Accent red */
    /* ... other colors */
}
```

### Adjust Debounce Delay
Edit `js/app.js` - change `DEBOUNCE_DELAY`:
```javascript
const DEBOUNCE_DELAY = 300; // milliseconds (lower = faster updates)
```

## 🐛 Troubleshooting

### Chart Not Showing?
- Check browser console (F12) for errors
- Ensure Chart.js CDN is loading (check Network tab)
- Try clearing LocalStorage and refreshing

### Data Not Saving?
- Check if LocalStorage is enabled in your browser
- Verify browser hasn't disabled storage for this domain
- Try using Incognito/Private mode

### Mobile Layout Issues?
- Ensure viewport meta tag is present in `index.html`
- Test on actual mobile device or use DevTools device emulation

## 📱 Browser Compatibility

| Browser | Status |
|---------|--------|
| Chrome | ✅ Full Support |
| Firefox | ✅ Full Support |
| Safari | ✅ Full Support |
| Edge | ✅ Full Support |
| IE 11 | ❌ Not Supported |

## 🎯 Features Roadmap

- [ ] Export data to CSV
- [ ] Import data from CSV
- [ ] Multi-currency support
- [ ] Monthly summary statistics
- [ ] Budget goal tracking
- [ ] Print-friendly report
- [ ] Dark mode toggle
- [ ] Recurring transactions

## 📄 License

This project is open source and available for personal and commercial use.

## 💡 Tips & Tricks

- **Keyboard Navigation**: Tab through fields, Enter to move to next row
- **Quick Entry**: Copy-paste values from spreadsheets
- **Mobile**: Landscape mode provides more space for the chart
- **Backup**: Export LocalStorage data periodically to JSON
- **Testing**: Use DevTools to manually edit LocalStorage values

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📧 Support

For issues or suggestions, please create an issue on GitHub.

---

**Built with ❤️ for personal finance tracking**

Last Updated: May 10, 2026
