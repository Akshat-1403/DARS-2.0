import {Link} from "react-router-dom"
import { ReactTyped } from "react-typed";

export default function LandingPage(){
    return (
    <div className="w-full px-4 sm:px-9 flex gap-8 justify-between items-center">
        <div className="w-full lg:w-[40vw]">
            <h1 className="text-4xl md:text-5xl uppercase font-bold">
                <span className="text-primary">Verify</span> 
                {" "}your Academic records with{" "}
                <div style={{content:"transparency"}}>
                    <ReactTyped 
                        className="text-primary"
                        strings={["ease.", "transparency.", "efficiency."]}
                        typeSpeed={80}
                        loop
                        backDelay={950}
                        showCursor={true} 
                    />
                </div>
            </h1>
            <p className="my-8 text-gray-700">
                Introducing a decenteralized academic records storing system based on <span className="text-primary opacity-75">MOI technology</span>.
                Institutes can upload their students data and courses attended by them.
                This records is decentralized and can be verified from anywhere, by anyone.
            </p>
            <Link to="/records" className="connect-button !mx-0 hover:bg-[#1d4ed8]">Get Started</Link>
        </div>
        <img className="w-[36vw] hidden lg:block" src="/moi_landingPage.svg" alt="landing page"/>        
    </div> 
    );
}