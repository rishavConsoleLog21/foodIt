import { gql, request } from "graphql-request";
const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const GetCategory = async () => {
  const query = gql`
    query Categories {
      categories(first: 20) {
        id
        slug
        name
        icon {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const GetRestaurant = async (category) => {
  const query =
    gql`
    query GetRestaurant {
  restaurants(where: {categories_some: {slug: "` +
    category +
    `"}}) {
    aboutUs
    address
    banner {
      url
    }
    categories {
      name
    }
    id
    name
    slug
    workingHours
    restroType
  }
}
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const GetRestaurantDetails = async (restaurantSlug) => {
  const query =
    gql`
    query RestaurantDetail {
      restaurant(where: { slug: "` +
    restaurantSlug +
    `" }) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        restroType
        slug
        workingHours
        menu {
          ... on Menu {
            id
            category
            menuItem {
              ... on MenuItem {
                id
                name
                description
                price
                productImage {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const AddToCart=async(data)=>{
  const query=gql`
  mutation AddToCart {
    createUserCart(
      data: {email: "`+data?.email+`", price: `+data.price+`, 
      productDescription: "`+data.description+`", productImage: "`+data.productImage+`", 
      productName: "`+data.name+`"
      restaurant: {connect: {slug: "`+data.restaurantSlug+`"}}}
    ) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
  
  `
  const result=await request(MASTER_URL,query);
  return result;
}

const GetUserCart = async (userEmail) => {
  const query =
    gql`
  query GetUserCart {
    userCarts(where: {email: "` +
    userEmail +
    `"}) {
      id
      price
      productDescription
      productImage
      productName
      restaurant {
        name
        banner {
          url
        }
        slug
      }
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  GetCategory,
  GetRestaurant,
  GetRestaurantDetails,
  AddToCart,
  GetUserCart,
};
