import { Delete16, Delete24, Edit16, Edit24 } from "@carbon/icons-react";
import { useTable } from "react-table";
import "./Table.scss";

const Table = ({ columns, data, handleRowClick}: any) => {
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div className="table-responsive-custom">
      <div className="scrollable-table-container-lg">
        <table
          {...getTableProps()}
          className="table  table-striped table-hover"
        >
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </th>
                    ))
                  }
                  <th colSpan={2} role="columnheader">Action</th>
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display

                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell, index) => {
                        // Apply the cell propsro
                        
                        return cell.column.Header === "S.N."? (
                          <td>{cell.row.index +1}</td>
                        ): (
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
                      <div className = "d-flex">
                        <Edit24 color="blue" onClick={()=>{
                          handleRowClick((row.original as any).id)}
                          
                          }/> &nbsp; &nbsp;
                        <Delete24 color="red" 
                          onClick={()=>{
                          handleRowClick((row.original as any).id)}
                          }
                        />

                      </div>
                    </td>
                   
                  </tr>
                );
              })
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
