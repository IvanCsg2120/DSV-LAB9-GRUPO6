// Funciones utilitarias comunes
const Utils = {
    // Validar número en rango
    validateNumber: (value, min, max) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= min && num <= max;
    },

    // Mostrar/ocultar elemento
    toggleElement: (element, show) => {
        if (show) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    },

    // Formatear número a decimal
    formatDecimal: (number, decimals = 2) => {
        return parseFloat(number).toFixed(decimals);
    },

    // Mostrar mensaje de error
    showError: (element, message) => {
        element.textContent = message;
        element.classList.add('show');
    },

    // Limpiar mensaje de error
    clearError: (element) => {
        element.textContent = '';
        element.classList.remove('show');
    }
};

// Problema 1: Promedio de calificaciones con escala en letras
class GradeCalculator {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const calculateBtn = document.getElementById('calculateAverage');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateAverage());
        }

        const clearBtn = document.getElementById('clearAverage');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearForm());
        }
    }

    calculateAverage() {
        const grade1 = parseFloat(document.getElementById('grade1').value);
        const grade2 = parseFloat(document.getElementById('grade2').value);
        const grade3 = parseFloat(document.getElementById('grade3').value);
        
        const error1 = document.getElementById('error1');
        const error2 = document.getElementById('error2');
        const error3 = document.getElementById('error3');
        const result = document.getElementById('averageResult');
        const averageText = document.getElementById('averageText');
        const letterGrade = document.getElementById('letterGrade');

        // Validar entradas
        let isValid = true;

        if (!Utils.validateNumber(grade1, 0, 100)) {
            Utils.showError(error1, 'Ingrese una calificación válida (0-100)');
            isValid = false;
        } else {
            Utils.clearError(error1);
        }

        if (!Utils.validateNumber(grade2, 0, 100)) {
            Utils.showError(error2, 'Ingrese una calificación válida (0-100)');
            isValid = false;
        } else {
            Utils.clearError(error2);
        }

        if (!Utils.validateNumber(grade3, 0, 100)) {
            Utils.showError(error3, 'Ingrese una calificación válida (0-100)');
            isValid = false;
        } else {
            Utils.clearError(error3);
        }

        if (!isValid) {
            Utils.toggleElement(result, false);
            return;
        }

        // Calcular promedio
        const average = (grade1 + grade2 + grade3) / 3;
        
        // Determinar calificación en letras
        const letter = this.getLetterGrade(average);
        
        // Mostrar resultado
        averageText.textContent = `El promedio de las calificaciones es: ${Utils.formatDecimal(average)}`;
        letterGrade.textContent = `Calificación en letra: ${letter}`;
        letterGrade.className = this.getGradeClass(letter);
        
        Utils.toggleElement(result, true);
    }

    getLetterGrade(average) {
        if (average >= 90) return 'A';
        if (average >= 80) return 'B';
        if (average >= 70) return 'C';
        if (average >= 60) return 'D';
        return 'F';
    }

    getGradeClass(letter) {
        const classes = {
            'A': 'success',
            'B': 'success',
            'C': 'warning',
            'D': 'warning',
            'F': 'error'
        };
        return classes[letter] || '';
    }

    clearForm() {
        document.getElementById('grade1').value = '';
        document.getElementById('grade2').value = '';
        document.getElementById('grade3').value = '';
        
        Utils.clearError(document.getElementById('error1'));
        Utils.clearError(document.getElementById('error2'));
        Utils.clearError(document.getElementById('error3'));
        Utils.toggleElement(document.getElementById('averageResult'), false);
    }
}

