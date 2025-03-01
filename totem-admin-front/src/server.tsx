import express, { Request, Response } from 'express';
import ImageKit from 'imagekit';

// Function to initialize the server and ImageKit
const initializeServer = () => {
    const app = express();

    // Initialize ImageKit
    const imagekit = new ImageKit({
        publicKey: "public_P17LRkYTu9e3UdN3WnyzbodiT1U=",
        urlEndpoint: "https://ik.imagekit.io/Comp3800Group12/",
        privateKey: "private_PeSFDBIdeSuhtUZaec1saMxjqoU=",
    });

    // Define the authentication endpoint
    app.get('/auth', (req: Request, res: Response) => {
        const authParams = imagekit.getAuthenticationParameters(); // Generate authentication parameters
        res.send(authParams);
    });

    // Start the server
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
};

// Export the function for use in other files
export default initializeServer;