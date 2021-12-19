import { Close16, Close24, Close32 } from "@carbon/icons-react";
import { CircularProgress, Modal } from "@material-ui/core";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";
import CustomModal from "../../components/Modal/Modal";
import Table from "../../components/Table/Table";
import TabModule from "../../components/TabModule/TabModule";
import { useSnackBar } from "../../context/SnackbarContext";
import {
  GetAllBlogsDocument,
  useDeleteBlogPostMutation,
  useGetAllBlogsQuery,
} from "../../queries/autogenerate/hooks";

const BlogPostTable = () => {
  const [iseDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
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

  const toggleDeleteModal = () =>
    setIsDeleteModalOpen((currentState) => !currentState);

  const handleRowClick = (id: String) => {
    // alert(id);
    navigate(`edit_blog/${id}`);
  };

  const handleEditClick = (id: String) => {
    navigate(`edit_blog/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setIsDeleteModalOpen(true);
    setSelectedId(id);
  };

  return (
    <>
      {iseDeleteModalOpen && (
        <DeleteModal
          handleModalClose={toggleDeleteModal}
          selectedId={selectedId}
        />
      )}

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
    </>
  );
};

const DeleteModal = ({ handleModalClose, selectedId, isOpen }: any) => {
  const [deleteBlogPost, { loading, error, data }] = useDeleteBlogPostMutation({
    refetchQueries: [GetAllBlogsDocument, "GetAllBlogs"],
  });
  const { setSnackBarState } = useSnackBar();

  useEffect(() => {
    if (data) {
      setSnackBarState({
        display: true,
        type: "success",
        message: "Blog is Successfully Deleted",
      });
      setTimeout(() => {
        handleModalClose();
      }, 1000);
    }
    if (error) {
      setSnackBarState({
        display: true,
        type: "error",
        message: "Error while deleting Blog",
      });
    }
  }, [error, data]);
  const handleDeleteClick = () => {
    deleteBlogPost({ variables: { id: selectedId } });
  };
  return (
    <CustomModal
      modalTitle={"Delete Blog Post"}
      handleOnClose={handleModalClose}
      handleOnSubmit={handleDeleteClick}
      isProgressBar={loading}
    >
      <span>Are you sure you want to delete this?</span>
    </CustomModal>
  );
};

export default BlogPostTable;
