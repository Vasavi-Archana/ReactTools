import React from 'react';
import ReactDOM from 'react-dom';

let expenseOptions = {'Rent':570,'Car':294};


class ExpenseCriteriaList extends React.Component {
    render()
    {
      const expensesArray = this.props.expensesList;
      return <table className="table"><thead><tr><td><b>Expense Name</b></td><td><b>Amount</b></td></tr></thead>
          
          <tbody>
            {
                
                Object.keys(expensesArray).map((expenseType,index) => 
                    <Option key = {expenseType} optionname = {expenseType} optionvalue={expensesArray[expenseType]} deleteOption={this.props.deleteexpenseType}></Option>
                    )
            }
          </tbody></table>
    }    
}

class Option extends React.Component{

    constructor(props)
    {
        super(props);
        this.deleteOperation = this.deleteOperation.bind(this);
    }

    deleteOperation()
    {
        const namevalue = this.props.optionname;
        this.props.deleteOption(namevalue);
    }
    render()
    {
       
      return <tr>
          <td>{this.props.optionname}</td>
          <td>{this.props.optionvalue}</td>
          <td><button className="btn btn-default" onClick={this.deleteOperation}>&times;</button></td>
          </tr>
    }
}


class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {options:expenseOptions,total:570+294};
    this.addNewCriteria = this.addNewCriteria.bind(this);
    this.calculateTotalAmount = this.calculateTotalAmount.bind(this);
    this.deleteCriteria = this.deleteCriteria.bind(this);
    this.removeAmount = this.removeAmount.bind(this);
    this.title = "Expense Tracker";
  }
  
   addNewCriteria(option,optionamount)
  {
    this.state.options[option] = optionamount;
    this.setState({
      options:this.state.options
    });
    this.calculateTotalAmount();
   
  }
  
  calculateTotalAmount()
  {
    let totalAmount =0;
    const expensesArray = this.state.options;
    Object.keys(expensesArray).map((expenseType) => totalAmount+=expensesArray[expenseType]);
    this.setState({
      total:totalAmount
    });
    
  }

  deleteCriteria(optionname)
  {
      const amount = this.state.options[optionname];
      delete this.state.options[optionname];
      this.setState({
        options:this.state.options
      });
      this.removeAmount(amount);
  }

  removeAmount(amount)
  {
      this.state.total-=amount;
      this.setState({
        total:this.state.total
      });
  }
  render()
  {
      let expensecode = '';
      
      if (Object.keys(this.state.options).length>0)
      {
          expensecode = 
          <ExpenseCriteriaList expensesList = {this.state.options} deleteexpenseType={this.deleteCriteria}/>;
      }
    
    return <div className="container">
        <Title title={this.title}/>
        {expensecode}
        <CriteriaForm addOption = {this.addNewCriteria}/>
        <TotalAmount amount = {this.state.total}/>
        </div>
    
  }
}

class Title extends React.Component
{
  render()
  {
    return <h1>{this.props.title}</h1>
  }
}
class CriteriaForm extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {newcriteria:'',newamount:0};
    this.setCriteria = this.setCriteria.bind(this);
    this.setNewCriteria = this.setNewCriteria.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.resetform = this.resetform.bind(this);
  }
  
  setCriteria(event)
  {
    this.setState({
      newcriteria:event.target.value
    });
  }
  setAmount(event)
  {
    this.setState({
      newamount:event.target.value
    });
  }
  
 setNewCriteria(event)
  {
    event.preventDefault();
    
    const newoption = this.state.newcriteria;
    const newcost = parseFloat(this.state.newamount);
  
    if(newoption && !isNaN(newcost))
      {
        this.props.addOption(newoption,newcost);
        this.resetform();
      }
    
    
  }
  
  resetform()
  {
    this.setState({
      newamount:0,
      newcriteria:''
    });
  }
  
  render()
  {
    return <form onSubmit={this.setNewCriteria} >
      
      <p>
        <b>Criteria</b>&nbsp;
        <input type="text" onChange={this.setCriteria} value={this.state.newcriteria} className="form-control"/>
      </p>
      <p>
        <b>Amount</b>&nbsp;
        <input type="text" onChange = {this.setAmount} value={this.state.newamount}  className="form-control"/>
      </p>
      <button type="submit" className="btn btn-primary">Add Criteria</button>
    </form>
   
  }
}

class TotalAmount extends React.Component
{
  render()
  {
    return <p><b>Total Amount</b>&nbsp;<label>{this.props.amount}</label></p>
  }
}

ReactDOM.render(<App />,document.getElementById('root'));


