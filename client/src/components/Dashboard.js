import React, { Component } from "react";
import axios from "axios";
import List from "./List";
import Logout from "./Logout";
import jwt_decode from "jwt-decode";
import { Record, History } from "../utils/RecordHistory";
import Loader from "react-loader-spinner";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      page: 0,
      search: "",
      username: "",
      typingTimeout: 0,
      load: false,
      filter: ["search", "story", 0],
      result: 0,
      processTime: 0
    };
  }

  componentDidMount() {
    const self = this;
    let url =
      "https://hn.algolia.com/api/v1/search?query=&tags=story&page=" +
      this.state.page +
      "&numericFilters=created_at_i>0";
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token;
    const decoded = jwt_decode(token);

    axios
      .get("/api/users/current")
      .then(function(response) {
        if (response.data.status == true) {
          self.setState({ load: true });
          delete axios.defaults.headers.common["Authorization"];
          axios
            .get(url)
            .then(function(response) {
              return response;
            })
            .then(function(response) {
              self.setState({
                content: response.data.hits,
                username: decoded.name,
                result: response.data.nbHits,
                processTime: response.data.processingTimeMS
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      })
      .catch(function(error) {
        console.log(error);
        self.props.history.push("./error");
      });
  }

  onChange(e) {
    const self = this;

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    self.setState({
      search: e.target.value,
      typingTimeout: setTimeout(function() {
        let url =
          "https://hn.algolia.com/api/v1/" +
          self.state.filter[0] +
          "?query=" +
          self.state.search +
          "&tags=" +
          self.state.filter[1] +
          "&numericFilters=created_at_i>" +
          self.state.filter[2];
        if (self.state.search != "") {
          Record(self.state.search);
          console.log(History[0].word);
          localStorage.setItem("history", JSON.stringify(History));
        }
        axios
          .get(url)
          .then(function(response) {
            return response;
          })
          .then(function(response) {
            self.setState({
              content: response.data.hits,
              result: response.data.nbHits,
              processTime: response.data.processingTimeMS
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }, 1000)
    });
  }
  pageChange(e) {
    const self = this;

    var pageNo = this.state.page + parseInt(e.target.value);
    if (pageNo > -1) {
      this.setState({ page: pageNo });

      let url =
        "https://hn.algolia.com/api/v1/" +
        this.state.filter[0] +
        "?query=&tags=" +
        this.state.filter[1] +
        "&page=" +
        pageNo +
        "&numericFilters=created_at_i>" +
        this.state.filter[2];
      axios
        .get(url)
        .then(function(response) {
          return response;
        })
        .then(function(response) {
          self.setState({
            content: response.data.hits,
            result: response.data.nbHits,
            processTime: response.data.processingTimeMS
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  filterShow(e) {
    let url = "";
    const self = this;
    console.log(e.target.value);
    if (e.target.value == "popularity") {
      this.setState(
        { filter: ["search", this.state.filter[1], this.state.filter[2]] },
        function() {
          console.log(this.state.boardAddModalShow);
        }
      );
      url =
        "https://hn.algolia.com/api/v1/search?query=&tags=" +
        this.state.filter[1] +
        "&page=0&numericFilters=created_at_i>" +
        this.state.filter[2];
    }
    if (e.target.value == "date") {
      this.setState({
        filter: ["search_by_date", this.state.filter[1], this.state.filter[2]]
      });

      url =
        "https://hn.algolia.com/api/v1/search_by_date?query=&tags=" +
        this.state.filter[1] +
        "&page=0&numericFilters=created_at_i>" +
        this.state.filter[2];
    }
    if (e.target.value == "stories") {
      this.setState({
        filter: [this.state.filter[0], "story", this.state.filter[2]]
      });

      url =
        "https://hn.algolia.com/api/v1/" +
        this.state.filter[0] +
        "?query=&tags=story&page=0&numericFilters=created_at_i>" +
        this.state.filter[2];
    }
    if (e.target.value == "comments") {
      this.setState({
        filter: [this.state.filter[0], "comment", this.state.filter[2]]
      });

      url =
        "https://hn.algolia.com/api/v1/" +
        this.state.filter[0] +
        "?query=&tags=comment&page=0&numericFilters=created_at_i>" +
        this.state.filter[2];
    }
    if (e.target.value == "all") {
      this.setState({ filter: ["search", this.state.filter[1], 0] });

      url =
        "https://hn.algolia.com/api/v1/search?query=&tags=" +
        this.state.filter[1] +
        "&page=0&numericFilters=created_at_i>0";
    }
    if (e.target.value == "24h") {
      this.setState({
        filter: ["search_by_date", this.state.filter[1], 86400]
      });

      url =
        "https://hn.algolia.com/api/v1/search_by_date?query=&tags=" +
        this.state.filter[1] +
        "&page=0&numericFilters=created_at_i>86400";
    }
    if (e.target.value == "week") {
      this.setState({
        filter: ["search_by_date", this.state.filter[1], 604800]
      });

      url =
        "https://hn.algolia.com/api/v1/search_by_date?query=&tags=" +
        this.state.filter[1] +
        "&page=0&numericFilters=created_at_i>604800";
    }
    if (e.target.value == "month") {
      this.setState({
        filter: ["search_by_date", this.state.filter[1], 2628000]
      });

      url =
        "https://hn.algolia.com/api/v1/search_by_date?query=&tags=" +
        this.state.filter[1] +
        "&page=0&numericFilters=created_at_i>2628000";
    }
    if (e.target.value == "year") {
      this.setState({
        filter: ["search_by_date", this.state.filter[1], 31535965]
      });

      url =
        "https://hn.algolia.com/api/v1/search_by_date?query=&tags=" +
        this.state.filter[1] +
        "&page=0&numericFilters=created_at_i>31535965";
    }
    console.log(url);
    axios
      .get(url)
      .then(function(response) {
        return response;
      })
      .then(function(response) {
        self.setState({
          content: response.data.hits,
          result: response.data.nbHits,
          processTime: response.data.processingTimeMS
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  removeSearch(e) {
    const self = this;
    let url =
      "https://hn.algolia.com/api/v1/" +
      this.state.filter[0] +
      "?query=&tags=" +
      this.state.filter[1] +
      "&page=0";
    this.setState({ search: "" });
    axios
      .get(url)
      .then(function(response) {
        return response;
      })
      .then(function(response) {
        self.setState({
          content: response.data.hits,
          result: response.data.nbHits,
          processTime: response.data.processingTimeMS
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    if (this.state.load === false) {
      return (
        <center>
          <div className="mt-lg">
            <Loader type="Circles" color="#FF6700" height="100" width="20" />
          </div>
        </center>
      );
    } else {
      return (
        <div className="container">
          <div className="bg-orange padding">
            <span className=" text-xl text-white">{this.state.username}</span>
            <span className=" ml-xl box" bg-white>
              <input
                type="text"
                className="input-width input-search"
                name="query"
                value={this.state.search}
                onChange={this.onChange.bind(this)}
              />
              <a className="dot" onClick={this.removeSearch.bind(this)} />
            </span>
            <span className="text-white ml-sm">
              <a href="/history">Go To Search History</a>
            </span>
            <span>
              <Logout />
            </span>
          </div>
          <div>
            <span>
              search{" "}
              <select onChange={this.filterShow.bind(this)}>
                <option value="stories">stories</option>
                <option value="comments">comments</option>
              </select>
            </span>
            <span>
              {" "}
              by{" "}
              <select onChange={this.filterShow.bind(this)}>
                <option value="popularity">popularity</option>
                <option value="date">date</option>
              </select>
            </span>
            <span>
              {" "}
              for{" "}
              <select onChange={this.filterShow.bind(this)}>
                <option value="all">All time</option>
                <option value="24h">Last 24h</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </span>
            <span>
              <p className="pull-right">
                {this.state.result} results ({this.state.processTime / 1000}{" "}
                seconds)
              </p>
            </span>
          </div>

          <List items={this.state.content} word={this.state.search} />
          <center>
            <p className="bg-color">
              <button
                type="button"
                className="btn"
                value="-1"
                onClick={this.pageChange.bind(this)}
              >
                Pre
              </button>
              <button
                type="button"
                className="btn"
                value="1"
                onClick={this.pageChange.bind(this)}
              >
                Next
              </button>
            </p>
          </center>
        </div>
      );
    }
  }
}

export default Dashboard;
