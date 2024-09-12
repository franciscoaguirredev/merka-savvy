import { BaseList } from "src/modules/base-lists/entities/base-list.entity";
import { PurchaseList } from "src/modules/purchase-lists/entities/purchase-list.entity";
import { Role } from "src/modules/roles";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity("customers")
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
    
    @CreateDateColumn({ type: 'timestamp' })
    registrationDate: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    lastUpdateDate: Date;

    @ManyToMany(() => BaseList, baseList => baseList.customer)
    baseList: BaseList;

    @OneToMany(() => PurchaseList, purchaseList => purchaseList.customer)
    purchaseLists: PurchaseList[];
    purchaseListsId: any;

    @ManyToOne(() => Role, Role => Role.id)
    role: number;
}