import { CategoriesQueryQuery } from "../gql/graphql";

export const categoriesDataFixture = {
    "categoryCollection": {
        "edges": [
            {
                "node": {
                    "id": "1",
                    "name": "homme"
                }
            },
            {
                "node": {
                    "id": "2",
                    "name": "femme"
                }
            },
            {
                "node": {
                    "id": "4",
                    "name": "mix"
                }
            }
        ]
    }
} as unknown as CategoriesQueryQuery
