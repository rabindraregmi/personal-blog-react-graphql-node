import { Add24 } from "@carbon/icons-react";
import _ from "lodash";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button/button";
import CustomModal from "../../components/Modal/Modal";
import Table from "../../components/Table/Table";
import TabModule from "../../components/TabModule/TabModule";
import { useSnackBar } from "../../context/SnackbarContext";
import {
  GetAllBlogsDocument,
  useDeleteBlogPostMutation,
  useGetAllBlogsQuery,
  useGetFilteredBlogPostLazyQuery,
} from "../../queries/autogenerate/hooks";

const BlogPostTable = () => {
  const [iseDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [getFilteredBlogs, { loading, data }] =
    useGetFilteredBlogPostLazyQuery();
  const [tab, setTab] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
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
  //delays the api call otherwise api will be hit on each keystroke
  const debounceFunction = _.debounce((searchText: any) => {
    setSearchInput(searchText);
  }, 1000);

  useEffect(() => {
    //this filter is only for publish/non publish, will have to make it better for every field.
    getFilteredBlogs({
      variables: {
        search: searchInput,
        query:
          tab === "ALL"
            ? null
            : {
                published: tab === "PUBLISHED",
              },
      },
    });
  }, [tab, searchInput]);

  return (
    <>
      {iseDeleteModalOpen && (
        <DeleteModal
          handleModalClose={toggleDeleteModal}
          selectedId={selectedId}
        />
      )}

      <div className="blog-post-table" style={{ paddingTop: "20px" }}>
        <div
          className="above-table-section"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="add-blog-button">
            <Link to="add_blog">
              <Button label="Add New Blog Post" Icon={<Add24 />} />
            </Link>
          </div>
          <div className="blog-search-bar">
            <div className="form-group">
              <input
                type="text"
                name="blog-search-input"
                className="form-control"
                placeholder="Type to search for Blogs"
                defaultValue=""
                onChange={(e) => debounceFunction(e.target.value)}
              />
            </div>
          </div>
        </div>

        <TabModule
          tabMapping={JSON.stringify(tabMapping)}
          selected={tab}
          setTab={setTab}
          onTabChange={(tab: string) => setTab(tab)}
        >
          <Table
            columns={tableHeaders}
            data={tableData}
            handleRowClick={handleRowClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            loading={loading}
            componentName="ALL"
          />
          <span></span>
        </TabModule>
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
