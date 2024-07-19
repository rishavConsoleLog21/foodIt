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

export default { GetCategory, GetRestaurant };
