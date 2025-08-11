/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import AOS from 'aos';

import IncreDre from '../../components/incre-dre';
import NavbarOne from '../../components/navbar/navbar-one';
import FooterOne from '../../components/footer/footer-one';
import DetailTab from '../../components/product/detail-tab';
import ScrollToTop from '../../components/scroll-to-top';
import LayoutOne from '@/components/product/layout-one';

import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useProduct } from '@/hooks/product/useProducts';
import { Product } from '@/model/request/utilRequest';
import { useCategory } from '@/hooks/category/useCategory';
import ProductPrice from '@/components/utils/productPrice';

export default function ProductDetails() {
    const [activeImage, setActiveImage] = useState<number>(0)
    const { slug } = useParams<{ slug: string }>();
    const { fetchDetailProduct, loading, error } = useProduct();
    const [product, setProduct] = useState<Product | null>(null);
    const [productList, setProductList] = useState<Product[]>([]);
    const imageBasePath = "../../../assets/img/gallery/product/";
    const images = product?.imageUrls ?? [];
    const thumbnail = product?.thumbnailImage;
    const allImages = thumbnail ? [thumbnail, ...images] : images;
    useEffect(()=>{
        AOS.init()
    },[]);

    const {fetchProductsByCategoryId} = useCategory();
    const categoryId = product?.category.categoryId;

    useEffect(() => {
        if (slug) {
            fetchDetailProduct(slug).then((res) => {
                if (res) setProduct(res);
            });
            if (categoryId) {
                fetchProductsByCategoryId({categoryId: categoryId}).then((res) => {         
                    if (res) setProductList(res)
                })
            }
        }
    }, [slug, fetchDetailProduct,categoryId,fetchProductsByCategoryId]);
    if (loading) return <div>Loading product...</div>;
    if (error) return <div>Error loading product: {error.message}</div>;

    return (
        <>
            <NavbarOne/>
            <div className="bg-[#F8F5F0] dark:bg-dark-secondary py-5 md:py-[30px]">
                <div className="container-fluid">
                    <ul className="flex items-center gap-[10px] text-base md:text-lg leading-none font-normal text-title dark:text-white max-w-[1720px] mx-auto flex-wrap">
                        <li><Link to="/">Home</Link></li>
                        <li>/</li>
                        <li><Link to="/shop-v1">Shop</Link></li>
                        <li>/</li>
                        <li className="text-primary">{product?.productName ? product?.productName : 'Classic Relaxable Chair'}</li>
                    </ul>
                </div>
            </div>

            <div className="s-py-50" data-aos="fade-up">
                <div className="container-fluid">
                    <div className="max-w-[1720px] mx-auto flex justify-between gap-10 flex-col lg:flex-row">
                        <div className="w-full lg:w-[58%]">
                            <div className="relative product-dtls-wrapper">
                                <button className="absolute top-5 left-0 p-2 bg-[#E13939] text-lg leading-none text-white font-medium z-50">-10%</button>
                                <div className="product-dtls-slider ">
                                    {allImages.length > 0 && (
                                        <img src={`${imageBasePath}` + allImages[activeImage]} className='w-full' alt="product"/>
                                    )}
                                </div>
                                <div className="product-dtls-nav h-100 overflow-y-auto flex flex-col gap-2 pr-1 scrollbar-thin scrollbar-thumb-gray-300 ">
                                    {allImages.map((img, index) => (
                                        <div key={index} 
                                            onClick={() => setActiveImage(index)}
                                            className={`mb-2 cursor-pointer border-2 ${activeImage === index ? 'border-primary' : 'border-transparent'}`}
                                            > 
                                            <img src={`${imageBasePath}` + img  } alt={`Thumbnail ${index + 1}`}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="lg:max-w-[635px] w-full">
                            <div className="pb-4 sm:pb-6 border-b border-bdr-clr dark:border-bdr-clr-drk">
                                <h2 className="font-semibold leading-none">{product?.productName ? product?.productName : 'Classic Relaxable Chair'}</h2>
                                <div className="flex gap-4 items-center mt-[15px]">
                                    <ProductPrice price={product?.price ?? 0}
                                                discount={product?.discount ?? 0} />
                                </div>
                                <p className="sm:text-lg mt-5 md:mt-7">
                                    {product?.shortDescription}
                                </p>
                            </div>
                            <div className="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up" data-aos-delay="200">
                                <IncreDre/>
                                <div className="flex gap-4 mt-4 sm:mt-6">
                                    <Link to="/cart" className="btn btn-solid" data-text="Add to Cart">
                                        <span>Add to Cart</span>
                                    </Link>
                                    <Link to="#" className="btn btn-outline" data-text="Add to Wishlist">
                                        <span>Add to Wishlist</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up" data-aos-delay="300">
                                <div className="flex gap-x-12 gap-y-3 flex-wrap">
                                    <h6 className="leading-none font-medium">{product?.sku}</h6>
                                    <h6 className="leading-none font-medium">Category : {product?.category.categoryName}</h6>
                                </div>
                                <div className="flex gap-x-12 lg:gap-x-24 gap-y-3 flex-wrap mt-5 sm:mt-10">
                                    <div className="flex gap-[10px] items-center">
                                        <h6 className="leading-none font-medium">Size :</h6>
                                        <div className="flex gap-[10px]">
                                            <label className="product-size">
                                                <input className="appearance-none hidden" type="radio" name="size" checked/>
                                                <span className="w-6 h-6 flex items-center justify-center pt-[2px] text-sm leading-none bg-[#E8E9EA] dark:bg-dark-secondary text-title dark:text-white duration-300">S</span>
                                            </label>
                                            <label className="product-size">
                                                <input className="appearance-none hidden" type="radio" name="size" />
                                                <span className="w-6 h-6 flex items-center justify-center pt-[2px] text-sm leading-none bg-[#E8E9EA] dark:bg-dark-secondary text-title dark:text-white duration-300">M</span>
                                            </label>
                                            <label className="product-size">
                                                <input className="appearance-none hidden" type="radio" name="size"/>
                                                <span className="w-6 h-6 flex items-center justify-center pt-[2px] text-sm leading-none bg-[#E8E9EA] dark:bg-dark-secondary text-title dark:text-white duration-300">L</span>
                                            </label>
                                            <label className="product-size">
                                                <input className="appearance-none hidden" type="radio" name="size"/>
                                                <span className="w-6 h-6 flex items-center justify-center pt-[2px] text-sm leading-none bg-[#E8E9EA] dark:bg-dark-secondary text-title dark:text-white duration-300">XL</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex gap-[10px] items-center">
                                        <h6 className="leading-none font-medium">Color :</h6>
                                        <div className="flex gap-[10px] items-center">
                                            <label className="product-color">
                                                <input className="appearance-none hidden" type="radio" name="color" />
                                                <span className="border border-[#D68553] flex rounded-full border-opacity-0 duration-300 p-1">
                                                    <span className="w-4 h-4 rounded-full bg-[#D68553] flex"></span>
                                                </span>
                                            </label>
                                            <label className="product-color">
                                                <input className="appearance-none hidden" type="radio" name="color" checked/>
                                                <span className="border border-[#61646E] flex rounded-full border-opacity-0 duration-300 p-1">
                                                    <span className="w-4 h-4 rounded-full bg-[#61646E] flex"></span>
                                                </span>
                                            </label>
                                            <label className="product-color">
                                                <input className="appearance-none hidden" type="radio" name="color"/>
                                                <span className="border border-[#E9E3DC] flex rounded-full border-opacity-0 duration-300 p-1">
                                                    <span className="w-4 h-4 rounded-full bg-[#E9E3DC] flex"></span>
                                                </span>
                                            </label>
                                            <label className="product-color">
                                                <input className="appearance-none hidden" type="radio" name="color"/>
                                                <span className="border border-[#9A9088] flex rounded-full border-opacity-0 duration-300 p-1">
                                                    <span className="w-4 h-4 rounded-full bg-[#9A9088] flex"></span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up" data-aos-delay="400">
                                <h4 className="font-medium leading-none">Tags :</h4>
                                <div className="flex flex-wrap gap-[10px] md:gap-[15px] mt-5 md:mt-6">
                                    {product?.tags.map((item,index)=>{
                                        return(
                                            <Link className="btn btn-theme-outline btn-xs" to="#" data-text={item} key={index}><span>{item}</span></Link>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="pt-4 sm:pt-6" data-aos="fade-up" data-aos-delay="200">
                                <div className="flex items-center gap-6">
                                    <h6 className="font-normal">Share : </h6>
                                    <div className="flex gap-6">
                                        <Link to="#" className="text-paragraph duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                            <FaFacebookF className='size-5'/>
                                        </Link>
                                        <Link to="#" className="text-paragraph duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                            <FaTwitter className='size-5'/>
                                        </Link>
                                        <Link to="#" className="text-paragraph duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                            <FaInstagram className='size-5'/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="s-py-50">
                <div className="container-fluid">
                    <DetailTab/>
                </div>
            </div>

            <div className="s-py-50-100" data-aos="fade-up" data-aos-delay="200">
                <div className="container-fluid">
                    <div className="max-w-[547px] mx-auto text-center">
                        <h6 className="text-2xl sm:text-3xl md:text-4xl leading-none">Related Products</h6>
                        <p className="mt-3">Explore complementary options that enhance your experience. Discover related products curated just for you. </p>
                    </div>
                    <div className="max-w-[1720px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8 pt-8 md:pt-[50px]">
                        {productList.slice(0,4).map((item,index)=>{
                            return(
                                <LayoutOne item={item} key={index}/>
                            )
                        })}
                    </div>
                </div>
            </div>

            <FooterOne/>
            <ScrollToTop/>

        </>
    )
}
