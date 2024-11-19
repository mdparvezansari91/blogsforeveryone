// src/hooks/useFetchArticles.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchArticles } from '@/store/features/articleSlice';

const useFetchArticles = (currentPage: number, limit: number) => {
    const dispatch = useAppDispatch();
    const categoryFilter = useAppSelector((state) => state.articles.filter.category);
    const countryFilter = useAppSelector((state) => state.articles.filter.country);

    useEffect(() => {
        const filter = {
            category: categoryFilter,
            country: countryFilter,
        };
        dispatch(fetchArticles({ page: currentPage, limit, filter }));
    }, [currentPage, dispatch, categoryFilter, countryFilter, limit]);
};

export default useFetchArticles;