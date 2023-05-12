import { useNavigation } from "react-router-dom";
import Pagination from "../../../components/pagination";
import Spinner from "../../../components/spinner";
import { useCategoryContext } from "../category-context";

const CategoryList = ({ categories: { data, totalRecords } , deleteCategory}) => {
  const navigation = useNavigation();
  const {setCategory} = useCategoryContext();
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            {navigation.state !== 'idle' && <Spinner/>}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>نام</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {data.map((category) => {
                  return (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td className="table-action">
                        <a className="ms-3" onClick={() => setCategory(category)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokewidth="2"
                            className="feather feather-edit-2 align-middle"
                          >
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                        </a>
                        <a onClick={() => deleteCategory(category.id)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokewidth="2"
                            className="feather feather-trash align-middle"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="card-footer">
              <Pagination totalRecords={totalRecords}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
