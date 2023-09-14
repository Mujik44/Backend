const fs = require('fs');

class ProductManager {

    constructor(path){
        this.path = path;
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    getProductsById = async (id) => {
        try {
            const products = await this.getProducts();
            const checkId = products.find(product => product.id === id);
            if(checkId === undefined){
                console.log("Not found");
            }else{
                return checkId;
            }
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProducts();
            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }

            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return product;

        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, product) => {
        try {
            const products = await this.getProducts();
            const checkId = products.find(product => product.id === id);

            if (checkId === undefined) {
                console.log("Id de producto no encontrado");
            } else {

                if (products.length === 0) {
                    product.id = 1;
                } else {
                    product.id = checkId.id;
                }

                const indice = products.indexOf(checkId);
    
                products[indice] = product;
    
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) => {
        try {
            const products = await this.getProducts();
            const checkId = products.find(product => product.id === id);

            if (checkId === undefined) {
                console.log("Id de producto no encontrado");
            } else {
                const indice = products.indexOf(checkId);
                products.splice(indice, 1);

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ProductManager
}