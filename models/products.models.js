const { Schema, model } = require("mongoose");

const productSchema = Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "Description is required"] },
    category: { type: String, required: [true, "Category is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    tags: { type: [String], required: [true, "Tags are required"] },
    brand: { type: String, required: [true, "Brand is required"] },
    sku: { type: String, required: [true, "SKU is required"] },
    weight: { type: Number, required: [true, "Weight is required"] },
    dimensions: { type: Object, required: [true, "Dimensions are required"] },
    warrantyInformation: {
      type: String,
      required: [true, "Warranty Information is required"],
    },
    minimumOrderQuantity: {
      type: Number,
      default: 0,
      required: [true, "Minimum Order Quantity must be set"],
    },
    metadata: {
      type: Object,
      default: { createdAt: Date.now(), updatedAt: Date.now() },
      validate: {
        validator: function (val) {
          return !val["barcode"] || !val["qrcode"];
        },
        message: "Meta data must contain bar code",
      },
    },
    images: { type: [String], required: [true, "Images are required"] },
    reviews: { type: [Object], default: [] },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0.0 },
  },
  {
    toJSON: { virtuals: true },
  }
);

productSchema.virtual("availabilityStatus").get(function () {
  return this.stock > 10
    ? "In Stock"
    : this.stock > 0
    ? "Low Stock"
    : "Out of Stock";
});

productSchema.virtual("thumbnailImage").get(function () {
  return this.images[0];
});

const Products = model("products", productSchema);

module.exports = Products;
