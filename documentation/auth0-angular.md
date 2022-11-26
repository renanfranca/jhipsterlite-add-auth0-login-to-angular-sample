# OAuth 2.0 and OpenID Connect

OAuth is a stateful security mechanism, like HTTP Session. Spring Security provides excellent OAuth 2.0 and OIDC support, and this is leveraged by JHipster. If you’re not sure what OAuth and OpenID Connect (OIDC) are, please see [What the Heck is OAuth](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)?

## Auth0 and Angular

If you’d like to use Auth0 instead of Keycloak, follow the configuration steps below:

### Create a Single Page App using Auth0 Admin Dashboard

- Create a free developer account at <https://auth0.com/signup>. After successful sign-up, your account shall be associated with a unique domain like `dev-xxx.us.auth0.com`
- Create a new application (**Applications > + Create Application**) of type `Single Page Application`. Switch to the `Settings` tab, and configure your application settings like:
  - Allowed Callback URLs: <http://localhost:9000>
  - Allowed Logout URLs: <http://localhost:9000>
  - Allowed Web Origins: <http://localhost:9000>
  - Navigate to **User Management > Roles** and create new roles named `ROLE_ADMIN`, and `ROLE_USER`.
  - Navigate to **User Management > Users** and create a new user account. Click on the **Role** tab to assign roles to the newly created user account.
  - Navigate to **Actions > Flows** and select **Login**. Create a new action named `Add Roles` and use the default trigger and runtime. Change the `onExecutePostLogin` handler to be as follows:

 ```javascript
 exports.onExecutePostLogin = async (event, api) => {
 const namespace = 'https://www.jhipster.tech';
  if (event.authorization) {
   api.idToken.setCustomClaim('preferred_username', event.user.email);
   api.idToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
   api.accessToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
  }
 };
 ```

- Select **Deploy** and drag the `Add Roles` action to your Login flow and **Apply**.

### Configure JHipster Lite Angular Application to use Auth0

In your Angular application update `src\main\webapp\environments\environment.ts` and `src\main\webapp\environments\environment.prod.ts` to use your Auth0 settings. Hint: replace {yourAuth0Domain} with your org’s name (e.g., dev-123456.us.auth0.com).

```typescript
  auth0: {
    domain: '{yourAuth0Domain}',
    clientId: '{client-id}',
    audience: 'https://{yourAuth0Domain}/api/v2/',
    redirectUri: window.location.origin
  },
```

### Configure JHipster Lite Spring Boot Api to use Auth0

In your application, update `src/main/resources/config/application-auth0.properties` to use your Auth0 settings. Hint: replace {yourAuth0Domain} with your org’s name (e.g., dev-123456.us.auth0.com).

```properties
application.security.oauth2.audience=account,api://default,https://{yourAuth0Domain}/api/v2/
spring.security.oauth2.client.provider.oidc.issuer-uri=https://{yourAuth0Domain}/
```

### Run the application setting the auth0 profile

- `./mvnw -D"spring-boot.run.profiles"="auth0"`
- `npm start` (run in a different terminal window)
- Access the application at <http://localhost:9000>

## References

- <https://auth0.com/docs/quickstart/spa/angular>
