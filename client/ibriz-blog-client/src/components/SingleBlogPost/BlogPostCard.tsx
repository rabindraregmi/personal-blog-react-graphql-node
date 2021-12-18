import "./BlogPostCard.scss";

import moment from "moment";
import { Calendar16 } from "@carbon/icons-react";

const BlogPostCard = ({ blog }: any) => {
  return (
    <div className="blog-post">
      <div className="blog-thumb">
        <img src="" alt="" />
      </div>
      <div className="down-content">
        <span>Lifestyle</span>
        <a href="post-details.html">
          <h4>{blog?.title}</h4>
        </a>
        <ul className="post-info">
          {/* <li>
            <a href="#">Admin</a>
          </li> */}
          <li>
            <Calendar16 />
            {moment(Number(blog?.created_at)).format("LL")}
          </li>
          {/* <li>
            <a href="#">12 Comments</a>
          </li> */}
        </ul>
        <p>{blog?.content?.replace(/<[^>]+>/g, "").substring(0, 300)}</p>
      </div>
    </div>
  );
};

export default BlogPostCard;
