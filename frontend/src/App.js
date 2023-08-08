import React, { Component } from "react"

const productItems = [
  {
    id: 1,
    name: "Jajo"
  },

  {
    id: 2,
    name: "Mleko"
  },
  {
    id: 3,
    name: "Mąka Pszenna"
  },

];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        name: ""
      },
      productList: []
      };
  }
  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/products/');
      const productList = await res.json();
      this.setState({
        productList
      });
    } catch (e) {
      console.log(e);
  }
  }

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.productList;
    return newItems.map(item => (
      <li 
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span 
          className={`product-title mr-2`}
          title={item.name}
          >
            {item.name}
          </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content">
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <ul className="list-group list-group-flush">
              {this.renderItems()}
            </ul>
          </div>
        </div>
      </div>
    </main>
    )
  }
}
  
export default App;