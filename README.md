# Mocked Apollo Provider

This is a proof of concept showing how a `<MockedProvider />` component can provide automated mocking of a given schema.

This has applications in the rendering of UI components in Storybook where access to an API may not be available.

### High-level approach:

1. GraphQL API generates [`schema.graphql`](https://github.com/dominicchapman/mocked-apollo-provider/blob/main/api/schema.graphql) file
2. `<MockedProvider />` uses [Babel macro](https://github.com/evenchange4/graphql.macro) to load that schema at build time (no running production or development instance of API required)
3. Apollo client is created with auto-mocked schema with [`addMocksToSchema`](https://github.com/dominicchapman/mocked-apollo-provider/blob/main/web/utilities/mocked-apollo-provider/src/mocked-provider.tsx#L10) from [`@graphql-tools/mock`](https://www.graphql-tools.com/docs/mocking/)
4. [`<MockedProvider />`](https://github.com/dominicchapman/mocked-apollo-provider/blob/main/web/components/user-list/src/__stories__/user-list.stories.tsx#L10) is used in Storybook to provide the mocked output to field requests

|                                                   Input                                                   |                                                  Output                                                   |
| :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| ![](https://user-images.githubusercontent.com/7607007/103382287-660d1900-4ae6-11eb-9f6a-f86ca946d3fb.png) | ![](https://user-images.githubusercontent.com/7607007/103382233-1f1f2380-4ae6-11eb-972d-9a9d030ca426.png) |

### Considerations

This approach (specifically, using the Babel macro to capture the schema at build time) means using Babel for compilation instead of `tsc` (which is still used, but post-build and strictly for creating `.d.ts` files).

This would likely mean that use of a component like `<MockedProvider />` would call for a dedicated package.

### Issues

`useQuery` and `gql` had to be [exported](https://github.com/dominicchapman/mocked-apollo-provider/blob/main/web/utilities/mocked-apollo-provider/src/index.tsx#L3) from the same directory as the `<MockedProvider />` otherwise Apollo would throw the following error: "Could not find "client" in the context or passed in as an option."

I found a bunch of reports about this error in relation to mixed use of `@apollo/client` and `apollo-hooks` and so on, but this felt different.

I am concerned it could suggest that the Babel compilation interferes in some way with the export, but could just be Storybook being a pain. Need more time on this, but would prefer to gauge interest first.

... Hope it all makes sense! ☺
