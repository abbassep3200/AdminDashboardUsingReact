import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { httpInterceptedService } from "@core/http-service";
import { Suspense, useState } from "react";
import CategoryList from "../features/categories/components/category-list";
import Modal from "../components/modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AddOrUpdateCategory from "../features/categories/components/add-or-update-category";
import { useCategoryContext } from "../features/categories/category-context";

const CourseCategories = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    const [showAddCategory, setShowAddCategory] = useState(false);

    const {category} = useCategoryContext();

    const navigate = useNavigate();

    const { t } = useTranslation();

    const deleteCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        setShowDeleteModal(true);
    };

    const handleDeleteCategory = async () => {
        setShowDeleteModal(false);
        const response = httpInterceptedService.delete(
            `/CourseCategory/${selectedCategory}`
        );

        toast.promise(
            response,
            {
                pending: "در حال حذف ...",
                success: {
                    render() {
                        const url = new URL(window.location.href);
                        navigate(url.pathname + url.search);
                        return "عملیات با موفقیت انجام شد";
                    },
                },
                error: {
                    render({ data }) {
                        return t("categoryList." + data.response.data.code);
                    },
                },
            },
            {
                position: toast.POSITION.BOTTOM_LEFT,
            }
        );
    };

    const data = useLoaderData();
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <a
                            className="btn btn-primary fw-bolder mt-n1"
                            onClick={() => setShowAddCategory(true)}
                        >
                            افزون دسته جدید
                        </a>
                    </div>
                    {
                        (showAddCategory || category) && <AddOrUpdateCategory setShowAddCategory={setShowAddCategory}/>
                    }
                    <Suspense
                        fallback={
                            <p className="text-info">
                                در حال دریافت اطلاعات...
                            </p>
                        }
                    >
                        <Await resolve={data.categories}>
                            {(loadedCategories) => (
                                <CategoryList
                                    deleteCategory={deleteCategory}
                                    categories={loadedCategories}
                                />
                            )}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <Modal
                isOpen={showDeleteModal}
                open={setShowDeleteModal}
                title="حذف"
                body="آیا از حذف این دسته اطمینان دارید؟"
            >
                <button
                    type="button"
                    className="btn btn-secondary fw-bolder"
                    onClick={() => setShowDeleteModal(false)}
                >
                    انصراف
                </button>
                <button
                    type="button"
                    className="btn btn-primary fw-bolder"
                    onClick={handleDeleteCategory}
                >
                    حذف
                </button>
            </Modal>
        </>
    );
};

export async function categoriesLoader({ request }) {
    return defer({
        categories: loadCategories(request),
    });
}

const loadCategories = async (request) => {
    const page = new URL(request.url).searchParams.get("page") || 1;
    const pageSize = import.meta.env.VITE_PAGE_SIZE;
    let url = "/CourseCategory/sieve";

    url += `?page=${page}&pageSize=${pageSize}`;
    const response = await httpInterceptedService.get(url);
    return response.data;
};

export default CourseCategories;
