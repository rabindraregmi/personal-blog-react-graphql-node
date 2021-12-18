import { gql, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";
import TabModule from "../../components/TabModule/TabModule";

export const GET_ALL_BLOGS = gql`
  query GetAllBlogs {
    getAllBlogPost {
      id
      title
      subtitle
      content
      published
      created_at
      updated_at
    }
  }
`;
const BlogPostTable = () => {
  const { loading, data } = useQuery(GET_ALL_BLOGS);
  const navigate = useNavigate()

  const tableHeaders = useMemo(
    () => [
      {
        Header: "S.N.",
        accessor: "",
      },
      {
        Header: "Blog Title",
        accessor: "title",
      },
      {
        Header: "Blog Content",
        accessor: "content",
      },
      {
        Header: "Created Date",
        accessor: "created_at",
      },
    ],
    []
  );

  const tableData = useMemo(() => {
    if (data) {
      return data.getAllBlogPost;
    } else return [];
  }, [data]);

  const tabMapping = {
    ALL: ["ALL", "All"],
    PUBLISHED: ["PUBLISHED", "Published Blogs"],
    UNPUBLISHED: ["UNPUBLISHED", "Unpublished Blogs"]
  };

  const handleRowClick = (id: String) => {
   // alert(id);
    navigate(`edit_blog/${id}`)
  };

  return (
    <div className="blog-post-table" style={{ paddingTop: "20px" }}>
      {loading ? (
        <div>Data are loading </div>
      ) : (
        <TabModule
        tabMapping={JSON.stringify(tabMapping)}
        selected={"ALL"}
        
        >
        <Table
          columns={tableHeaders}
          data={tableData}
          handleRowClick={handleRowClick}
          componentName = "ALL"
          />
          <span></span>
          </TabModule>
      )}
    </div>
  );
};

export default BlogPostTable;