// Problema 2: Identificación del día de la semana
class DayIdentifier {
    constructor() {
        this.days = [
            'lunes', 'martes', 'miércoles', 'jueves', 
            'viernes', 'sábado', 'domingo'
        ];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const findBtn = document.getElementById('findDay');
        if (findBtn) {
            findBtn.addEventListener('click', () => this.identifyDay());
        }

        const clearBtn = document.getElementById('clearDay');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearForm());
        }
    }

    identifyDay() {
        const dayNumber = parseInt(document.getElementById('dayNumber').value);
        const errorDay = document.getElementById('errorDay');
        const result = document.getElementById('dayResult');
        const dayText = document.getElementById('dayText');

        // Validar entrada
        if (!Utils.validateNumber(dayNumber, 1, 7)) {
            Utils.showError(errorDay, 'Ingrese un número válido (1-7)');
            Utils.toggleElement(result, false);
            return;
        }

        Utils.clearError(errorDay);

        // Obtener día de la semana
        const dayName = this.days[dayNumber - 1];
        
        // Mostrar resultado
        dayText.textContent = `El día correspondiente al número ${dayNumber} es ${dayName}.`;
        dayText.className = 'success';
        
        Utils.toggleElement(result, true);
    }

    clearForm() {
        document.getElementById('dayNumber').value = '';
        Utils.clearError(document.getElementById('errorDay'));
        Utils.toggleElement(document.getElementById('dayResult'), false);
    }
}

// Problema 3: Total de compra en supermercado
class ShoppingCart {
    constructor() {
        this.productCount = 0;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const setupBtn = document.getElementById('setupProducts');
        if (setupBtn) {
            setupBtn.addEventListener('click', () => this.setupProducts());
        }

        const calculateBtn = document.getElementById('calculateTotal');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateTotal());
        }

        const clearBtn = document.getElementById('clearCart');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearForm());
        }
    }

    setupProducts() {
        const productCount = parseInt(document.getElementById('productCount').value);
        const errorCount = document.getElementById('errorCount');
        const productInputs = document.getElementById('productInputs');
        const calculateBtn = document.getElementById('calculateTotal');

        // Validar entrada
        if (!Utils.validateNumber(productCount, 1, 50)) {
            Utils.showError(errorCount, 'Ingrese una cantidad válida (1-50)');
            return;
        }

        Utils.clearError(errorCount);
        this.productCount = productCount;

        // Generar campos de entrada para precios
        productInputs.innerHTML = '';
        
        for (let i = 1; i <= productCount; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            
            const label = document.createElement('label');
            label.textContent = `Precio del producto ${i}:`;
            label.htmlFor = `productPrice${i}`;
            
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '0';
            input.step = '0.01';
            input.placeholder = `Ingrese precio del producto ${i}`;
            input.id = `productPrice${i}`;
            input.className = 'product-price';
            
            inputGroup.appendChild(label);
            inputGroup.appendChild(input);
            productInputs.appendChild(inputGroup);
        }
        
        // Mostrar botón de calcular total
        calculateBtn.style.display = 'block';
        Utils.toggleElement(document.getElementById('totalResult'), false);
    }

    calculateTotal() {
        const priceInputs = document.querySelectorAll('.product-price');
        let total = 0;
        let isValid = true;
        
        // Validar y sumar precios
        priceInputs.forEach((input, index) => {
            const price = parseFloat(input.value);
            
            if (isNaN(price) || price < 0) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
                total += price;
            }
        });
        
        if (!isValid) {
            alert('Por favor, ingrese precios válidos para todos los productos.');
            return;
        }
        
        // Mostrar resultado
        const totalText = document.getElementById('totalText');
        totalText.textContent = `El total a pagar es: $${Utils.formatDecimal(total)}`;
        totalText.className = 'success';
        
        Utils.toggleElement(document.getElementById('totalResult'), true);
    }

    clearForm() {
        document.getElementById('productCount').value = '';
        document.getElementById('productInputs').innerHTML = '';
        document.getElementById('calculateTotal').style.display = 'none';
        Utils.clearError(document.getElementById('errorCount'));
        Utils.toggleElement(document.getElementById('totalResult'), false);
    }
}

