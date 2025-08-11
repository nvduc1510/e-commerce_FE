import React from 'react';
import { formatCurrency } from './commonFormat';

interface ProductPriceProps {
    price: number;
    discount?: number;
    classNameWrapper?: string;
    classNameFinal?: string;
    classNameOriginal?: string;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
    price,
    discount = 0,
    // classNameWrapper = '',
    classNameFinal = 'text-2xl sm:text-3xl text-primary leading-none block',
    classNameOriginal = 'text-lg sm:text-xl leading-none pb-[5px] text-title line-through pl-2 inline-block dark:text-white',
}) => {
    const hasDiscount = discount > 0;
    const discountedPrice = price * (1 - discount / 100);

    return (
        <>
            {hasDiscount ? (
                <>
                <span className={classNameOriginal}>{formatCurrency(price)}</span>
                <span className={classNameFinal}>{formatCurrency(discountedPrice)}</span>
                </>
            ) : (
                <span className={classNameFinal}>{formatCurrency(price)}</span>
            )}
        </>
        
    );
};

export default ProductPrice;
