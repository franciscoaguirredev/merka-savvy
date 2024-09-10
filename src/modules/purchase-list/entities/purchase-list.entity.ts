import { BaseList } from "src/modules/base-list/entities/base-list.entity";
import { Customer } from "src/modules/customer/entities/customer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('purchaseLists')
export class PurchaseList {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date')
    date: Date;

    @Column('int')
    total: number;

    // @Column(
        // {
        // type: 'timestamptz',
        // default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`}
    // )
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
