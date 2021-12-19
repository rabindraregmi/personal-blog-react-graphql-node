import moment from "moment";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";
import TabModule from "../../components/TabModule/TabModule";
import { useGetAllBlogsQuery } from "../../queries/autogenerate/hooks";

const BlogPostTable = () => {
  const { loading, data } = useGetAllBlogsQuery();
  const navigate = useNavigate();

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
      return data.getAllBlogPost?.map((blog: any) => {
        return {
          ...blog,
          created_at: moment(Number(blog.created_at)).format("YYYY/MM/DD"),
          content: blog.content.replace(/<[^>]+>/g, ""),
        };
      });
    } else return [];
  }, [data]);

  const tabMapping = {
    ALL: ["ALL", "All"],
    PUBLISHED: ["PUBLISHED", "Published Blogs"],
    UNPUBLISHED: ["UNPUBLISHED", "Unpublished Blogs"],
  };

  const handleRowClick = (id: String) => {
    // alert(id);
    navigate(`edit_blog/${id}`);
  };

  const handleEditClick = (id: String) => {
    navigate(`edit_blog/${id}`);
  };

  const handleDeleteClick = (id: String) => {
    alert("Delete Clicked" + id);
  };

  return (
    <div className="blog-post-table" style={{ paddingTop: "20px" }}>
      {loading ? (
        <div>Data are loading </div>
      ) : (
        <TabModule tabMapping={JSON.stringify(tabMapping)} selected={"ALL"}>
          <Table
            columns={tableHeaders}
            data={tableData}
            handleRowClick={handleRowClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            componentName="ALL"
          />
          <span></span>
        </TabModule>
      )}
    </div>
  );
};

export default BlogPostTable;
