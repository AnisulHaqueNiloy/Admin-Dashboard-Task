import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  const {
    register: addRegister,
    handleSubmit: handleAddSubmit,
    reset: resetAddForm,
    formState: { errors: addErrors },
  } = useForm();

  const handleAddProduct = async (data) => {
    try {
      const newProduct = {
        name: data.name,
        data: {
          price: data.price,
          category: data.category,
          description: data.description,
        },
      };

      const res = await axios.post(
        "https://api.restful-api.dev/objects",
        newProduct
      );
      console.log(res.data);
      resetAddForm();
      refetch();
      Swal.fire({
        icon: "success",
        title: `${data.name} has been added!`,
        showConfirmButton: false,
        timer: 1000,
      });
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add product. Please try again.",
      });
    }
  };

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

      <button
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Product
      </button>

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
              <FaDeleteLeft className="absolute right-0 top-0 text-2xl pr-1" />
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

      {isAddModalOpen && (
        <div className="fixed inset-0   bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleAddSubmit(handleAddProduct)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...addRegister("name", {
                    required: "Product name is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
                {addErrors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {addErrors.name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="text"
                  {...addRegister("price", { required: "Price is required" })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  {...addRegister("category", {
                    required: "Category is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...addRegister("description", {
                    required: "Description is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Add Product
              </button>
            </form>
            <button
              className="mt-4 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
