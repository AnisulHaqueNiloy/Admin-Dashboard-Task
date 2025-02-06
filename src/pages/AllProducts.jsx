import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://api.restful-api.dev/objects");
      return res.data;
    },
  });

  const hdelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://api.restful-api.dev/objects/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
            refetch();
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "There was an error deleting the product.",
              "error"
            );
          });
      }
    });
  };

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="text-center p-6">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-6 text-red-500">Error loading products</div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>

      {/* Search  */}
      <input
        type="text"
        placeholder="Search products..."
        className="mb-4 p-2 border rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="block p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition relative"
          >
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <button
              className="cursor-pointer"
              onClick={() => hdelete(product.id)}
            >
              <FaDeleteLeft className="absolute right-0 top-0 text-2xl pr-1"></FaDeleteLeft>
            </button>
            <div>
              {product.data &&
                Object.entries(product.data).map(([key, value]) => (
                  <p
                    key={key}
                    className="text-gray-500"
                  >{`${key}: ${value}`}</p>
                ))}
              <button className="bg-green-400 px-2 py-1 rounded-2xl cursor-pointer my-2">
                <Link to={`/dashboard/product-details/${product.id}`}>
                  Details
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
