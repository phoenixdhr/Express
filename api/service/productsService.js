const { faker } = require('@faker-js/faker');

const Boom = require('@hapi/boom');

class ProductService {
  constructor() {
    this.arrayProducts = [];
    this.generate();
  }

  generate() {
    for (let index = 0; index < 100; index++) {
      const element = {
        number: index + 1,
        id: faker.datatype.uuid(),
        nombre: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        imagen: faker.image.imageUrl(),
        isBlock:faker.datatype.boolean()
      };
      this.arrayProducts.push(element);
    }
  }

  getArrayProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.arrayProducts);
      }, 500);
    });
  }

  limitProducts(_n) {
    if (_n > 0) {
      return this.arrayProducts.filter((element, index) => index < _n);
    }
    // else {
    //   throw Boom.notFound(`BOOM: ${_n} no es valido`);
    // }
  }

  findOne(_id) {
    // const varyyu = Reaer()
    const filter = this.arrayProducts.find((element) => element.id == _id);

    if (!filter) {
      throw Boom.notFound(`BOOM: no existe ${_id} usando findONE `);
    }

    if(filter.isBlock){
      throw Boom.conflict(`BOOM: el producto ISBLOCK ${_id} usando findONE `);
    }

    return filter;
  }

  find() {}



  create(data) {
    const elemento = {
      number: this.arrayProducts.length,
      id: faker.datatype.uuid(),
      ...data,
    };
    this.arrayProducts.push(elemento);

    return elemento;
  }



  updatePUT(data, ID) {
    const index = this.arrayProducts.findIndex(
      (elemento) => elemento.id === ID
    );

    if (index >= 0) {
        const oldProduct = this.arrayProducts[index];
        this.arrayProducts[index] = { ...oldProduct, ...data };
        return this.arrayProducts[index];

    } else {
      throw Boom.notFound(
        `BOOM DATEUPDATE : no existe el producto con id= ${ID}`
      );
    }
  }

  updatePATCH(changes, ID) {
    const index = this.arrayProducts.findIndex(
      (elemento) => elemento.id === ID
    );
    const oldProduct = this.arrayProducts[index];

    if (index >= 0) {
          this.arrayProducts[index] = {
          ...oldProduct,
          ...changes,
        };
        return this.arrayProducts[index];

    } else {
      throw Boom.notFound(
        `BOOM PATCH: no existe el producto con id= ${ID}`
      );
    }
  }

  delete(ID) {
    const index = this.arrayProducts.findIndex((element) => element.id == ID);

    if (index >= 0) {
      this.arrayProducts.splice(index, 1);
      return {
        message: `elmento eliminado, la lista de elementos ahora tiene ${this.arrayProducts.length} elementos`,
      };
    } else {
      throw Boom.notFound(`BOOM DELETE: no existe un elmento con ID = ${ID}`);
    }
  }
}

module.exports = ProductService;
