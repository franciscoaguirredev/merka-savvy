import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity('baseLists')
export class BaseList {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({nullable:false})
    name: string;

    @Column()
    budget:number

    @Column()
    total:number

    @ManyToOne(() => Customer, customer => customer.baseLists)
    @JoinColumn()
    customer: Customer;

    @ManyToMany(() => Product, product => product.baseLists)
    @JoinTable() 
    products: Product[];
    purchaseLists: any;
}
