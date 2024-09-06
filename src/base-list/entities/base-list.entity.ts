import { Customer } from "src/customer/entities/customer.entity";
import { PurchaseList } from "src/purchase-list/entities/purchase-list.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('baseLists')
export class BaseList {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

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

    @OneToOne(() => Customer, customer => customer.baseList)
    @JoinColumn({ name: 'customerUuid' })
    customer: Customer;

    @OneToMany(() => PurchaseList, purchaseList => purchaseList.baseList)
    purchaseLists: PurchaseList[];
}