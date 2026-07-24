import ProductCard from "./ProductCard";

function FeaturedProducts() {
    const products = [
        {
            name: "Apple iPhone 16",
            price: "79999",
            image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg",
        },

        {
            name: "Samsung Galaxy S25",
            price: "74999",
            image: "https://m.media-amazon.com/images/I/71lD7eGdW-L._SX679_.jpg",
        },

        {
            name: "Sony Headphones",
            price: "9999",
            image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SX679_.jpg",
        },

        {
            name: "Apple Watch",
            price: "45999",
            image: "https://m.media-amazon.com/images/I/71vFKBpKakL._SX679_.jpg",
        },
    ];

    return (
        <section className="container my-5">
            <h2 className="text-center fw-bold mb-4">Featured Products</h2>

            <div className="row">
                {products.map((item, index) => (
                    <ProductCard
                        key={index}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                    />
                ))}
            </div>
        </section>
    );
}

export default FeaturedProducts;
