import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch, clearSession } from "./client";

export const queryKeys = {
    productCategories: ['product_category'],
    products: ['products'],
    product: (id) => ['products', id],
    recipes: ['recipes'],
    recipe: (id) => ['recipes', id],
    diets: ['diets'],
    dietWeeks: ['diets', 'count-weeks'],
    dietPlan: ['diets', 'diet-plan'],
    shoppingList: (startDate, endDate) => ['diets', 'products-by-day', startDate, endDate],
    users: ['users'],
    currentUser: ['current_user'],
};

// --- Queries ---

export const useProductCategories = () =>
    useQuery({
        queryKey: queryKeys.productCategories,
        queryFn: () => apiFetch('/api/product_category/'),
    });

export const useProducts = () =>
    useQuery({
        queryKey: queryKeys.products,
        queryFn: () => apiFetch('/api/products/'),
    });

export const useProduct = (id) =>
    useQuery({
        queryKey: queryKeys.product(id),
        queryFn: () => apiFetch(`/api/products/${id}/`),
        enabled: !!id,
    });

export const useRecipes = () =>
    useQuery({
        queryKey: queryKeys.recipes,
        queryFn: () => apiFetch('/api/recipes/'),
    });

export const useRecipe = (id) =>
    useQuery({
        queryKey: queryKeys.recipe(id),
        queryFn: () => apiFetch(`/api/recipes/${id}/`),
        enabled: !!id,
    });

export const useDiets = () =>
    useQuery({
        queryKey: queryKeys.diets,
        queryFn: () => apiFetch('/api/diets/'),
    });

export const useDietWeeks = () =>
    useQuery({
        queryKey: queryKeys.dietWeeks,
        queryFn: () => apiFetch('/api/diets/count-weeks/'),
    });

export const useDietPlan = () =>
    useQuery({
        queryKey: queryKeys.dietPlan,
        queryFn: () => apiFetch('/api/diets/diet-plan/'),
    });

// Dates are "YYYY-MM-DD" strings; the query stays idle until both are set
export const useShoppingList = (startDate, endDate) =>
    useQuery({
        queryKey: queryKeys.shoppingList(startDate, endDate),
        queryFn: () => apiFetch(`/api/diets/products-by-day/?start_date=${startDate}&end_date=${endDate}`),
        enabled: !!startDate && !!endDate,
    });

export const useUsers = () =>
    useQuery({
        queryKey: queryKeys.users,
        queryFn: () => apiFetch('/api/user/list'),
    });

export const useCurrentUser = () => 
    useQuery({
        queryKey: queryKeys.currentUser,
        queryFn: () => apiFetch('/api/user/current'),
        staleTime: 5 * 60 * 1000, // Cache 5min
    });

// --- Mutations ---

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (credentials) => apiFetch('/api/user/login', { method: 'POST', body: credentials }),
        onSuccess: (data) =>  queryClient.setQueryData(queryKeys.currentUser, data),
    });
}

export const useLogout = () => {
    return useMutation({
        mutationFn: () => apiFetch('/api/user/logout', { method: 'POST'}),
        onSettled: clearSession
    })};

export const useRegister = () =>
    useMutation({
        mutationFn: (user) => apiFetch('/api/user/register', { method: 'POST', body: user }),
    });

export const useAddProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (product) => apiFetch('/api/products/', { method: 'POST', body: product }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.products }),
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, fields }) => apiFetch(`/api/products/${id}/`, { method: 'PATCH', body: fields }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.products }),
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => apiFetch(`/api/products/${id}/`, { method: 'DELETE' }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.products }),
    });
};

export const useCreateRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (recipe) => apiFetch('/api/recipes/', { method: 'POST', body: recipe }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.recipes }),
    });
};

export const useCreateDietPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (plan) => apiFetch('/api/diets/create-diet-plan/', { method: 'POST', body: plan }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.diets }),
    });
};
