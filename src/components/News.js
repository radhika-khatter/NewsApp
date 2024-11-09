import React, { Component } from 'react';
import NewsItem from './NewsItem';
import SpinnerLoad from './SpinnerLoad';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      query: '', // State to hold the search query
    };
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  // Function to fetch articles based on the search query
  fetchArticles = async () => {
    const { country, category, pagesize } = this.props;
    const { page, query } = this.state;

    // Use search endpoint if a query exists, otherwise use top-headlines
    const url = query
      ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=${country}&max=${pagesize}&token=8fa21eb477afc056b376b3525e0c161f&page=${page}`
      : `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&token=8fa21eb477afc056b376b3525e0c161f&page=${page}&pageSize=${pagesize}`;

    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorMessage = await response.text(); // Get error message
        throw new Error(`Failed to fetch articles: ${errorMessage}`);
      }
      const parsedData = await response.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalArticles || parsedData.totalResults, // Handle different response formats
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching articles:', error);
      this.setState({ loading: false });
    }
  };

  // Function to handle search input change
  handleSearchChange = (event) => {
    this.setState({ query: event.target.value });
  };

  // Function to perform search on button click
  performSearch = () => {
    this.setState({ page: 1 }, this.fetchArticles); // Reset page to 1 for new search
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 }, this.fetchArticles);
  };

  render() {
    const { articles, totalResults, loading, query } = this.state;

    return (
      <>
        <div className="search-container">
          <input
            type="text"
            value={query}
            onChange={this.handleSearchChange}
            placeholder="Search articles..."
          />
          <button onClick={this.performSearch}>Search</button>
        </div>

        {loading && <SpinnerLoad />} {/* Show loader while loading */}
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<SpinnerLoad />}
        >
          <div className='container'>
            <div className='row my-3'>
              {articles.map((element, index) => (
                <div className='col-md-4 mt-5' key={`${element.url}-${index}`}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    newsUrl={element.url}
                    imgUrl={element.image} // Use the correct image property
                    author={element.source.name} // Update to show source name as author
                    date={element.publishedAt} // Keep the publication date
                    source={element.source.name} // Keep the source name
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
