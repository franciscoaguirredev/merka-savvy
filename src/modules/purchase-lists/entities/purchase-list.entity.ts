import { BaseList } from "src/modules/base-lists/entities/base-list.entity";
import { Customer } from "src/modules/customers/entities/customer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('purchaseLists')
export class PurchaseList {

     @PrimaryGeneratedColumn('increment')

    id: number;

    @Column('int')
    total: number;

    @Column({
        type: 'datetime',
        name: 'purchaseDate',
        default: () => 'CURRENT_TIMESTAMP' })
    purchaseDate: Date;

    @Column({ type: 'json', nullable: true })
    baseListJson: any;

    @ManyToOne(() => BaseList, baseList => baseList.purchaseLists)
    baseList: BaseList;

    @ManyToOne(() => Customer, customer => customer.purchaseLists)
    customer: Customer;
}
