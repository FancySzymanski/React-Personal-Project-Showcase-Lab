
function ProductCard({ product, locations, currentLocation }) {
const availableLocations = locations ? locations.filter((l) =>
    product.locationsIds.some((id) => String(id) === String(l.id))
)
: [];

  return (
    <>
      <div className="product-card">
        <img
        src={product.image}
        alt={product.imageAlt}
        className="product-image"
        />
        <h2>{product.name}</h2>
        <p className="product-price"> ${product.price.toFixed(2)}</p>
        {!currentLocation && (
            <p className="product-locations">
                Available at: {availableLocations.map((l) => l.location).join(", ")}
            </p>
        )}
      </div>
    </>
  )
}

export default ProductCard