import Products from "./productcomponent/productcomponent";
import { useLocation } from "react-router-dom";

import a from "./ProductLandingImages/Screenshot from 2023-05-15 15-52-18.png"
import b from "./ProductLandingImages/Screenshot from 2023-05-17 10-03-42.png"

import { useEffect, useState } from "react";
import axios from "axios";

function ProductLanding() {
    const { search } = useLocation();
    const cat = { category: new URLSearchParams(search).get("category") };
    const [state, setState] = useState("");
    const [currentImage, setCurrentImage] = useState(0);

    const Images = [a, b];

    useEffect(() => {
        const Interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % Images.length);
        }, 3000);
        return () => clearInterval(Interval);
    },
        [])

    const ImageUrl = Images[currentImage];

    useEffect(() => {
        async function data() {
            try {
                let response = await axios.post("http://localhost:5050/productlanding", cat);
                setState(response.data)
            }
            catch (error) {
                console.log(error);
            }
        }
        data()
    }, []);

    return (
        <div className="h-screen w-screen" >
            <div className="flex items-center justify-center bg-black shadow-sm" ><img src={ImageUrl} ></img></div>
            <div className="p-7  flex  " >
                <Products data={state} />
            </div>
        </div>
    )
}
export default ProductLanding;