// Problema 4: Promedio de notas para N estudiantes
class StudentGrades {
    constructor() {
        this.studentCount = 0;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const setupBtn = document.getElementById('setupStudents');
        if (setupBtn) {
            setupBtn.addEventListener('click', () => this.setupStudents());
        }

        const calculateBtn = document.getElementById('calculateAverages');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateAverages());
        }

        const clearBtn = document.getElementById('clearStudents');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearForm());
        }
    }

    setupStudents() {
        const studentCount = parseInt(document.getElementById('studentCount').value);
        const errorStudentCount = document.getElementById('errorStudentCount');
        const studentInputs = document.getElementById('studentInputs');
        const calculateBtn = document.getElementById('calculateAverages');

        // Validar entrada
        if (!Utils.validateNumber(studentCount, 1, 20)) {
            Utils.showError(errorStudentCount, 'Ingrese una cantidad válida (1-20)');
            return;
        }

        Utils.clearError(errorStudentCount);
        this.studentCount = studentCount;

        // Generar campos de entrada para estudiantes
        studentInputs.innerHTML = '';
        
        for (let i = 1; i <= studentCount; i++) {
            const studentSection = document.createElement('div');
            studentSection.className = 'student-section';
            studentSection.innerHTML = `
                <h4>Estudiante ${i}</h4>
                <div class="input-group">
                    <label for="student${i}Note1">Nota 1:</label>
                    <input type="number" id="student${i}Note1" min="0" max="100" placeholder="Ingrese nota 1">
                    <div class="error" id="errorStudent${i}Note1"></div>
                </div>
                <div class="input-group">
                    <label for="student${i}Note2">Nota 2:</label>
                    <input type="number" id="student${i}Note2" min="0" max="100" placeholder="Ingrese nota 2">
                    <div class="error" id="errorStudent${i}Note2"></div>
                </div>
            `;
            
            studentInputs.appendChild(studentSection);
        }
        
        // Mostrar botón de calcular promedios
        calculateBtn.style.display = 'block';
        Utils.toggleElement(document.getElementById('averagesResult'), false);
    }

    calculateAverages() {
        const averagesText = document.getElementById('averagesText');
        averagesText.innerHTML = '';
        
        let allValid = true;
        
        // Calcular promedios para cada estudiante
        for (let i = 1; i <= this.studentCount; i++) {
            const note1 = parseFloat(document.getElementById(`student${i}Note1`).value);
            const note2 = parseFloat(document.getElementById(`student${i}Note2`).value);
            const error1 = document.getElementById(`errorStudent${i}Note1`);
            const error2 = document.getElementById(`errorStudent${i}Note2`);
            
            // Validar notas
            let studentValid = true;
            
            if (!Utils.validateNumber(note1, 0, 100)) {
                Utils.showError(error1, 'Ingrese una nota válida (0-100)');
                studentValid = false;
                allValid = false;
            } else {
                Utils.clearError(error1);
            }
            
            if (!Utils.validateNumber(note2, 0, 100)) {
                Utils.showError(error2, 'Ingrese una nota válida (0-100)');
                studentValid = false;
                allValid = false;
            } else {
                Utils.clearError(error2);
            }
            
            if (studentValid) {
                // Calcular promedio
                const average = (note1 + note2) / 2;
                
                // Agregar resultado
                const studentResult = document.createElement('div');
                studentResult.className = 'student-result';
                studentResult.innerHTML = `
                    <h4>Estudiante ${i}</h4>
                    <p>Nota 1: ${note1} | Nota 2: ${note2}</p>
                    <p class="success"><strong>Promedio: ${Utils.formatDecimal(average)}</strong></p>
                `;
                
                averagesText.appendChild(studentResult);
            }
        }
        
        if (!allValid) {
            alert('Por favor, ingrese notas válidas (0-100) para todos los estudiantes.');
            return;
        }
        
        // Mostrar resultados
        Utils.toggleElement(document.getElementById('averagesResult'), true);
    }

    clearForm() {
        document.getElementById('studentCount').value = '';
        document.getElementById('studentInputs').innerHTML = '';
        document.getElementById('calculateAverages').style.display = 'none';
        Utils.clearError(document.getElementById('errorStudentCount'));
        Utils.toggleElement(document.getElementById('averagesResult'), false);
    }
}

// Inicializar las clases cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Detectar qué página estamos cargando y inicializar la clase correspondiente
    const path = window.location.pathname;
    
    if (path.includes('problema1.html') || path.endsWith('/')) {
        new GradeCalculator();
    } else if (path.includes('problema2.html')) {
        new DayIdentifier();
    } else if (path.includes('problema3.html')) {
        new ShoppingCart();
    } else if (path.includes('problema4.html')) {
        new StudentGrades();
    }
});