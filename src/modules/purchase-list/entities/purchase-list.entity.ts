import { BaseList } from "src/modules/base-list/entities/base-list.entity";
import { Customer } from "src/modules/customer/entities/customer.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('purchaseLists')
export class PurchaseList {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column('date')
    date: Date;

    @ManyToOne(() => BaseList, baseList => baseList.purchaseLists)
    baseList: BaseList;

    @ManyToOne(() => Customer, customer => customer.purchaseLists)
    customer: Customer;

    @Column('int')
    total: number;

    @Column('date')
    purchaseDate: Date;

    @Column({ type: 'json' })
    baseListJson: any;
}
