import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
function Footer(){

    return(

        <div className="border-t-2 py-3.5 font-fredoka">

            <div className="flex justify-center gap-3">

                <div className="text-xl hidden min-[550px]:block">Get connected with us on social networks : </div>
                <div className="flex items-center gap-3 mb-2.5 min-[550px]:m-0">
                    <FaFacebook size={30} className="cursor-pointer transition-all duration-300 hover:text-[#f3424d]"></FaFacebook>
                    <FaInstagram size={30} className="cursor-pointer transition-all duration-300 hover:text-[#f3424d]"></FaInstagram>
                    <FaLinkedin size={30} className="cursor-pointer transition-all duration-300 hover:text-[#f3424d]"></FaLinkedin>
                </div>
            </div>
            <div className="flex items-center gap-2 justify-center">
                <FaRegCopyright size={20} />
                <div className="text-lg">Airbnb Private Limited</div>
            </div>

        </div>
    )
}

export default Footer;