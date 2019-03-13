import React from 'react';
import ReactDOM from 'react-dom';

let expenseOptions = ['Rent','Car'];


class ExpenseCriteriaList extends React.Component {
    render()
    {
        return <ul>
            {
                this.props.expensesList.map(expenseType => 
                    <Option key = {expenseType} optionname = {expenseType}></Option>
                    )
            }
        </ul>
    }    
}

class Option extends React.Component{
    render()
    {
        return <li>{this.props.optionname}</li>
    }
}

const App = () => (
    <div>
        <h1>Welcome to Expense Tracker</h1>
        <ExpenseCriteriaList expensesList = {expenseOptions}/>
        
    </div>
)

ReactDOM.render(<App />,document.getElementById('root'));