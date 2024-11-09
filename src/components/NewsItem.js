import React, { Component } from 'react'

export class NewsItem extends Component {
 
  render() {
    let {title,description,imgUrl,newsUrl,author,date,source}= this.props
    return (
      <div>
            <div className="card" style={{width: "18rem"}}>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>{source}</span>
            <img src={imgUrl?imgUrl:"https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg?w=826&t=st=1724250464~exp=1724251064~hmac=836244ec415566524019d5571ac6507085821f01c57b65f8a036020d0d30311e"} className="card-img-top" alt="..."/>
             <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
              <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
             </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
