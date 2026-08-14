import { GoStarFill } from 'react-icons/go'
import { LuEye, LuHeart } from 'react-icons/lu'
import { RiShoppingBag2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/commonFormat'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '@/store/cartThunks'
import { getUserIdFromToken } from '../utils/auth/tokenUtils'

export default function LayoutOne({ item }: { item: any }) {
    const dispatch = useDispatch<any>();
    const imageBasePath = "../../../assets/img/gallery/product/";
    const imgSrc = item.thumbnailImage ? `${imageBasePath}${item.thumbnailImage}` : item.image;
    const slugLink = item.slug ? `/product-details/${item.slug}` : `/product-details/${item.id}`;
    const name = item.productName || item.name;
    const priceText = typeof item.price === 'number' ? formatCurrency(item.price) : (item.price || '');
    const discountVal = item.discount || 0;
    const tagText = item.tag || '';

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        const userId = getUserIdFromToken() || 1;
        const productId = item.productId || item.id || 1;
        dispatch(addItemToCart({ userId, productId, quantity: 1, price: typeof item.price === 'number' ? item.price : 25 }));
        toast.success(`Added "${name}" to cart!`);
    };

    return (
            <div className="group">
                <div className="relative overflow-hidden">
                    <Link to={slugLink}>
                        <img className="w-full transform group-hover:scale-110 duration-300" src={imgSrc} alt="shop"/>
                    </Link>
                    {discountVal > 0 &&
                        <div className="absolute z-10 top-7 left-7 pt-[10px] pb-2 px-3 bg-[#E13939] rounded-[30px] font-primary text-[14px] text-white font-semibold leading-none">
                            {discountVal}% OFF
                        </div>
                    }
                    {discountVal === 0 && tagText &&
                        <div className="absolute z-10 top-7 left-7 pt-[10px] pb-2 px-3 bg-[#9739E1] rounded-[30px] font-primary text-[14px] text-white font-semibold leading-none">
                            {tagText}
                        </div>
                    }
                    <div className="absolute z-10 top-[50%] right-3 transform -translate-y-[40%] opacity-0 duration-300 transition-all group-hover:-translate-y-1/2 group-hover:opacity-100 flex flex-col items-end gap-3">
                        <Link to="#" onClick={(e) => { e.preventDefault(); toast.success(`Added "${name}" to wishlist!`); }} className="bg-white dark:bg-title dark:text-white bg-opacity-80 flex items-center justify-center gap-2 px-4 py-[10px] text-base leading-none text-title rounded-[40px] h-14 overflow-hidden new-product-icon">
                            <LuHeart className="dark:text-white h-[22px] w-[20px]"/>                                                                      
                            <span className="mt-1">Add to wishlist</span>
                        </Link>
                        <button onClick={handleAddToCart} className="bg-white dark:bg-title dark:text-white bg-opacity-80 flex items-center justify-center gap-2 px-4 py-[10px] text-base leading-none text-title rounded-[40px] h-14 overflow-hidden new-product-icon">
                            <RiShoppingBag2Line className="dark:text-white h-[22px] w-[20px]"/>  
                            <span className="mt-1">Add to Cart</span>
                        </button>
                        <Link to={slugLink} className="bg-white dark:bg-title dark:text-white bg-opacity-80 flex items-center justify-center gap-2 px-4 py-[10px] text-base leading-none text-title rounded-[40px] h-14 overflow-hidden new-product-icon quick-view">
                            <LuEye className="dark:text-white h-[22px] w-[20px]"/>                                      
                            <span className="mt-1">Quick View</span>
                        </Link>
                    </div>
                </div>
                <div className="md:px-2 lg:px-4 xl:px-6 lg:pt-6 pt-5 flex gap-4 md:gap-5 flex-col">
                    <h4 className="font-medium leading-none dark:text-white text-lg">{priceText}</h4>
                    <div>
                        <h5 className="font-normal dark:text-white text-xl leading-[1.5]">
                            <Link to={slugLink} className="text-underline">{name}</Link>
                        </h5>
                        <ul className="flex items-center gap-2 mt-1">
                            <li><GoStarFill className='text-yellow-500 size-4'/></li>
                            <li><GoStarFill className='text-yellow-500 size-4'/></li>
                            <li><GoStarFill className='text-yellow-500 size-4'/></li>
                            <li><GoStarFill className='text-yellow-500 size-4'/></li>
                            <li><GoStarFill className='text-slate-300 size-4'/></li>
                            <li className="dark:text-gray-100">( 1,230 )</li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}
