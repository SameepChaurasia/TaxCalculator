
$(document).ready(function() {
    $('#taxForm').submit(function(e) {
        e.preventDefault();
        // Get form values
        var income = parseFloat($('#income').val());
        var extraIncome = parseFloat($('#extraIncome').val()) || 0;
        var deductions = parseFloat($('#deductions').val()) || 0;
        var age = $('#age').val();

        // Validate inputs
        if (isNaN(income) || income <= 0) {
            $('#incomeError').show();
            return;
        }
        if (isNaN(extraIncome) || extraIncome < 0) {
            $('#extraIncomeError').show();
            return;
        }
        if (isNaN(deductions) || deductions < 0) {
            $('#deductionsError').show();
            return;
        }
        if (!age) {
            $('#ageError').show();
            return;
        }

        // Calculate tax
        var taxableIncome = income + extraIncome - deductions;
        var tax = 0;
        if (taxableIncome > 800000) {
            if (age == '<40') {
                tax = 0.3 * (taxableIncome - 800000);
            } else if (age == '≥ 40 && ≤60') {
                tax = 0.4 * (taxableIncome - 800000);
            } else if (age == '≥ 60') {
                tax = 0.1 * (taxableIncome - 800000);
            }
        }

        // Open a new window with the tax result
        var resultWindow = window.open('', '_blank', 'width=600,height=400,scrollbars=yes');

        // Build the result content
        var resultContent = '<html><head><title>Tax Calculation Result</title></head><body style="background-color:powderblue;">';
        resultContent += '<div class="container mt-5">';
        resultContent += '<div class="card">';
        resultContent += '<div class="card-header bg-primary text-white">';
        resultContent += '<h2 class="mb-0">Tax Calculation Result</h2>';
        resultContent += '</div>';
        resultContent += '<div class="card-body">';
        resultContent += '<p id="taxResult">Tax to be paid: ₹ ' + tax.toFixed(2) + '</p>';
        resultContent += '</div>';
        resultContent += '</div>';
        resultContent += '</div>';
        resultContent += '</body></html>';

        // Write the result content to the new window
        resultWindow.document.write(resultContent);
    });
});
