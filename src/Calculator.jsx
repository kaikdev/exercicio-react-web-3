import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import './Calculator.css';

function Calculator() {
    const [currentOperand, setCurrentOperand] = useState('');
    const [previousOperand, setPreviousOperand] = useState('');
    const [operation, setOperation] = useState(null);

    const appendNumber = (number) => {
        if (number === '.' && currentOperand.includes('.')) return;
        setCurrentOperand(prev => prev + number.toString());
    };

    const chooseOperation = (op) => {
        if (currentOperand === '' && previousOperand === '') return;

        if (currentOperand !== '' && previousOperand !== '') {
            compute();
        }

        setOperation(op);

        if (currentOperand !== '') {
            setPreviousOperand(currentOperand);
            setCurrentOperand('');
        }
    };

    const compute = () => {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert("Não é possível dividir por zero!");
                    clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        setCurrentOperand(computation.toString());
        setOperation(null);
        setPreviousOperand('');
    };

    const clear = () => {
        setCurrentOperand('');
        setPreviousOperand('');
        setOperation(null);
    };

    const deleteDigit = () => {
        setCurrentOperand(prev => prev.slice(0, -1));
    }

    const getDisplayValue = () => {
        if (currentOperand !== '') {
            return currentOperand;
        }
        if (previousOperand !== '') {
            return `${previousOperand}${operation ? ` ${operation}` : ''}`;
        }
        return '0';
    };

    return (
        <div className="calculator-grid">
            <Display value={getDisplayValue()} />
            <Button label="AC" onClick={clear} className="span-two" />
            <Button label="DEL" onClick={deleteDigit} />
            <Button label="÷" onClick={chooseOperation} className="operator" />
            <Button label="1" onClick={appendNumber} />
            <Button label="2" onClick={appendNumber} />
            <Button label="3" onClick={appendNumber} />
            <Button label="*" onClick={chooseOperation} className="operator" />
            <Button label="4" onClick={appendNumber} />
            <Button label="5" onClick={appendNumber} />
            <Button label="6" onClick={appendNumber} />
            <Button label="+" onClick={chooseOperation} className="operator" />
            <Button label="7" onClick={appendNumber} />
            <Button label="8" onClick={appendNumber} />
            <Button label="9" onClick={appendNumber} />
            <Button label="-" onClick={chooseOperation} className="operator" />
            <Button label="." onClick={appendNumber} />
            <Button label="0" onClick={appendNumber} />
            <Button label="=" onClick={compute} className="span-two operator" />
        </div>
    );
}

export default Calculator;