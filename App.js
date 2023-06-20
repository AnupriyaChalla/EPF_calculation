import React, { useState } from 'react';
import './App.css';

const SalaryCalculator = () => {
  const [salary, setSalary] = useState('');
  const [pfPercentage, setPfPercentage] = useState('');
  const [esiPercentage, setEsiPercentage] = useState('');
  const [totalSalary, setTotalSalary] = useState('');
  const [totalDeductions, setTotalDeductions] = useState('');
  const [totalDeductionsPerYear, setTotalDeductionsPerYear] = useState('');
  const [totalAmount, setTotalAmount] = useState(''); // Added state for total amount after a year

  const calculateTotalSalary = () => {
    const pfAmount = (salary * pfPercentage) / 100;
    const esiAmount = (salary * esiPercentage) / 100;
    const deductedSalary = (salary - pfAmount - esiAmount).toFixed(2);
    setTotalSalary(deductedSalary);

    const daysInMonth = new Date().getDate();
    const deductionsPerMonth =
      daysInMonth === 31
        ? (pfAmount + esiAmount).toFixed(2)
        : ((pfAmount + esiAmount) * (30 / 31)).toFixed(2);
    setTotalDeductions(deductionsPerMonth);

    const deductionsPerYear = (pfAmount + esiAmount) * 12;
    setTotalDeductionsPerYear(deductionsPerYear.toFixed(2));

    const interest = 0.08; // 8% interest
    const totalAmountAfterYear = deductionsPerYear * (1 + interest);
    setTotalAmount(totalAmountAfterYear.toFixed(2));
  };

  return (
    <center>
      <div className="salary-calculator-container">
        <h2>SALARY CALCULATION</h2>
        <div className="form-group">
          <label>
            Enter Salary:
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            PF Percentage:
            <input
              type="number"
              value={pfPercentage}
              onChange={(e) => setPfPercentage(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            ESI Percentage:
            <input
              type="number"
              value={esiPercentage}
              onChange={(e) => setEsiPercentage(e.target.value)}
            />
          </label>
        </div>
        <button onClick={calculateTotalSalary}>Calculate</button>
        <div className="result">
          <label>
            Total Salary after deductions: <strong>{totalSalary}</strong>
          </label>
          <br />
          <label>
            Total Deductions per Month: <strong>{totalDeductions}</strong>
          </label>
          <br />
          <label>
            Total Deductions per Year: <strong>{totalDeductionsPerYear}</strong>
          </label>
          <br />
          <label>
          Total Amount after a Year: <strong>{totalAmount}</strong>
          </label>
        </div>
      </div>
    </center>
  );
};

export default SalaryCalculator;
