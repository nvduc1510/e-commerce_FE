import { Product } from "@/model/request/utilRequest";
import { useEffect, useRef, useState, useCallback } from "react";
import { apiProduct } from "@/service/commonApi";

export const useProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const isMountedRef = useRef(true);
    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchDetailProduct = useCallback(async (slug: string): Promise<Product | null> => {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const res = await apiProduct.fetchDetailProduct(slug);
            if (isMountedRef.current) {
                return res?.params?? null;
            }
        } catch (err: unknown) {
            if (isMountedRef.current && err instanceof Error && err.name !== "AbortError") {
                setError(err);
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }

        return null;
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
            abortControllerRef.current?.abort();
        };
    }, []);

    return { fetchDetailProduct, loading, error };
};
