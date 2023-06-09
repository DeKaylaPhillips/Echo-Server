# Echo Server

An echo server that replicates the request sent by the client and sends it back.

## Requirements

Node.js version 18 or higher
<https://nodejs.org/en/download>

### Run Locally

1. Clone the project

    ```bash  
    % git clone https://github.com/DeKaylaPhillips/Echo-Server
    ```

2. Go to the project directory

    ```bash
    % cd Echo-Server
    ```

3. Install dependencies

    ```bash
    % npm install
    ```

4. Configure TypeScript

    ```bash
    % tsc
    ```

5. Start the server

    ```bash
    % npm run dev
    ```

    *The following text should appear in the terminal after running the previous command which indicates the server has successfully started.*

    ```bash
    > echo-server@1.0.0 dev
    > ts-node ./src/server.ts
    ```

6. Open the web browser to Port 5000

    ```text
    localhost:5000
    ```

7. Stop the server

    ```bash
    % CTRL + C
    ```

*Note: With every new response to be sent, **refresh** the web browser to ensure the server receives the new client request.*

### Usage/Examples

Within the `response.send()` method of the app object's HTTP methods, pass a body of data to it.

```typescript
    // src/server.ts

    app.get('/', (request, response) => {
        // The body of data passed to the send() method is sent from the server and will appear to the client on the web browser.
        response.send("Hello, world!");
    });
```

The body can be a Buffer object, a String, an object, Boolean, or an Array.

*Refer to the Official Express Documentation:*
<https://expressjs.com/en/5x/api.html#res.send:~:text=res.send(%5Bbody,as%20shown%20below%3A>
