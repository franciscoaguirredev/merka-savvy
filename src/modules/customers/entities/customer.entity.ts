
import { ApiProperty } from "@nestjs/swagger";
import { BaseList } from "src/modules/base-lists/entities/base-list.entity";
import { PurchaseList } from "src/modules/purchase-lists/entities/purchase-list.entity";
import { Role } from "src/modules/roles";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity("customers")
export class Customer {
    @ApiProperty({
        example: '1',
        description: 'Unique identifier type number: Customer ID',
        uniqueItems:true
    })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({
        example: 'Pepito Perez',
        description: 'First name and last name',
        uniqueItems:true
    })
    @Column('varchar',{
        length: 150,
        nullable: false,
        name: 'name'})
    name: string;

    @ApiProperty({
        example: 'pepitoperez@correo.com',
        description: 'e-mail address',
        uniqueItems:true
    })
    @Column('varchar',{
        unique: true,
        length: 150,
        nullable: false,
        name: 'email'})
    email: string;

    @ApiProperty({
        example: 'Qwer1234*',
        description: 'The password must contain uppercase, lowercase, numeric and special characters.',
        uniqueItems:true
    })
    @Column('varchar', { 
        length: 105, 
        select: false, 
        nullable: false })
    password: string;
    
    @ApiProperty({        
        description: 'Date of user registration. Automatic date.',
        uniqueItems:true
    })
    @CreateDateColumn({ type: 'timestamp' })
    registrationDate: Date;

    @ApiProperty({
        description: 'Date of last update.',
        uniqueItems:true
    })
    @UpdateDateColumn({ type: 'timestamp' })
    lastUpdateDate: Date;

    @ApiProperty({
        description: 'Relationship with the entity baselists.',
        uniqueItems:true
    })
    @OneToMany(() => BaseList, baseList => baseList.customer)
    baseLists: BaseList[];

    @ApiProperty({
        description: 'Relationship with the entity purchaseLists',
        uniqueItems:true
    })
    @OneToMany(() => PurchaseList, purchaseList => purchaseList.customer)
    purchaseLists: PurchaseList[];
    purchaseListsId: any;

    @ApiProperty({
        default: 'Cliente',
        description: 'Relationship with the entity role',
        type: Number,
        uniqueItems:true
    })
    @ManyToOne(() => Role, Role => Role.id)
    role: number;
}
