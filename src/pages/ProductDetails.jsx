import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`https://api.restful-api.dev/objects/${id}`);
      return res.data;
    },
  });
  const back = () => {
    navigate(-1);
  };

  if (isLoading) return <div className="text-center p-6">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-6 text-red-500">Error loading product</div>
    );

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Product Details</h1>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-400 text-black px-2 py-1 rounded-xl font-bold "
          onClick={back}
        >
          Back
        </button>
      </div>
      <div className="flex  justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          {product.data &&
            Object.entries(product.data).map(([key, value]) => (
              <p key={key} className="text-gray-500">{`${key}: ${value}`}</p>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
