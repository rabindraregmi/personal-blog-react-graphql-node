import "./BlogPostCard.scss";

import moment from "moment";
import { Calendar16 } from "@carbon/icons-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import parse from "html-react-parser";

const BlogPostCard = ({ blog, size = "sm" }: any) => {
  return (
    <div className={clsx("blog-post", size === "sm" ? "blog-post-sm" : "")}>
      {/* <div className="blog-thumb">
        <img src="../../assets/image/bg.jpg" alt="" />
      </div> */}
      <div className="down-content">
        {size === "sm" ? (
          <NavLink to={`/view_blog/${blog?.id}`}>
            <h4>{blog?.title}</h4>
          </NavLink>
        ) : (
          <h4>{blog?.title}</h4>
        )}

        <ul className="post-info">
          <li>
            <Calendar16 />
            <span>{moment(Number(blog?.created_at)).format("LL")}</span>
          </li>
          <li>
            <span>Sports</span>
          </li>
        </ul>
        <p className={clsx("content", size === "sm" ? "content-summary" : "")}>
          {size === "sm"
            ? blog?.content?.replace(/<[^>]+>/g, "")
            : parse(blog?.content || "")}
        </p>
      </div>
    </div>
  );
};

export default BlogPostCard;
