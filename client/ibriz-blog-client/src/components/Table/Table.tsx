import { Delete16, Delete24, Edit16, Edit24 } from "@carbon/icons-react";
import { CircularProgress } from "@material-ui/core";
import { usePagination, useTable } from "react-table";
import "./Table.scss";

const Table = ({
  columns,
  data,
  handleRowClick,
  handleDeleteClick,
  handleEditClick,
  loading,
}: any) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      //@ts-ignore
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  ) as any; // due to issue in library for typescript
  return (
    <div className="table-responsive-custom">
      <div className="scrollable-table-container-lg">
        {loading && (
          <div className="loader-section">
            <CircularProgress />
          </div>
        )}

        <table
          {...getTableProps()}
          className="table  table-striped table-hover"
        >
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup: any) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column: any) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </th>
                    ))
                  }
                  <th colSpan={2} role="columnheader">
                    Action
                  </th>
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              page.map((row: any) => {
                // Prepare the row for display

                prepareRow(row);
                return (
                  // Apply the row props
                  <tr
                    {...row.getRowProps()}
                    onClick={(e) => handleRowClick((row.original as any).id)}
                    className="table-body-row"
                  >
                    {
                      // Loop over the rows cells
                      row.cells.map((cell: any, index: number) => {
                        // Apply the cell propsro

                        return cell.column.Header === "S.N." ? (
                          <td>{cell.row.index + 1}</td>
                        ) : (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                    <td>
                      <div className="d-flex action-buttons">
                        <Edit24
                          color="blue"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleEditClick((row.original as any).id);
                          }}
                        />{" "}
                        &nbsp; &nbsp;
                        <Delete24
                          color="red"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteClick((row.original as any).id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <div
          className="paginate"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="paginate-entries">
            <label>Rows per page:</label>
            <select
              className="borderless"
              value={pageSize}
              onChange={(e) => {
                setPageSize(e.target.value);
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "30px" }}>
              Showing{" "}
              {`${pageIndex * pageSize + 1} to
                    ${Math.min((pageIndex + 1) * pageSize, data.length)}
                  `}{" "}
              entries of {data.length}
            </span>

            <ul className="pagination pull-right">
              <>
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  style={{ padding: "0px", marginRight: "10px" }}
                >
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                </button>
                {pageOptions.map((pageNumber: any, index: number) => (
                  <li
                    key={index}
                    className={
                      pageNumber === pageIndex
                        ? "page-item active"
                        : "page-item"
                    }
                    value={pageNumber}
                    onClick={(e) => gotoPage(e.currentTarget.value)}
                  >
                    <div className="page-link">{pageNumber + 1}</div>
                  </li>
                ))}
                <button
                  disabled={!canNextPage}
                  onClick={() => nextPage()}
                  style={{ padding: "0px", marginLeft: "10px" }}
                >
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </button>
              </>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
