import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from '../../assets/img/bg/register.jpg';
import NavbarOne from "../../components/navbar/navbar-one";
import FooterOne from "../../components/footer/footer-one";
import ScrollToTop from "../../components/scroll-to-top";
import Aos from "aos";
import API from "@/components/utils/auth/axiosInterceptor";
import toast from "react-hot-toast";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        Aos.init();
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || !fullName) {
            toast.error("Please fill in all required fields!");
            return;
        }

        const validPhone = (phone && phone.trim().match(/^[0-9]{10,11}$/)) ? phone.trim() : "0912345678";

        setLoading(true);
        try {
            const username = email.split('@')[0] + Math.floor(Math.random() * 100);
            await API.post('http://localhost:8080/register', {
                username,
                email,
                password,
                confirmPassword: password,
                fullName,
                phone: validPhone,
                address: "Sample Address"
            });
            toast.success("Account created successfully! Please login.");
            navigate("/login");
        } catch (error: any) {
            console.error('Registration error:', error);
            const msg = error?.response?.data?.message || error?.response?.data?.params?.message || "Registration failed!";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
        <NavbarOne/>

        <div className="flex">
            <div className="w-1/2 hidden md:block lg:flex-1" >
                <img className="h-full object-cover" src={bg} alt="register"/>
            </div>
            <div className="w-full md:w-1/2 lg:max-w-lg xl:max-w-3xl lg:w-full py-16 px-[20px] sm:px-8 lg:p-16 xl:p-24 relative z-10 flex items-center overflow-hidden">
                <form onSubmit={handleRegister} className="mx-auto md:mx-0 max-w-md w-full">
                    <h2 className="leading-none" data-aos="fade-up" data-aos-delay="100">Create New Account</h2>
                    <p className="text-lg mt-[15px]" data-aos="fade-up" data-aos-delay="200">Buy & sale your exclusive product only on Furnixar</p>
                    
                    <div className="mt-7" data-aos="fade-up" data-aos-delay="300">
                        <label className="text-base sm:text-lg font-medium leading-none mb-2.5 block dark:text-white">Full Name</label>
                        <input value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full h-12 md:h-14 bg-white dark:bg-transparent border border-bdr-clr focus:border-primary p-4 outline-none duration-300 dark:text-white" type="text" placeholder="Enter your full name"/>
                    </div>

                    <div className="mt-5" data-aos="fade-up" data-aos-delay="350">
                        <label className="text-base sm:text-lg font-medium leading-none mb-2.5 block dark:text-white">Phone Number</label>
                        <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full h-12 md:h-14 bg-white dark:bg-transparent border border-bdr-clr focus:border-primary p-4 outline-none duration-300 dark:text-white" type="text" placeholder="Enter your phone number"/>
                    </div>

                    <div className="mt-5" data-aos="fade-up" data-aos-delay="400">
                        <label className="text-base sm:text-lg font-medium leading-none mb-2.5 block dark:text-white">Email Address</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} required className="w-full h-12 md:h-14 bg-white dark:bg-transparent border border-bdr-clr focus:border-primary p-4 outline-none duration-300 dark:text-white" type="email" placeholder="Enter your email address"/>
                    </div>

                    <div className="mt-5" data-aos="fade-up" data-aos-delay="500">
                        <label className="text-base sm:text-lg font-medium leading-none mb-2.5 block dark:text-white">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} required className="w-full h-12 md:h-14 bg-white dark:bg-transparent border border-bdr-clr focus:border-primary p-4 outline-none duration-300 dark:text-white" type="password" placeholder="* * * * * * * *"/>
                    </div>

                    <div className="mt-7" data-aos="fade-up" data-aos-delay="700">
                        <button type="submit" disabled={loading} className="btn btn-theme-solid w-full mt-[15px]" data-text={loading ? "Registering..." : "Register"}>
                            <span>{loading ? "Registering..." : "Register"}</span>
                        </button>
                        <p className="text-lg mt-[15px]" >Already have an account ?<Link to="/login" className="text-primary font-medium ml-1 inline-block">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>

        <FooterOne/>
        <ScrollToTop/>
    </>
  )
}
