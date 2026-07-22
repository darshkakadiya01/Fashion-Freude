import CategoryCard from "./CategoryCard";

function Categories() {

  const categories = [

    {
      title: "Electronics",
      image: "https://cdn-icons-png.flaticon.com/512/1041/1041888.png"
    },

    {
      title: "Fashion",
      image: "https://cdn-icons-png.flaticon.com/512/892/892458.png"
    },

    {
      title: "Laptops",
      image: "https://cdn-icons-png.flaticon.com/512/179/179386.png"
    },

    {
      title: "Watches",
      image: "https://cdn-icons-png.flaticon.com/512/2972/2972531.png"
    },

    {
      title: "Shoes",
      image: "https://cdn-icons-png.flaticon.com/512/2589/2589903.png"
    },

    {
      title: "Furniture",
      image: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png"
    }

  ];

  return (

    <section className="container my-5">

      <h2 className="text-center mb-4 fw-bold">
        Shop by Category
      </h2>

      <div className="row">

        {
          categories.map((item, index) => (

            <CategoryCard
              key={index}
              title={item.title}
              image={item.image}
            />

          ))
        }

      </div>

    </section>

  );

}

export default Categories;