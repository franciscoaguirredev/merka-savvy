import { Customer } from "src/modules/customers/entities/customer.entity";
import { PurchaseList } from "src/modules/purchase-lists/entities/purchase-list.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('baseLists')
export class BaseList {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productName: string;

    @Column('int')
    price: number;

    @Column('int')
    quantity: number;

    @Column()
    provider: string;

    @Column()
    measure: string;

    @Column({ type: 'boolean', default: true})
    isActive: boolean;

    @OneToMany(() => Customer, customer => customer.baseList)
    @JoinColumn()
    customer: Customer;

    @OneToMany(() => PurchaseList, purchaseList => purchaseList.baseList)
    purchaseLists: PurchaseList[];
}
