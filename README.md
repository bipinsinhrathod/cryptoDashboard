--> CryptoDashboard

        - The CryptoDashboard is a React JS-based dashboard that displays a list of cryptocurrencies along with their current prices and percentage change in real-time. It utilizes Material-UI (MUI) components for design and styling, and it fetches data from the CoinCap API.

--> Features

        - Displays a list of cryptocurrencies with their names, logos, prices, and percentage change.
Utilizes WebSocket connection to CoinCap API for real-time updates.
Updates the prices and percentage change dynamically without the need for page refresh.
Mobile-friendly and responsive design using Material-UI components.

--> Installation

        - To run the CryptoDashboard locally:

        [1] Clone this repository to your local machine: 
            
            - git clone "https://github.com/bipinsinhrathod/cryptoDashboard"

        [2] Navigate to the project directory:

            - cd CryptoDashboard

        [3] Install dependencies:

            - npm install @emotion/react @emotion/styled @material-ui/core @mui/material @mui/styles socket.io-client

        [4] Start the development server:

            - npm run crypto


        Open your web browser and go to http://localhost:3000 to view the CryptoDashboard.


--> Usage
        
        - The CryptoDashboard displays a list of cryptocurrencies with their current prices and percentage change. It updates the data in real-time using WebSocket connection to the CoinCap API. You can view the cryptocurrency names, logos, prices, and percentage change, and the colors of the prices change dynamically based on whether they have increased or decreased.

        API Used: [CoinCapAPI](https://api.coincap.io/v2/assets)

--> Credits

        - Material-UI: React components for faster and easier web development.
        
        - CoinCap API: Provides cryptocurrency data, including real-time prices and trade updates.


