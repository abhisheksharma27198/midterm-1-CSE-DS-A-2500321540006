
const http = require('http');

let products = [
    {
        id: 201,
        name: "Wireless Mouse",
        price: 599,
        category: "Electronics"
    }
];

const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "application/json");

    
    if (req.method === "POST" && req.url === "/products") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            const newProduct = JSON.parse(body);

            products.push(newProduct);

            res.writeHead(201);

            res.end(JSON.stringify({
                message: "Product created successfully",
                data: newProduct
            }));

        });

    }

    
    else if (req.method === "GET" && req.url === "/products") {

        res.writeHead(200);

        res.end(JSON.stringify(products));

    }

   
    else if (req.method === "PUT" && req.url.startsWith("/products/")) {

        const id = Number(req.url.split("/")[2]);

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            const updatedData = JSON.parse(body);

            const product = products.find(p => p.id === id);

            if (product) {

                Object.assign(product, updatedData);

                res.writeHead(200);

                res.end(JSON.stringify({
                    message: "Product updated successfully",
                    data: product
                }));

            } else {

                res.writeHead(404);

                res.end(JSON.stringify({
                    message: "Product not found"
                }));

            }

        });

    }

    
    else if (req.method === "DELETE" && req.url.startsWith("/products/")) {

        const id = Number(req.url.split("/")[2]);

        const index = products.findIndex(p => p.id === id);

        if (index !== -1) {

            const deletedProduct = products.splice(index, 1);

            res.writeHead(200);

            res.end(JSON.stringify({
                message: "Product deleted successfully",
                data: deletedProduct[0]
            }));

        } else {

            res.writeHead(404);

            res.end(JSON.stringify({
                message: "Product not found"
            }));

        }

    }

    else {

        res.writeHead(404);

        res.end(JSON.stringify({
            message: "Invalid route"
        }));

    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
