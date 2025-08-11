import { useCallback, useEffect, useRef, useState } from "react"
import { CategoryDto, formParams, Product } from "@/model/request/utilRequest"
import { apiCategory, apiProduct } from "@/service/commonApi";

export const useProductList = (params: formParams) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [totalRecords, setTotalRecords] = useState<number>(0);


    const isMountedRef = useRef(true);
    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchProductList = useCallback (async() => {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        abortControllerRef.current = controller;
        try {
            let response : Product[] = [];
            let totalProduct = 0;
            if(params?.categoryId && params.categoryId.length > 0) {
                const categoryRequest = await apiCategory.fetchCategoriesWithProducts({
                    categoryId: params.categoryId,
                    keyword: params.keyword,
                    minPrice: params.minPrice,
                    maxPrice: params.maxPrice,
                });
                response = (categoryRequest?.params as CategoryDto[])?.flatMap(c => c.products ?? []);
                totalProduct = response.length;
            } else {
                const productRequest = await apiProduct.fetchProducts(params);
                response = productRequest?.params?.content;
                totalProduct = productRequest?.params?.totalElements;
            }
            if (isMountedRef.current) {
                setProducts(response);
                setTotalRecords(totalProduct);
            }
        } catch (err : unknown) {
            if (isMountedRef.current && err instanceof Error && err.name !== "AbortError") {
                setError(err);
            }       
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, [params])

    useEffect(() => {
        isMountedRef.current = true;
        fetchProductList();
        return () => {
            isMountedRef.current = false;
            abortControllerRef.current?.abort();
        };
    }, [fetchProductList]);

    return { products,totalRecords, loading, error }

}