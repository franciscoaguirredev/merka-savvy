import { BaseList } from "src/modules/base-list/entities/base-list.entity";
import { PurchaseList } from "src/purchase-list/entities/purchase-list.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    registrationDate: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    lastUpdated: Date;

    @OneToOne(() => BaseList, baseList => baseList.customer)
    baseList: BaseList;

    @OneToMany(() => PurchaseList, purchaseList => purchaseList.customer)
    purchaseLists: PurchaseList[];
}