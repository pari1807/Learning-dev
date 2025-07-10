const ProductInfo = () =>{
    const products = {
        name: "Laptop",
        price: 56100,
        description: "A high-performance laptop for all your computing needs.",
        availability: "In Stock",
        rating: 4.5,
    }

    return (
        <div>
        <h1>Name: {products.name}</h1>
        <p>Price: ₹{products.price}</p>
        <p>Description: {products.description}</p>
        <p>Availability: {products.availability}</p>
        </div>
    );
};

export default ProductInfo;