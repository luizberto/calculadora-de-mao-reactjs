import React, { Component } from "react";
import Button from "../components/Button";
import Display from "../components/Display";

import './calculator.css'

const initialState = {//objeto criado para definir todas as configurações iniciais da calc

    displayValue: '0',//atributo para definir o valor padrão no display
    clearDisplay: false,//atributo que inicia falso para sabermos se é necessário limpar o display
    operation: null,//atributo para armazenar as operações matematicas
    values: [0, 0],//atributo de array para armazenar os numeros digitados na execução da conta
    current: 0 //atributo que sera usado para definir qual numero do array estamos manipulando
}

export default class Calculator extends Component {

    state = { ...initialState }//clonamos o initialState no nosso state

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        //função chamada para limpar o display da calculadora
        this.setState({ ...initialState })

    }

    setOperation(operation) {
        //função que é chamada para as operações de matematica da caluladora
        console.log(operation)
        if(this.state.current === 0){//logica para passarmos para o indice 1 do array de values
            this.setState({operation, current: 1, clearDisplay: true})
        } else{
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            /*try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}` )
            }catch(e){
                values[0] = this.state.values[0]
            }*/

            if(currentOperation === '+'){
                values[0] = values[0] + values[1]
            }else if(currentOperation === '-'){
                values[0] = values[0] - values[1]
            }else if(currentOperation === '/'){
                values[0] = values[0] / values[1]
            }else if(currentOperation === '*'){
                values[0] = values[0] * values[1]
            }else{
                values[0] = this.state.values[0]
            }
            
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })

            
        }
    }

    addDigit(n) {
        //função que é chamada a partir de um click no numero da calculadora

        if (n === '.' && this.state.displayValue.includes('.')) {
            return
            //aqui definimos que se o usuario digitar ponto e ja houver ponto digitado ele ignora um segundo comando
        }

        //criamos uma const para quando for digitado um numero o 0 sumir ou quando o state de clearDisplay estiver setado como true
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay;

        //caso o display for ser limpo o valor corrente vai ser vazio mas caso ele não seja ele permanecará com o valor digitado ou gerado
        const currentValue = clearDisplay ? '' : 
        this.state.displayValue

        //const para receber os numeros digitados
        const displayValue = currentValue + n


        this.setState({ displayValue, clearDisplay: false })

        if(n !== '.'){//logica para armazenar os numeros digitados nos indices do array criado no state
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
            console.log(this.state.values)
        }

        
    }

    render() {
        return (
            <div className="calculator">
                <h1>Calculadora</h1>

                <Display value={this.state.displayValue} />

                <Button label="AC" triple click={this.clearMemory} />

                <Button label="/" operation click={this.setOperation} />

                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />

                <Button label="*" operation click={this.setOperation} />

                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />

                <Button label="-" operation click={this.setOperation} />

                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />

                <Button label="+" operation click={this.setOperation} />

                <Button label="0" double click={this.addDigit} />
                <Button label="." click={this.addDigit} />

                <Button label="=" operation click={this.setOperation} />
            </div>
        )

    }

}