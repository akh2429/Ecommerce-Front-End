import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import RenderNestedObject from './RenderNestedObject';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

function FinalCheckout() {
    const [state, setState] = useState();
    const [loading, setLoading] = useState(true); // State variable for tracking loading state
    const { search } = useLocation();
    const JWtoken = JSON.parse(localStorage.getItem('user'));

    const id = useMemo(() => {
        return { _id: new URLSearchParams(search).get('id') };
    }, [search]);

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axios.post('https://e-commerce-backend-a96p.onrender.com/finalCheckout', id);
                setState(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Set loading state to false when data fetching is complete
            }
        }
        fetchData();
    }, [id]);

    async function clickHandler(id) {
        const decoded = jwtDecode(JWtoken.token);
        const data = { userId: decoded.userId, productId: id, quantity: 1, action: 'addProduct' };
        if (data.userId && data.productId) {
            const response2 = await axios.post('https://e-commerce-backend-a96p.onrender.com/cart', data);
            if (response2.data === 'Item Saved') {
                Swal.fire({ title: 'Success', text: 'Item Saved to the cart', icon: 'success', confirmButtonText: 'Ok' });
            } else if (response2.data === 'Product Already Exist') {
                Swal.fire({ title: 'Error', text: `${response2.data}`, icon: 'error', confirmButtonText: 'Ok' });
            } else {
                Swal.fire({ title: 'Error', text: 'Please try again', icon: 'error', confirmButtonText: 'Ok' });
            }
        }
    }

    return (
        <div className="flex justify-center h-screen w-full bg-emerald-100 p-2">
            <div className="flex h-max w-1/2 lg:w-screen gap-1 md:w-screen sm:w-screen vsm:w-screen sm:h-screen sm:flex-col vsm:flex-col">
                <div className="flex flex-col h-max gap-5 border-2 border-black mr-1 rounded-b-3xl overflow-hidden">
                    <div className="flex object-cover p-2 border-2 border-black m-1 shadow-sm">
                        {loading ? (
                            <div className='text-2xl font-extrabold' >Loading...</div>
                        ) : (
                            <img alt="Not available" src={state?.images} />
                        )}
                    </div>
                    <div className="flex justify-center items-center shadow-sm">
                        <button
                            onClick={() => clickHandler(state?._id)}
                            className="flex justify-center items-center bg-yellow-400 font-extrabold w-1/2 border border-black mr-1 shadow-sm"
                        >
                            Add to Cart
                        </button>
                        <Link
                            to={'./paymentpage'}
                            className="flex justify-center items-center bg-yellow-400 w-1/2 font-extrabold border border-black shadow-sm"
                        >
                            <button>Buy Now</button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col h-max p-8 gap-2 items-start justify-start w-1/2 font-extrabold text-2xl capitalize border-2 border-black bg-orange-300 rounded-b-2xl sm:w-screen vsm:w-screen">
                    <div>
                        {state?.brand}-{state?.productname}
                    </div>
                    <div>Price: {state?.price}$/-</div>
                    <div className="flex flex-col gap-2">
                        {Object.entries(state?.productspec || {}).map(([key, value]) => (
                            <p key={key}>
                                <div className="flex">
                                    <div>{key}</div>:<div>{typeof value === 'object' ? RenderNestedObject(value) : value}</div>
                                </div>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinalCheckout;
