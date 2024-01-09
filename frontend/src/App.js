import React, { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      activeItem: {
        name: ""
      },
      recipeList: []
      };
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);      
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }


  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/recipes/');
      const recipeList = await res.json();
      this.setState({
        recipeList
      });
    } catch (e) {
      console.log(e);
  }
  }

  

  renderRecipe = () => {
    const newItems = this.state.recipeList;
    return newItems.map(item => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className={`recipe-title mr-2`} title={item.title}>
          {item.title}
        </span>
      </li>
    ));
  };

  renderRecipeProducts = () => {
    const newItems = this.state.recipeList;
    return newItems.map((item, id) => (
      <ul key={id}>
        {item.products.map((product, index) => (
          <li key={index}>
            <span>{product.name}</span>
            <hr/>
          </li>
        ))}
      </ul>
    ))
  };

  render() {
    return (
      <main className="content">
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <ul className="list-group list-group-flush" >
              {this.renderRecipe()}
              <div>
                <Button className="list-group list-group-flush mt-2"> 

                </Button>
                {/* <li className="list-group list-group-flush mt-2">{this.renderRecipeProducts()}</li> */}
              </div>
            </ul>
          </div>
        </div>
      </div>
      
    </main>
    )
  }
}

class Button extends React.Component {
  state = {
      textflag: false,
  }

  ToggleButton() {
      this.setState(
          { textflag: !this.state.textflag }
      );
  }

  render() {
      return (
          <div>
              <button onClick={() => this.ToggleButton()}>
                  {this.state.textflag === false ? "Hide" : "Show"}
              </button>
              {!this.state.textflag && this.props.text}
          </div>
      )
  }
}
  
export default App;