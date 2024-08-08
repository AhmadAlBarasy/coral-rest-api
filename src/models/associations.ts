import Address from "./Address";
import Brand from "./Brand";
import CarouselSlide from "./CarouselSlide";
import Category from "./Category";
import Order from "./Order";
import ProductImage from "./ProductImage";
import Product from "./Product";
import User from "./User";
import WishList from "./Wishlist";
import Review from "./Review";

const associateModels = () => {
  // --------------- User Associations --------------- :

  // A user has one order
  User.hasOne(Order, { foreignKey: "userId" });
  Order.belongsTo(User, { foreignKey: "userId" });

  // A user has one wishlist which has many products , and wishlist belongs to one user .
  User.hasOne(WishList, { foreignKey: "userId" });
  WishList.belongsTo(User, { foreignKey: "userId" });

  // A user has many reviews but a review belongs to one user
  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User, { foreignKey: "userId" });

  // --------------- Product Associations --------------- :

  // A product belongs to one brand while a brand has many products
  Brand.hasMany(Product, { foreignKey: "brandId" });
  Product.belongsTo(Brand, { foreignKey: "brandId" });

  // A product belongs to one category while a category has many products
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category, { foreignKey: "categoryId" });

  // A product has many images in productImages table and each image belongs to one product
  Product.hasMany(ProductImage, { foreignKey: "productId" });
  ProductImage.belongsTo(Product, { foreignKey: "productId" });

  // An order has many products through order items
  Order.belongsToMany(Product, {
    through: "orderItems",
    foreignKey: "orderId",
  });
  Product.belongsToMany(Order, {
    through: "orderItems",
    foreignKey: "productId",
  });

  // A product has many reviews but a review belongs to one product
  Product.hasMany(Review, { foreignKey: "productId" });
  Review.belongsTo(Product, { foreignKey: "productId" });

  // A Wishlist has many products and one product belongs to many wishlists .
  WishList.belongsToMany(Product, { through: "wishListItems" });
  Product.belongsToMany(WishList, { through: "wishListItems" });

  // --------------- Address Associations --------------- :

  // An address belongs to one order and an order has one address
  Address.hasOne(Order, { foreignKey: "addressId" });
  Order.belongsTo(Address, { foreignKey: "addressId" });

  // --------------- Carousel Slides Associations --------------- :

  // A category has one carousel slide and a carousel slide belongs to one category
  Category.hasOne(CarouselSlide, { foreignKey: "categoryId" });
  CarouselSlide.belongsTo(Category, { foreignKey: "categoryId" });
};

export default associateModels;
