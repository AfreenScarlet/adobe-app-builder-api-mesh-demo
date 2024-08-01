import "./styles.css";
import "react-tooltip/dist/react-tooltip.css";
import React from "react";
import {Tooltip} from "react-tooltip";
import query from "./query.js";
import CodeSidebar from "./codeSidebar";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const API_MESH_URL =
  "https://graph.adobe.io/api/ec3e7f33-9db2-404d-9f96-d173b3a575c8/graphql?api_key=9535cbef33c2420392224d6a29e7becb";

class APIMeshExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiMeshRes: "",
      products: [],
      salePrice: 0.5
    };
  }

  componentDidMount() {
    let options = {
      method: "post",
      body: JSON.stringify(query),
      headers: {
        "content-type": "application/json"
      }
    };

    fetch(API_MESH_URL, options)
      .then(response => response.json())
      .then(res => {
        console.log(res);

        this.setState({
          apiMeshRes: res.data,
          products: res.data.products.items
        });
      });
  }

  render() {
    return (
      <div>
        <img className="nav" src="nav.png" />
        <h2>Your search results</h2>

        <div className="results" key="div0">
          {this.state.products ? (
            <ul key="list0">
              {this.state.products.map((item, idx) => (
                <li id={idx} key={item.sku.split[0]}>
                  <img className="product-image" id={item.image.url} src={item.image.url} />
                  <p className="item-name auto-width" id={item.name.split[0] + idx}>
                    {item.name}
                  </p>

                  {this.state.salePrice ? (
                    <div className="price-container">
                      <p className="price strike" id={idx + item.price_range.minimum_price.regular_price.value}>
                        {USDollar.format(item.price_range.minimum_price.regular_price.value)}
                      </p>
                      <p className="price sale" id={idx + this.state.salePrice}>
                        {USDollar.format(item.price_range.minimum_price.regular_price.value * this.state.salePrice)}
                      </p>
                    </div>
                  ) : (
                    <p id="price">${item.price_range.minimum_price.regular_price.value}</p>
                  )}

                  <button>ADD TO CART</button>
                  <span>&#9825;</span>

                  {item.demoDetails ? (
                    <div>
                      <p style={{width: "130px"}} id={item.sku + idx}>
                        Items remaining: {item.demoDetails.quantity}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p style={{width: "130px"}} id={item.sku + idx}>
                        Items remaining: {Math.floor(Math.random() * 10) + 1}
                      </p>
                    </div>
                  )}

                  <Tooltip anchorId={item.image.url} place="bottom" content="Source: Adobe Commerce" />

                  <Tooltip anchorId={item.name.split[0] + idx} place="top" content="Source: Adobe Commerce" />

                  <Tooltip
                    anchorId={idx + item.price_range.minimum_price.regular_price.value}
                    place="bottom"
                    content="Source: Adobe Commerce"
                  />
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
          {this.state.apiMeshRes ? (
            <div>
              <CodeSidebar meshResponse={this.state.apiMeshRes} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default APIMeshExample;
