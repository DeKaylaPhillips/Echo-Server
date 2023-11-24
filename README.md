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

3. Start the server

    ```bash
    % npm run dev
    ```

    *The following text should appear in the server terminal after running the previous command which indicates the server has successfully started.*

    ```bash
    > echo-server@1.0.0 dev
    > ts-node ./src/server.ts

    TCP server at http://localhost:3000/.
    ```

4. Connect to the server as a client in a separate terminal tab.
    1. This command should be ran *AFTER* the server's connection has already been established.
    2. *Note*: The Netcat (nc) command for reading and writing data between two computer networks comes pre-installed on MacOS & Linux machines. Windows users may be required to install Netcat or a similar utility.

    ```bash
    % nc localhost 3000
    ```

    *The following text should appear in the client terminal after running the previous command which indicates the connection to the server has been established.*

    ```bash
    Connection established.

    Please enter a message:
    ```

    After entering a message and sending it to the server, the following text should appear, indicating that the client connection has been closed:

    ```bash
    - Some client message, here -
    Client connection closed.
    ```

5. To manually stop the server, enter the following command within the server terminal.

    ```bash
    % CTRL + C
    ```
