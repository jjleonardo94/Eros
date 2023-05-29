const Table = ({ tableID, data, actions }) => {
  const getColumns = () => {
    const columns = [];
    for (let key in data[0]) {
      if (typeof data[0][key] !== "object" && key !== "id") {
        columns.push({
          Header: key,
          accessor: key,
        });
      }
    }
    return columns;
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table
              id={`table_${tableID}`}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                <tr>
                  {getColumns().map((column) => (
                    <th
                      scope="col"
                      key={column.accessor}
                      className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.Header}
                    </th>
                  ))}
                  <th
                    scope="col"
                    key="actions"
                    className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-light-100 divide-y divide-gray-200">
                {data.map((item, i) => (
                  <tr key={`${tableID}_table_item_${i}`}>
                    {getColumns().map((column, index) => (
                      <td
                        key={`${tableID}_table_item_${i}_${index}`}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {item[column.Header]}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {actions.map((action) => (
                          <button
                            type="button"
                            key={action.label}
                            className="text-sm font-medium text-gray-900 mx-2"
                            onClick={() => action.onClick(item)}
                            title={action.label}
                          >
                            <action.icon
                              className="w-6 h-6"
                              aria-hidden="true"
                            />
                          </button>
                        ))}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
