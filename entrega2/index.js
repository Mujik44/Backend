const { ProductManager } = require('./managers/ProductManager.js');

const manager = new ProductManager('./files/Products.json');

const env = async () => {

    const expr = 'Actualizar Producto'; 
    
    // elegir case: Ver Productos / Agregar Producto / Ver ID / Actualizar Producto / Borrar Producto
    
    switch(expr) {
        case 'Ver Productos':
            const products = await manager.getProducts();
            console.log(products);
            break;

        case 'Agregar Producto':
            const product = { // modificar producto a agregar
                title: 'Cuaderno',
                description: 'sin descripcion',
                price: 200,
                thumbnail: 'sin imagen',
                code: 'abc124',
                stock: 30
            };

            await manager.addProduct(product);
            const productsAdd = await manager.getProducts();
            console.log(productsAdd);

            break;

        case 'Ver ID':
            const productsId = await manager.getProductsById(3); // modificar id a consultar
            console.log(productsId);
            break;

        case 'Actualizar Producto':
            const productUp = { // modificar datos del producto 
                title: 'Folder',
                description: 'sin descripcion',
                price: 300,
                thumbnail: 'sin imagen',
                code: 'abc124',
                stock: 50
            };

            await manager.updateProduct(1, productUp); // introducir id del producto a modificar
            const productsUpdate = await manager.getProducts();
            console.log(productsUpdate);

            break;
        
        case 'Borrar Producto':
            await manager.deleteProduct(2); // introducir id del producto a eliminar
            const productsDelete = await manager.getProducts();
            console.log(productsDelete);

            break;
    }
}

env();