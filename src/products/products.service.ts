import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
    // private products: Product[] = [];

    constructor(@InjectModel('Products') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number) {
        // const prodId = Math.random().toString();
        const newProduct = new this.productModel({ title: title, description: desc, price: price })
        // this.products.push(newProduct);
        const result = await newProduct.save();
        // console.log(result);
        return result.id as string;
        // return prodId;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        console.log(products);
        //    console.log(result);
        return products as Product[];
        // return products as any;
        
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId)

        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        };
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        // const product = this.findProduct(productId)[0];
        // const index = this.findProduct(productId)[1];
        // const [product, index] = this.findProduct(productId);
        const updatedProduct = await this.findProduct(productId)

        // const updatedProduct = { ...product }

        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        // this.products[index] = updatedProduct
        updatedProduct.save();
    }
    async deleteProduct(prodId: string) {
        // const index = this.findProduct(prodId)[1];
        // this.products.splice(index, 1);
        const result = await this.productModel.deleteOne({ _id: prodId }).exec()
        console.log(result);
        if(result.deletedCount === 0) {
            throw new NotFoundException('failed to delete the product')
        }
    }
    private async findProduct(id: string): Promise<Product> {
        // const productIndex = this.products.findIndex((prod) => prod.id === id);
        // const product = this.products[productIndex];
        let product;
        try {
            product = await this.productModel.findById(id).exec()
        }
        catch (error) {
            throw new NotFoundException('Could not find product');
        }
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return product;
        // return {
        //     id: product.id,
        //     title: product.title,
        //     description: product.description,
        //     price: product.price
        // };
    }


}