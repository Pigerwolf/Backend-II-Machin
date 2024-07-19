class ProductManager {
    
    static ultId = 0;

    constructor() {

        this.products = [];
        } 
        addProduct(tittle, desciption, price, img, code, stock) {

            if ( !tittle || !desciption || !price || !img || !code || !stock)
                
                {console.log("Todos los campos son obligatorios.")
                return;
                }

                if (this.products.some(item => item.code === code)) {
                    console.log("El código ya existe")
                return;
                }

                const nuevoProducto = {
                    id: ++ProductManager.ultId,
                    tittle,
                    desciption,
                    price,
                    img,
                    code,
                    stock
                }

            this.products.push(nuevoProducto);

        }   

        getProduct() {

            return this.products;
        }
        getProductById(id){
            const producto = this.products.find(item => item.id === id)
            
            if (!producto) {
                console.log("No se encuentra.")

            } 
                
                else {console.log("Encontramos "),
                      console.log(producto)
                
                }
            }
        };

        const manager = new ProductManager ();