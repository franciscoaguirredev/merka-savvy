import { BaseList } from "src/modules/base-list/entities/base-list.entity";
import { PurchaseList } from "src/modules/purchase-list/entities/purchase-list.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("customer")
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar',{
    length: 150,
    nullable: false,
    name: 'name'})
    name: string;

    @Column('varchar',{
        unique: true,
        length: 150,
        nullable: false,
        name: 'email'})
    email: string;

    @Column('varchar', { 
        length: 105, 
        select: false, 
        nullable: false })
    password: string;
    
    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`})
    registrationDate: Date;

    @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
    onUpdate: `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,})
    lastUpdated: Date;

    @OneToOne(() => BaseList, baseList => baseList.customer)
    baseList: BaseList;

    @OneToMany(() => PurchaseList, purchaseList => purchaseList.customer)
    purchaseLists: PurchaseList[];
}