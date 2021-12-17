import { gql, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import Table from "../../components/Table/Table";

 export  const GET_ALL_BLOGS = gql`
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
    const {loading, error ,data} = useQuery(GET_ALL_BLOGS)



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
              accessor: "content"
          },
          {
            Header: "Created Date",
            accessor: "created_at",
          }
        ],
        []
      );
    
    const tableData = useMemo(() => {
        if(data){
            return data.getAllBlogPost;
        }
        else
            return []
    }, [data]);
    
    const handleRowClick = (id:String) => {
        alert(id)
    }

  return (
    <div className="blog-post-table" style = {{paddingTop: "20px"}}>
        {
            loading ? <div>Data are loading </div> :
         <Table columns={tableHeaders} data={tableData} handleRowClick = {handleRowClick}/>
        }
    </div>
  );
};



export default BlogPostTable;
