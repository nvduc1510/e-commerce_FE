import { Category, paramsCategory } from "@/model/request/utilRequest";
import { apiCategory } from "@/service/commonApi";
import { useCallback, useEffect, useRef, useState } from "react";

// export const useCategory = (params : formParams = {}) => {
export const useCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const isMountedRef = useRef(true);
    const abortControllerRef = useRef<AbortController | null>(null);
    const [params, setParams] = useState<paramsCategory>({
        keyword:'',
    });

    const fetchCategories = useCallback(async() => {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        abortControllerRef.current = controller;
        try {
            const res = await apiCategory.fetchCategories(params);
            if (isMountedRef.current) {
                setCategories(res?.params?.content ?? []);
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
    },[params])

    const fetchProductsByCategoryId = useCallback(async(customParams: paramsCategory) => {
        setLoading(true);
        setError(null);
        const controller = new AbortController();
        abortControllerRef.current = controller;
        try {
            const res = await apiCategory.fetchProductsByCategoryId(customParams);
            if(isMountedRef.current) {
                return res?.params?.products;
            }
        } catch (error) {
            if(isMountedRef.current && error instanceof Error && error.name !== "AbortError") {
                setError(error);
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    },[])
    
    useEffect(() => {
        isMountedRef.current = true;
        fetchCategories();
        return () => {
            isMountedRef.current = false;
            abortControllerRef.current?.abort();
        };
    },[fetchCategories])

    return {categories, fetchProductsByCategoryId, loading, error, params, setParams}
    
}