import { httpClient, HttpMethod, AuthenticationType, HttpRequest, getAccessTokenOrThrow } from "@activepieces/pieces-common";
import { Property, OAuth2PropertyValue } from "@activepieces/pieces-framework";



export const bigQueryCommon = {
    baseUrl: "https://bigquery.googleapis.com/bigquery/v2/projects",
    project_id: Property.Dropdown({
        displayName: "Project",
        required: true,
        refreshers: [],
        options: async({auth}) => {
            if (!auth) {
                return {
                    disabled: true,
                    options: [],
                    placeholder: "Please Authenticate First"
                }
            }
            const authProp: OAuth2PropertyValue = auth as OAuth2PropertyValue;
            const projects = (await httpClient.sendRequest<{projects: {id:string, friendlyName:string}[]}>({
                method: HttpMethod.GET,
                url: "https://bigquery.googleapis.com/bigquery/v2/projects",
                authentication: {
                    type: AuthenticationType.BEARER_TOKEN,
                    token: authProp['access_token'],
                }
            })).body.projects;
            return {
                disabled: false,
                options: projects.map((projects: {id: string, friendlyName: string}) => {
                    return {
                        label: projects.friendlyName,
                        value: projects.id,
                    }
                })
            };
        }
    }),
}