import React from "react";
import { useTable, useBlockLayout } from "react-table";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import BarChartData from "./data";

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useBlockLayout
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return cell.column.isGrouped ? (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ) : (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Profile Progress",
        accessor: "progress",
        width: 500,
        Cell: (props) => (
          <div>
            <HighchartsReact highcharts={Highcharts} options={props.value} />
          </div>
        )
      }
    ],
    []
  );

  const data = React.useMemo(() => BarChartData(1), []);
  return <Table columns={columns} data={data} />;
}

export default App;
