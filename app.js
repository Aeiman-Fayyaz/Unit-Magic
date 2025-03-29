        // Conversion factors relative to 1 meter
        const conversionFactors = {
            millimeters: 0.001,
            centimeters: 0.01,
            meters: 1,
            kilometers: 1000,
            inches: 0.0254,
            feet: 0.3048,
            yards: 0.9144,
            miles: 1609.344,
            'nautical-miles': 1852
        };
        
        // Unit labels for display
        const unitLabels = {
            millimeters: "mm",
            centimeters: "cm",
            meters: "m",
            kilometers: "km",
            inches: "in",
            feet: "ft",
            yards: "yd",
            miles: "mi",
            'nautical-miles': "nmi"
        };
        
        // Full unit names for display
        const unitNames = {
            millimeters: "millimeters",
            centimeters: "centimeters",
            meters: "meters",
            kilometers: "kilometers",
            inches: "inches",
            feet: "feet",
            yards: "yards",
            miles: "miles",
            'nautical-miles': "nautical miles"
        };
        
        // DOM elements
        const fromValueInput = document.getElementById('fromValue');
        const toValueInput = document.getElementById('toValue');
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        const convertBtn = document.getElementById('convertBtn');
        const resetBtn = document.getElementById('resetBtn');
        const swapBtn = document.getElementById('swapUnits');
        const resultContainer = document.getElementById('resultContainer');
        const resultValue = document.getElementById('resultValue');
        const resultFormula = document.getElementById('resultFormula');
        const darkModeToggle = document.getElementById('darkModeToggle');
        
        // Convert function
        function convert() {
            const value = parseFloat(fromValueInput.value);
            const fromUnit = fromUnitSelect.value;
            const toUnit = toUnitSelect.value;
            
            if (isNaN(value)) {
                alert("Please enter a valid number");
                return;
            }
            
            // Convert to meters first
            const valueInMeters = value * conversionFactors[fromUnit];
            // Then convert to target unit
            const result = valueInMeters / conversionFactors[toUnit];
            
            // Update result fields
            toValueInput.value = result.toFixed(6);
            resultValue.textContent = `${result.toFixed(6)} ${unitLabels[toUnit]}`;
            resultFormula.textContent = `${value} ${unitLabels[fromUnit]} = ${value * conversionFactors[fromUnit]} m = ${result.toFixed(6)} ${unitLabels[toUnit]}`;
            resultContainer.style.display = 'block';
            
            // Smooth scroll to result
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Reset function
        function resetForm() {
            fromValueInput.value = '';
            toValueInput.value = '';
            resultContainer.style.display = 'none';
            fromValueInput.focus();
        }
        
        // Swap units function
        function swapUnits() {
            const tempUnit = fromUnitSelect.value;
            fromUnitSelect.value = toUnitSelect.value;
            toUnitSelect.value = tempUnit;
            
            // If there's a value, convert immediately after swap
            if (fromValueInput.value) {
                convert();
            }
        }
        
        // Dark mode toggle
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
        
        // Event listeners
        convertBtn.addEventListener('click', convert);
        resetBtn.addEventListener('click', resetForm);
        swapBtn.addEventListener('click', swapUnits);
        darkModeToggle.addEventListener('click', toggleDarkMode);
        
        // Allow conversion on Enter key
        fromValueInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                convert();
            }
        });
        
        // Initialize with focus on input
        fromValueInput.focus();