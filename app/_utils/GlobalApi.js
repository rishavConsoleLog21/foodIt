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

const DisconnectRestroFromUserCartItem=async(id)=>{
  const query=gql`
  mutation DisconnectRestaurantFromCartItem {
    updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+id+`"})
    {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
  `;
  const result=await request(MASTER_URL,query);
  return result;
}

const DeleteItemFromCart = async (id) => {
  const query = gql`
    mutation DeleteCartItem {
      deleteUserCart(where: { id: "${id}" }) {
        id
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};


const CreateNewOrder=async(data)=>{
  const query=gql`
  mutation CreateNewOrder {
    createOrder(
      data: {email: "`+data.email+`", 
      orderAmount: `+data.orderAmount+`, 
      restaurantName: "`+data.restaurantName+`", 
      userName: "`+data.userName+`", 
      phone: "`+data.phone+`", 
      address: "`+data.address+`", 
      zipCode: "`+data.zipCode+`"}
    ) {
      id
    }
  }
  `
  const result=await request(MASTER_URL,query);
  return result;
}

const UpdateOrderToAddOrderItems=async(name,price,id,email)=>{
  const query=gql`
  mutation UpdateOrderWithDetail {
    updateOrder(
      data: {orderDetail: {create: {OrderItem: 
        {data: {name: "`+name+`", price: `+price+`}}}}}
      where: {id: "`+id+`"}
    ) {
      id
    }
    publishManyOrders(to: PUBLISHED) {
      count
    }
   
      deleteManyUserCarts(where: {email: "`+email+`"}) {
        count
      }
       
  }
  `
  const result=await request(MASTER_URL,query);
  return result;
}

const GetUserOrders=async(email)=>{
  const query=gql`
  query UserOrders {
    orders(where: {email: "`+email+`"},orderBy: publishedAt_DESC) {
      address
      createdAt
      email
      id
      orderAmount
      orderDetail {
        ... on OrderItem {
          id
          name
          price
        }
      }
      phone
      restaurantName
      userName
      zipCode
    }
  }
  `
  const result=await request(MASTER_URL,query);
  return result;
}

export default {
  GetCategory,
  GetRestaurant,
  GetRestaurantDetails,
  AddToCart,
  GetUserCart,
  DisconnectRestroFromUserCartItem,
  DeleteItemFromCart,
  CreateNewOrder,
  UpdateOrderToAddOrderItems,
  GetUserOrders
};
