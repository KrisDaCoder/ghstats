import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_ACCOUNT_INFO, GET_USERS } from '../gql/querys';
import { AccountInfo } from '../models/AccountInfo';
import { map } from 'rxjs/operators';
import {FilteredOptions} from '../models/FilteredOptions';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private apollo: Apollo) {
  }

  getAccountInfo(username: string): Observable<AccountInfo> {
    return this.apollo.watchQuery<AccountInfo>({
      query: GET_ACCOUNT_INFO,
      variables: {username}
    }).valueChanges.pipe(
      map(result => result.data)
    );
  }

  getUsers(searchText: string): Observable<FilteredOptions[]> {
    return this.apollo.watchQuery({
      query: GET_USERS,
      variables: {searchText}
    }).valueChanges.pipe(
      map((result: any) => {
        const edges: any[] = result.data.search.edges;
        const filteredOptions: FilteredOptions[] = [];
        edges.forEach((edge: any) => {
          const filteredOption = {} as FilteredOptions;
          filteredOption.login = edge.node.login;
          filteredOption.avatarUrl = edge.node.avatarUrl;
          filteredOption.name = edge.node.name;
          filteredOptions.push(filteredOption);
        });
        return filteredOptions;
      }),
    );
  }

}
