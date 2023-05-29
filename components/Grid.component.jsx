import Link from "next/link";

export default function Grid({ gridID, data, actions, route }) {
  return (
    <div
      id={gridID}
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {data.map((item, i) => (
        <>
          {route !== "" ? (
            <Link
              href={`/Dashboard/${route}/${item.PlantID}`}
              key={"list" + gridID + "-" + i}
            >
              <a className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-medium truncate">
                        {item.Name}
                      </h3>
                    </div>
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      {item.Description}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    {actions.map((act, i) => (
                      <div className="w-0 flex-1 flex" key={i}>
                        <button
                          onClick={() => act.onClick(item)}
                          className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm bg-pr text-light-100 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                        >
                          <act.icon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-3">{act.label}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            </Link>
          ) : (
            <div className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">
                      {item.Name}
                    </h3>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {item.Description}
                  </p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  {actions.map((act, i) => (
                    <div className="w-0 flex-1 flex" key={i}>
                      <button
                        onClick={() => act.onClick(item)}
                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm bg-pr text-light-100 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                      >
                        <act.icon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">{act.label}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
}
