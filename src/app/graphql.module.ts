import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-link';
import {setContext} from 'apollo-link-context';
import {environment} from '../environments/environment';

const uri = environment.GITHUB_GRAPHQL_URI;
const token = environment.GITHUB_BEARER_TOKEN;

export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));
  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer ${token}`
    },
  }));
  const link = ApolloLink.from([basic, auth, httpLink.create({uri})]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
