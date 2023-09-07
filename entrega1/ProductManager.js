class ProductManager {
    
    constructor() {
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }

    getProductById = (id) => {
        const checkId = this.products.find(product => product.id === id)
        if(checkId === undefined){
            console.log("Not found")
        }else{
            return checkId;
        }
    }

    addProducts = (
        title, 
        description,
        price,
        thumbnail,
        code,
        stock
    ) => {

        const product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Faltan completar uno o mas campos');
        }else{
            const indexProduct = this.products.find(product => product.code === code);
            if (indexProduct === undefined) {
                if (this.products.length === 0) {
                    product.id = 1;
                }else{
                    product.id = this.products[this.products.length - 1].id +1;
                }
                this.products.push([...this.products, product]);
            }else{
                console.log("El código de producto ya ha sido registrado");
                return;
            }
        }
    }
}

const manejadorProducts = new ProductManager();

manejadorProducts.addProducts('producto prueba', 'este es un producto de prueba', 200, 'sin imagen', 'abc123', 25);
manejadorProducts.addProducts('producto 1', 'producto 1', 500, 'sin imagen', 'abc124', 30);

console.log(manejadorProducts.getProducts());