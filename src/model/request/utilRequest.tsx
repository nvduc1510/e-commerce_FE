export interface UserLogin {
    email: string;
    password: string;
}
export interface formParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortDir?:string;
    keyword?: string;
    active?: string;
    minPrice?:number;
    maxPrice?:number;
    categoryId?: number[];
    productId?:number;
    slug?:string;
}

export interface paramsCategory {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortDir?:string;
    keyword?: string;
    active?: string;
    categoryId?: number;
    productId?:number;
}

export interface paramCategory{
    categoryId:number;
}

//=========== cart ===========
export interface CartRequest {
    cartId?: number;
    userId?: number;
    productId?: number;
    quantity?: number;
    price?: number;
}

export interface CartItemsDTO {
    cartId?: number;
    userId?: number;
    product?: Product;
    quantity?: number;
    price?: number;
    totalPrice?: number;
}

export interface CartResponse {
    items: CartItemsDTO[];
    cartTotal?: number;
}

export interface CartState {
    items: CartItemsDTO[];
    totalQuantity: number;
    cartTotal: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}


//=========== pagination ===========

export interface PaginationProps {
    totalRecords: number;
    limit: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

//=========== category ===========

export interface Category {
    categoryId: number;
    categoryName: string;
    description: string;
    status: UtilStatus;
}

export interface CategoryDto {
    categoryId: number;
    categoryName: string;
    description: string;
    products?: Product[];
}

//=========== product ===========

export interface Product {
    productId?: number;
    sku: string;
    productName: string;
    shortDescription: string;
    longDescription: string;
    technicalDetails: string;

    thumbnailImage: string;
    imageUrls: string[];

    price: number;
    quantity: number;
    discount: number;

    status: UtilStatus;
    brand: string;
    slug: string;

    averageRating: number;
    numberOfReviews: number;
    isAvailable: boolean;

    tags: string[];
    variants: ProductVariant[];

    category: Category;
}

export type UtilStatus = "ACTIVE" | "INACTIVE" | "DELETED";

export interface ProductVariant {
    id: number;
    name: string;
    value: string;
}

